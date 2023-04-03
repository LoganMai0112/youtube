import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { toast } from 'react-toastify';

function AnalyticAdmin() {
  const [lineChart, setLineChart] = useState();
  const [barChart, setBarChart] = useState();
  const [date, setDate] = useState('day');
  const [filterBox, setFilterBox] = useState(false);
  useEffect(() => {
    const getAnalytic = async () => {
      await axios
        .get('/analytics', { params: { date } })
        .then((res) => {
          setLineChart({
            options: {
              chart: {
                id: 'basic-line',
              },
              xaxis: {
                categories: Object.keys(res.data.sumViews),
              },
            },
            series: [
              {
                name: 'Views of all videos',
                data: Object.values(res.data.sumViews),
              },
            ],
          });

          setBarChart({
            options: {
              chart: {
                id: 'basic-bar',
              },
              xaxis: {
                categories: res.data.topVideos.map((item) => item.title),
              },
            },
            series: [
              {
                name: 'The video with the most views',
                data: res.data.topVideos.map((item) => item.views_count),
              },
            ],
          });
        })
        .catch((err) => toast(err.message));
    };

    getAnalytic();
  }, [date]);

  return (
    <div>
      <div className="relative mx-5">
        <button
          type="button"
          onClick={() => setFilterBox(!filterBox)}
          className="flex gap-2 text-white items-center p-2 rounded-3xl hover:bg-hover"
        >
          Filters
        </button>
        {filterBox && (
          <div className="absolute top-full left-0 flex bg-third rounded-xl z-10">
            <div className="flex flex-col text-text-color [&>button]:p-2">
              <button
                className={`rounded-xl hover:bg-hover ${
                  date === 'day' ? 'bg-hover text-white' : ''
                }`}
                type="button"
                onClick={() => setDate('day')}
              >
                Today
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  date === 'week' ? 'bg-hover text-white' : ''
                }`}
                type="button"
                onClick={() => setDate('week')}
              >
                This week
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  date === 'month' ? 'bg-hover text-white' : ''
                }`}
                type="button"
                onClick={() => setDate('month')}
              >
                This month
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  date === 'year' ? 'bg-hover text-white' : ''
                }`}
                type="button"
                onClick={() => setDate('year')}
              >
                This year
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex sm:flex-col px-5 lg:flex-row">
        <div className="flex-1">
          {lineChart && (
            <Chart
              options={lineChart.options}
              series={lineChart.series}
              type="line"
              width="100%"
            />
          )}
        </div>
        <div className="flex-1">
          {barChart && (
            <Chart
              options={barChart.options}
              series={barChart.series}
              type="bar"
              width="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticAdmin;
