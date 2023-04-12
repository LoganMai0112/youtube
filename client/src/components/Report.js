import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Report() {
  const [reports, setReports] = useState();

  useEffect(() => {
    const getReports = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/reports`)
        .then((res) => setReports(res.data))
        .catch((err) => toast(err.response.data.message));
    };

    getReports();
  }, []);

  const deleteReport = async (reportId) => {
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/reports/${reportId}`)
      .then((res) => {
        toast(res.data.message);
        setReports(reports.filter((report) => report.id !== reportId));
      })
      .catch((err) => toast(err.response.data.message));
  };

  return (
    <div className="px-5 flex flex-col gap-2">
      {reports &&
        reports.map((report) => (
          <div className="flex w-full">
            <Link
              to={
                report.reportable_type === 'User'
                  ? `/users/${report.reportable_id}`
                  : `/videos/${report.reportable_id}`
              }
              className="flex justify-between rounded-l-2xl w-full p-3 bg-sec hover:bg-hover"
            >
              <div className="w-72">
                <p className="text-white">{report.content}</p>
              </div>
              <div className="text-text-color">{report.reportable_type}</div>
            </Link>
            <button
              type="button"
              onClick={() => deleteReport(report.id)}
              className="bg-sec hover:bg-hover text-text-color hover:text-main-color whitespace-nowrap p-3 rounded-r-2xl"
            >
              Delete report
            </button>
          </div>
        ))}
    </div>
  );
}

export default Report;
