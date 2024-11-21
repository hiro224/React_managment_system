import React from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const ConfirmSaveModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <CModal show={isVisible} onClose={onClose} color="info">
      <CModalHeader closeButton>
        Confirm Save
      </CModalHeader>
      <CModalBody>
        Are you sure you want to save this record?
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={onConfirm}>Yes</CButton>{' '}
        <CButton color="secondary" onClick={onClose}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmSaveModal;
