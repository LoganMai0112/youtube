/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useContext, useState } from 'react';
import { Client, LocalStream } from 'ion-sdk-js';
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';
import WatchStream from './WatchStream';

export default function Stream() {
  const config = {
    iceSevers: [
      {
        urls: 'stun:stun.l.google.com:19320',
      },
    ],
  };
  const params = useParams();
  const signal = new IonSFUJSONRPCSignal('ws://localhost:7000/ws');
  const client = new Client(signal, config);
  signal.onopen = () => client.join(params.streamId);

  const videoRef = useRef();
  const navigate = useNavigate();
  const streamRef = useRef();
  const currentUser = useContext(UserContext);
  const [isStreamming, setIsStreamming] = useState(false);
  const [streamInfo, setStreamInfo] = useState();

  useEffect(() => {
    const getStream = async () => {
      await axios
        .get(`/streams/${params.streamId}`)
        .then((res) => {
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
  }, []);

  const start = (e) => {
    const streamingTrue = () => {
      axios
        .put(`/streams/${params.streamId}`, { stream: { streaming: true } })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    streamingTrue();
    if (e) {
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
          setIsStreamming(true);
        })
        .catch((err) => {
          toast(err);
        });
    }
  };

  const closeStream = () => {
    axios
      .delete(`/streams/${params.streamId}`)
      .then(() => {
        toast('Close Stream');
        setIsStreamming(false);
        navigate('/');
      })
      .catch((err) => toast(err.message));
  };

  return (
    <div>
      {streamInfo && streamInfo.attributes.userId === currentUser.id && (
        <div className="px-10">
          <div className="flex gap-2 mb-2">
            {!isStreamming && (
              <button
                className="mr-3 p-2 rounded-2xl bg-main-color text-black"
                type="button"
                onClick={() => start(true)}
              >
                Share screen
              </button>
            )}
            {isStreamming && (
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
        <WatchStream streamRef={streamRef} />
      )}
    </div>
  );
}
