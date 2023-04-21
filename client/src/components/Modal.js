import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, modalRef }) {
  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 bg-[rgba(0,0,0,.7)] z-10 flex xl:hidden"
    >
      {children}
    </div>,
    document.getElementById('portal')
  );
}

export default Modal;
