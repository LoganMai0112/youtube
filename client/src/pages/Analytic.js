/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

function Analytic() {
  const [type, setType] = useState('view');
  const [chart] = useState({
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

  return (
    <div className="px-5 flex">
      <div className="w-2/3 min-w-[500px]">
        <p className="text-white text-2xl mb-5">Channel analytics</p>
        <div className="w-full">
          <div className="flex w-full [&>button]:w-full [&>button]:py-4 mb-3 [&>button]:text-white">
            <button
              type="button"
              onClick={() => setType('view')}
              className={`bg-sec rounded-l-2xl ${
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
              Subscribers
            </button>
            <button
              type="button"
              onClick={() => setType('like')}
              className={`bg-sec ${type === 'like' ? 'bg-slate-700' : ''}`}
            >
              Likes
            </button>
            <button
              type="button"
              onClick={() => setType('comment')}
              className={`bg-sec rounded-r-2xl ${
                type === 'comment' ? 'bg-gray-700' : ''
              }`}
            >
              Comments
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
      <div className="flex-1">haha</div>
    </div>
  );
}

export default Analytic;
