/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useContext, useState } from 'react';
import { Client, LocalStream } from 'ion-sdk-js';
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';
import WatchStream from './WatchStream';
import axiosClient from '../axios/axiosConfig';

export default function Stream() {
  const config = {
    iceSevers: [
      {
        urls: process.env.REACT_APP_STUN_SERVER,
      },
    ],
  };
  const params = useParams();
  const signal = new IonSFUJSONRPCSignal(process.env.REACT_APP_SIGNAL_SERVER);
  const client = new Client(signal, config);
  signal.onopen = () => client.join(params.streamId);

  const videoRef = useRef();
  const navigate = useNavigate();
  const streamRef = useRef();
  const currentUser = useContext(UserContext);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamInfo, setStreamInfo] = useState();
  const [channel, setChannel] = useState();

  useEffect(() => {
    const getStream = async () => {
      await axiosClient
        .get(`/streams/${params.streamId}`)
        .then((res) => {
          setChannel(res.data.included[0]);
          setStreamInfo(res.data.data);
        })
        .catch((err) => toast(err));
    };
    getStream();

    client.ontrack = (track, stream) => {
      track.onunmute = () => {
        streamRef.current.srcObject = stream;
        streamRef.current.autoplay = true;
        streamRef.current.muted = false;
        streamRef.current.controls = true;
        stream.onremovetrack = () => {
          streamRef.current.srcObject = null;
        };
      };
    };
  }, [streamRef]);

  const start = () => {
    const streamingTrue = async () => {
      await axiosClient
        .put(`/streams/${params.streamId}`, {
          stream: { streaming: true },
        })
        .then((res) => {
          if (res) {
            toast('Start stream');
          }
        })
        .catch((err) => toast(err));
    };

    LocalStream.getDisplayMedia({
      resolution: 'vga',
      audio: true,
      codec: 'vp8',
      video: true,
    })
      .then((media) => {
        videoRef.current.srcObject = media;
        videoRef.current.autoplay = true;
        videoRef.current.controls = true;
        videoRef.current.muted = true;
        client.publish(media);
        setIsStreaming(true);
        streamingTrue();
      })
      .catch((err) => {
        toast(err);
      });
  };

  const closeStream = async () => {
    await axiosClient
      .delete(`/streams/${params.streamId}`)
      .then(() => {
        toast('Close Stream');
        setIsStreaming(false);
        navigate('/');
      })
      .catch((err) => toast(err.message));
  };

  return (
    <div>
      {streamInfo && streamInfo.attributes.userId === currentUser.id && (
        <div className="px-10">
          <div className="flex gap-2 mb-2">
            {!isStreaming && (
              <button
                className="mr-3 p-2 rounded-2xl bg-main-color text-black"
                type="button"
                onClick={() => start()}
              >
                Share screen
              </button>
            )}
            {isStreaming && (
              <button
                type="button"
                className="bg-main-color p-2 text-black rounded-2xl"
                onClick={() => {
                  const tracks = videoRef.current.srcObject.getTracks();
                  tracks.forEach((t) => t.stop());
                  videoRef.current.srcObject = null;
                  closeStream();
                }}
              >
                Stop stream
              </button>
            )}
          </div>
          <video width="80%" height="80%" ref={videoRef} />
        </div>
      )}
      {streamInfo && streamInfo.attributes.userId !== currentUser.id && (
        <WatchStream
          streamRef={streamRef}
          streamInfo={streamInfo}
          channel={channel}
        />
      )}
    </div>
  );
}
