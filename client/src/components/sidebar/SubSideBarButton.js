import React from 'react';

function SubSideBarButton({ icon }) {
  return (
    <div className="group flex flex-row justify-center px-4 py-4 hover:bg-hover cursor-pointer items-center rounded-xl">
      <div className="flex flex-row">
        <div className="h-6 w-6 flex items-center [&>svg]:fill-icon-color group-hover:[&>svg]:fill-main-color [&>svg]:w-full [&>svg]:h-full">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default SubSideBarButton;
