import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { Link } from 'react-router-dom';

function Card({
  id,
  title,
  channel,
  createdAt,
  thumbnailUrl,
  type,
  status,
  view,
}) {
  return (
    <Link className="h-fit" to={type ? `/${type}s/${id}` : `/videos/${id}`}>
      <div className="w-full h-fit flex flex-col cursor-pointer">
        <img
          src={thumbnailUrl || '/logo.png'}
          alt="thumbnail"
          className="aspect-video rounded-md object-cover"
        />
        <div className="flex flex-row items-start pt-3">
          {channel && (
            <Link to={`/users/${channel.id}`}>
              <div className="p-1 min-w-[48px] rounded-full border-dashed border-2 border-main-color mr-3">
                <img
                  src={channel.avatarUrl}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
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
            {type === 'playlist' && status === 'privated' && (
              <div className="p-[1px] bg-hover w-fit">
                <p className="text-text-color">Private</p>
              </div>
            )}
            <div className="flex sm:items-center text-text-color text-sm flex-col sm:flex-row">
              {type !== 'playlist' && view && (
                <div className="flex items-center">
                  <p>{view} views</p>
                  <div className="hidden sm:block rounded-full w-1 h-1 mx-2 bg-icon-color" />
                </div>
              )}
              <p>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
