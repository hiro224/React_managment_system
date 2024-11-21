import React from 'react';
import {
  CModal,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react';

const ConfirmDeleteModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal show={visible} onClose={onClose}>
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
