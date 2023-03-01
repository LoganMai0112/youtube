import React from 'react';

function MenuButton({ icon, text }) {
  return (
    <div>
      <div className="flex flex-row p-3 items-center hover:bg-hover group w-full">
        <div className="w-5 h-5 mr-3 [&>svg]:fill-icon-color group-hover:[&>svg]:fill-main-color [&>svg]:w-full [&>svg]:h-full">
          {icon}
        </div>
        <div className="text-text-color group-hover:text-white">{text}</div>
      </div>
    </div>
  );
}

export default MenuButton;
