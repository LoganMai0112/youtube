/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useContext } from 'react';
import { Client, LocalStream } from 'ion-sdk-js';
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import { useParams } from 'react-router-dom';
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
  const videoRef = useRef();
  const streamRef = useRef();
  const currentUser = useContext(UserContext);

  let signal;
  let client;

  useEffect(() => {
    signal = new IonSFUJSONRPCSignal('ws://localhost:7000/ws');
    client = new Client(signal, config);
    signal.onopen = () => client.join(params.userId);

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

    return () => client.close();
  }, []);

  const start = (e) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {String(currentUser.id) === params.userId && (
        <div className="px-10">
          <div className="flex gap-2 mb-2">
            <button
              className="mr-3 p-2 rounded-2xl bg-main-color text-black"
              type="button"
              onClick={() => start(true)}
            >
              Share screen
            </button>
            <button
              type="button"
              className="bg-main-color p-2 text-black rounded-2xl"
              onClick={() => {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach((t) => t.stop());
                videoRef.current.srcObject = null;
                streamRef.current.srcObject = null;
              }}
            >
              Stop stream
            </button>
          </div>
          <video width="80%" height="80%" ref={videoRef} />
        </div>
      )}
      {String(currentUser.id) !== params.userId && (
        <WatchStream streamRef={streamRef} />
      )}
    </div>
  );
}
