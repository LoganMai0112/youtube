import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

export default function SideCard({
  id,
  title,
  channel,
  createdAt,
  thumbnail,
  type,
  view,
}) {
  return (
    <Link to={type ? `/${type}s/${id}` : `/videos/${id}`} replace>
      <div className="w-full h-fit flex flex-row cursor-pointer">
        <img
          src={thumbnail || '/logo.png'}
          alt="thumbnail"
          className="aspect-video rounded-md w-40 object-cover"
        />
        <div className="flex flex-row items-start pl-3">
          <div>
            <p className="text-ellipsis overflow-hidden text-white text-xl font-bold max-h-14">
              {title}
            </p>
            {channel && (
              <Link to={`/users/${channel.id}`}>
                <p className="text-text-color hover:text-white text-sm">
                  {channel.name}
                </p>
              </Link>
            )}
            <div className="flex sm:items-center flex-col sm:flex-row text-text-color text-sm">
              {type !== 'playlist' && (
                <>
                  {view && <p>{view} views</p>}
                  <div className="hidden sm:block rounded-full w-1 h-1 mx-2 bg-icon-color" />
                </>
              )}
              <p>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
