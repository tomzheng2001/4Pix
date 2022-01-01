import React from "react";
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

};

export default Modal;
