/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

function AnalyticUser() {
  const [type, setType] = useState('view');
  const [videos, setVideos] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [dataAnalytics, setDataAnalytics] = useState({});
  const [dataChannel, setDataChannel] = useState();
  const [likesCount, setLikesCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [],
      },
    ],
  });

  const setCount = (data) => {
    let arr = Object.values(data.likes_sum);
    let sum = arr.reduce((acc, curr) => acc + curr, 0);
    setLikesCount(sum);
    arr = Object.values(data.comments_sum);
    sum = arr.reduce((acc, curr) => acc + curr, 0);
    setCommentsCount(sum);
    arr = Object.values(data.views_sum);
    sum = arr.reduce((acc, curr) => acc + curr, 0);
    setViewsCount(sum);
  };

  useEffect(() => {
    const getAnalytic = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/analytics`)
        .then((res) => {
          setDataChannel(res.data.channelAnalytics);
          setDataAnalytics(res.data.channelAnalytics);
          setVideos(res.data.videos.data);
          setCount(res.data.channelAnalytics);
        })
        .catch((err) => toast(err.message));
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
    if (dataAnalytics && Object.keys(dataAnalytics).length !== 0) {
      if (type === 'subscriber') {
        setChartValue(type, dataAnalytics.subscribers_sum);
      } else if (type === 'like') {
        setChartValue(type, dataAnalytics.likes_sum);
      } else if (type === 'comment') {
        setChartValue(type, dataAnalytics.comments_sum);
      } else if (type === 'view') {
        setChartValue(type, dataAnalytics.views_sum);
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
              views_sum: dataChannel.views_sum,
            });
            setCount(dataChannel);
            setViewing(null);
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
              Views {viewsCount || 0}
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
            key={video.id}
            onClick={() => {
              setDataAnalytics({
                ...dataAnalytics,
                likes_sum: video.attributes.likeData,
                comments_sum: video.attributes.commentData,
                views_sum: video.attributes.viewData,
              });
              setViewsCount(video.attributes.viewsCount);
              setLikesCount(video.attributes.likesCount);
              setCommentsCount(video.attributes.commentsCount);
              setViewing(video.id);
            }}
            className={`flex py-3 border-b border-text-color cursor-pointer hover:bg-slate-600 ${
              viewing === video.id ? 'bg-slate-600' : ''
            }`}
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

export default AnalyticUser;
