import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { ApiRequest } from '../../common/ApiRequest';
import Dashboard from '../../dashboard/Dashboard';
import { useHistory } from 'react-router-dom';




const Test = () => {
  

  return (
    <>
      <CRow>
        <CCol>
            <h1>Hello world</h1>
            <CButton>Button</CButton> 
        </CCol>
      </CRow>
     
    </>
  );
};

export default Test;
