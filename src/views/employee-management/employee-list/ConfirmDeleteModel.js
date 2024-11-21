import React from 'react';
import {
  CModal,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react';

const ConfirmDeleteModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal
      show={visible}
      onClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          textAlign: 'center',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }
      }}
    >
      <CModalBody>
        Are you sure you want to delete?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>No</CButton>
        <CButton color="danger" onClick={onConfirm}>Yes</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmDeleteModal;
