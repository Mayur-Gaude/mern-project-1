import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastMessage = ({ show, onClose, title, message, bg }) => {
  return (
    <ToastContainer position="bottom-center" className="p-3">
      <Toast show={show} onClose={onClose} bg={bg} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
