/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import moment from 'moment';

function Analytic() {
  const [type, setType] = useState('view');
  const [videos, setVideos] = useState([]);
  const [dataAnalytics, setDataAnalytics] = useState({});
  const [dataChannel, setDataChannel] = useState();
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  useEffect(() => {
    const getAnalytic = () => {
      axios
        .get('/analytics')
        .then((res) => {
          setDataChannel(res.data.channelAnalytics);
          setDataAnalytics(res.data.channelAnalytics);
          setVideos(res.data.videos.data);
          setLikesCount(
            Object.keys(res.data.channelAnalytics.likes_sum).length
          );
          setCommentsCount(
            Object.keys(res.data.channelAnalytics.comments_sum).length
          );
        })
        .catch((err) => console.log(err.message));
    };

    getAnalytic();
  }, []);

  const setChartValue = (type, object) => {
    setChart({
      options: {
        ...chart.options,
        xaxis: { categories: Object.keys(object) },
      },
      series: [
        {
          name: `${type}s`,
          data: Object.values(object),
        },
      ],
    });
  };

  useEffect(() => {
    if (dataAnalytics) {
      if (type === 'subscriber') {
        setChartValue(type, dataAnalytics.subscribers_sum);
      } else if (type === 'like') {
        setChartValue(type, dataAnalytics.likes_sum);
      } else if (type === 'comment') {
        setChartValue(type, dataAnalytics.comments_sum);
      }
    }
  }, [type, dataAnalytics]);

  return (
    <div className="px-5 flex overflow-hidden">
      <div className="w-2/3 min-w-[500px] sticky top[400px]">
        <p
          onClick={() => {
            setDataAnalytics({
              likes_sum: dataChannel.likes_sum,
              comments_sum: dataChannel.comments_sum,
              subscribers_sum: dataChannel.subscribers_sum,
            });
            setLikesCount(Object.keys(dataChannel.likes_sum).length);
            setCommentsCount(Object.keys(dataChannel.comments_sum).length);
          }}
          className="text-white text-2xl mb-5 cursor-pointer"
        >
          Channel analytics
        </p>
        <div className="w-full">
          <div className="flex w-full [&>button]:w-full [&>button]:py-4 mb-3 [&>button]:text-white">
            <button
              type="button"
              onClick={() => setType('view')}
              className={`bg-sec rounded-tl-2xl ${
                type === 'view' ? 'bg-slate-700' : ''
              }`}
            >
              Views
            </button>
            <button
              type="button"
              onClick={() => setType('subscriber')}
              className={`bg-sec ${
                type === 'subscriber' ? 'bg-slate-700' : ''
              }`}
            >
              Subscribers{' '}
              {dataChannel && Object.keys(dataChannel.subscribers_sum).length}
            </button>
            <button
              type="button"
              onClick={() => setType('like')}
              className={`bg-sec ${type === 'like' ? 'bg-slate-700' : ''}`}
            >
              Likes {likesCount || 0}
            </button>
            <button
              type="button"
              onClick={() => setType('comment')}
              className={`bg-sec rounded-tr-2xl ${
                type === 'comment' ? 'bg-slate-700' : ''
              }`}
            >
              Comments {commentsCount || 0}
            </button>
          </div>
          <Chart
            options={chart.options}
            series={chart.series}
            type="line"
            width="100%"
          />
        </div>
      </div>
      <div className="w-1/3 right-0 h-full overflow-scroll">
        {videos.map((video) => (
          <div
            onClick={() => {
              setDataAnalytics({
                ...dataAnalytics,
                likes_sum: video.attributes.likeData,
                comments_sum: video.attributes.commentData,
              });
              setLikesCount(video.attributes.likesCount);
              setCommentsCount(video.attributes.commentsCount);
            }}
            className="flex py-3 border-b border-text-color cursor-pointer hover:bg-slate-600"
          >
            <img
              className="w-[140px] px-3"
              src={video.attributes.thumbnailUrl}
              alt="thumbnail"
            />
            <div className="text-white flex flex-col justify-center">
              <p>{video.attributes.title}</p>
              <span className="text-text-color">
                {moment(video.attributes.createdAt).format('MMM DD, YYYY')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytic;
