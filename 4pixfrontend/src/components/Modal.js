import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import "../sass/main.scss";

const Modal = (props) => {
    return props.isOpen
        ? createPortal(
              <div className="modal">
                  <div className="modal__body">
                      {props.title}
                      {props.content}
                      {props.actions}
                  </div>
                  <div
                      onClick={props.closeModal}
                      className="modal__overlay"
                  ></div>
              </div>,

              document.querySelector("#modal-root")
          )
        : null;

    // <div>
    //     <div className="input-group">
    //         <input type="text" className="username" />
    //         <input type="email" className="email" />
    //     </div>
    // </div>
};

export default Modal;
