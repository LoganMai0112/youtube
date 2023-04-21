import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';

function ReportPortal({ setReportBox, videoId, channelId }) {
  const [reportContent, setReportContent] = useState();
  const [reportType, setReportType] = useState('video');

  const report = () => {
    axios
      .post('/reports', {
        report: {
          content: reportContent,
          reportable_id: reportType === 'video' ? videoId : channelId,
          reportable_type: reportType === 'video' ? 'Video' : 'User',
        },
      })
      .then((res) => {
        if (res) {
          toast(res.data.message);
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,.7)] z-10 flex justify-center items-center">
      <div className="bg-gray-900 min-w-min mx-10 h-fit rounded-2xl flex flex-col px-6 py-4">
        <div className="w-full flex justify-between py-4">
          <p className="text-xl text-white flex items-center">
            Report {reportType}
          </p>
          <button
            type="button"
            onClick={() => {
              setReportBox(false);
              setReportType('video');
            }}
            className="w-9 h-9 p-2 rounded-full hover:bg-hover"
          >
            <AiOutlineClose className="fill-main-color w-full h-full" />
          </button>
        </div>
        <div className="overflow-scroll max-h-80 max-w-[400px] flex flex-col">
          {reportType === 'video' && (
            <form onChange={(e) => setReportContent(e.target.value)}>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="1"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="1"
                    type="checkbox"
                    value="Sexual content"
                    checked={reportContent === 'Sexual content'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Sexual content</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="2"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="2"
                    type="checkbox"
                    value="Violent or repulsive content"
                    checked={reportContent === 'Violent or repulsive content'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Violent or repulsive content</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="3"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="3"
                    type="checkbox"
                    value="Hateful or repulsive content"
                    checked={reportContent === 'Hateful or repulsive content'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Hateful or repulsive content</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="4"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="4"
                    type="checkbox"
                    value="Harassment or bullying"
                    checked={reportContent === 'Harassment or bullying'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Harassment or bullying</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="5"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="5"
                    type="checkbox"
                    value="Harmful or dangerous acts"
                    checked={reportContent === 'Harmful or dangerous acts'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Harmful or dangerous acts</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="6"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="6"
                    type="checkbox"
                    value="Misinformation"
                    checked={reportContent === 'Misinformation'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Misinformation</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="7"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="7"
                    type="checkbox"
                    value="Child abuse"
                    checked={reportContent === 'Child abuse'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Child abuse</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="8"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="8"
                    type="checkbox"
                    value="Promotes terrorism"
                    checked={reportContent === 'Promotes terrorism'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Promotes terrorism</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="9"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="9"
                    type="checkbox"
                    value="Spam or misleading"
                    checked={reportContent === 'Spam or misleading'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Spam or misleading</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="10"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="10"
                    type="checkbox"
                    value="Caption issue"
                    checked={reportContent === 'Caption issue'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Caption issue</span>
                </label>
              </div>
            </form>
          )}
          {reportType === 'channel' && (
            <form onChange={(e) => setReportContent(e.target.value)}>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="1"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="1"
                    type="checkbox"
                    value="Privacy"
                    checked={reportContent === 'Privacy'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Privacy</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="2"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="2"
                    type="checkbox"
                    value="Harassment and cyberbullying"
                    checked={reportContent === 'Harassment and cyberbullying'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Harassment and cyberbullying</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="3"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="3"
                    type="checkbox"
                    value="Impersonation"
                    checked={reportContent === 'Impersonation'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Impersonation</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="4"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="4"
                    type="checkbox"
                    value="Violent threats"
                    checked={reportContent === 'Violent threats'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Violent threats</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="5"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="5"
                    type="checkbox"
                    value="Child endangerment"
                    checked={reportContent === 'Child endangerment'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Child endangerment</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="6"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="6"
                    type="checkbox"
                    value="Hate speech against a protected group"
                    checked={
                      reportContent === 'Hate speech against a protected group'
                    }
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    Hate speech against a protected group
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="7"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="7"
                    type="checkbox"
                    value="Spam and scams"
                    checked={reportContent === 'Spam and scams'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">Spam and scams</span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-6 pr-2">
                <label
                  htmlFor="8"
                  className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                >
                  <input
                    id="8"
                    type="checkbox"
                    value="None of these are my issue"
                    checked={reportContent === 'None of these are my issue'}
                    className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">None of these are my issue</span>
                </label>
              </div>
            </form>
          )}
          <p className="text-text-color text-sm">
            Flagged videos and users are reviewed by YouTube staff 24 hours a
            day, 7 days a week to determine whether they violate Community
            Guidelines. Accounts are penalized for Community Guidelines
            violations, and serious or repeated violations can lead to account
            termination.
            {reportType === 'video' && (
              <button
                className="text-main-color"
                type="button"
                onClick={() => setReportType('channel')}
              >
                Report channel
              </button>
            )}
          </p>
        </div>
        <button
          type="button"
          value="Create"
          onClick={() => {
            report();
            setReportBox(false);
            setReportType('video');
          }}
          className="p-2 hover:bg-hover text-main-color rounded-2xl cursor-pointer"
        >
          Report
        </button>
      </div>
    </div>
  );
}

export default ReportPortal;
