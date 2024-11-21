import React from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const ConfirmUpdateModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <CModal show={isVisible} onClose={onClose} color="warning">
      <CModalHeader closeButton>
        Confirm Update
      </CModalHeader>
      <CModalBody>
        Are you sure you want to update this record?
      </CModalBody>
      <CModalFooter>
        <CButton color="warning" onClick={onConfirm}>Yes</CButton>{' '}
        <CButton color="secondary" onClick={onClose}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmUpdateModal;
