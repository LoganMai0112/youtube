import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { Link } from 'react-router-dom';

function Card({ id, title, channel, createdAt, thumbnailUrl, type }) {
  return (
    <Link className="h-fit" to={type ? `/${type}s/${id}` : `/videos/${id}`}>
      <div className="w-full h-fit flex flex-col cursor-pointer">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="aspect-video rounded-3xl object-cover"
        />
        <div className="flex flex-row items-start pt-3">
          {channel && (
            <Link to={`/users/${channel.id}`}>
              <div className="p-1 min-w-[48px] rounded-full border-dashed border-2 border-main-color mr-3">
                <img
                  src={channel.avatarUrl}
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
              </div>
            </Link>
          )}
          <div>
            <p className="text-white text-xl font-bold break-normal">{title}</p>
            {channel && (
              <Link to={`/users/${channel.id}`}>
                <p className="text-text-color hover:text-white text-sm">
                  {channel.name}
                </p>
              </Link>
            )}
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

export default Card;
