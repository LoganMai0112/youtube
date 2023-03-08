import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-[rgba(0,0,0,.7)] z-10 flex xl:hidden">
      {children}
    </div>,
    document.getElementById('portal')
  );
}

export default Modal;
