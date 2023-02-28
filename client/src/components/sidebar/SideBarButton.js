import React from 'react';

function SideBarButton({ icon, avatar, text, option, endIcon, number }) {
  return (
    <div className="group flex flex-row justify-between px-10 py-4 hover:bg-hover cursor-pointer items-center">
      <div className="flex flex-row">
        <div className="h-6 w-6 mr-3 flex items-center [&>svg]:fill-icon-color group-hover:[&>svg]:fill-main-color [&>svg]:w-full [&>svg]:h-full">
          {icon}
          {avatar && <img src={avatar} alt="avatar" className="rounded-full" />}
        </div>
        <p className="text-text-color group-hover:text-white text-sm">{text}</p>
      </div>
      {option && (
        <div className="h-5 w-5 flex items-center justify-between [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-white hover:[&>svg]:fill-main-color">
          {option}
        </div>
      )}
      {endIcon && (
        <div className="h-6 w-6 flex items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-main-color">
          {endIcon}
        </div>
      )}
      {number && (
        <div className="h-6 w-6 flex justify-center items-center rounded-md bg-yellow-900 text-main-color group-hover:bg-yellow-700">
          {number}
        </div>
      )}
    </div>
  );
}

export default SideBarButton;
