import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

export default function SideCard({ id, title, channel, createdAt, thumbnail }) {
  return (
    <Link to={`/videos/${id}`} replace>
      <div className="w-full h-fit flex flex-row cursor-pointer">
        <img
          src={thumbnail || '/logo.png'}
          alt="thumbnail"
          className="aspect-video rounded-lg w-40 object-cover"
        />
        <div className="flex flex-row items-start pl-3">
          <div>
            <p className="text-ellipsis overflow-hidden text-white text-xl font-bold max-h-14">
              {title}
            </p>
            <Link to={`/users/${channel.id}`}>
              <p className="text-text-color hover:text-white text-sm">
                {channel.name}
              </p>
            </Link>
            <div className="flex items-center text-text-color text-sm">
              <p>view</p>
              <div className="rounded-full w-1 h-1 mx-2 bg-icon-color" />
              <p>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
