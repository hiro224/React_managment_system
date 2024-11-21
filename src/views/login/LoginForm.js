import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CRow
} from '@coreui/react';
import $ from "jquery";
import SuccessError from '../common/SuccessError';

const LoginForm = (props) => {
  // const [zoomSize, setZoomSize] = useState(Math.round(window.devicePixelRatio * 100));
  
  const { loginClick, passwordChange, password, userCodeChange, userCode, success, error,zoomSize } = props;

  // useEffect(() => {
  //   $(window).resize(function () {
  //     setZoomSize(Math.round(window.devicePixelRatio * 100));
  //   });
  // }, []);

  const handleKeyDown = (event, nextInputId) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (userCode && password) {
        loginClick();  // Trigger loginClick if both inputs are filled
      } else {
        const nextInput = document.getElementById(nextInputId);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  return (
    <>
      {zoomSize < 170 && (
        <div className="min-vh-100 flex-row align-items-center login-bg">
          <CRow>
            <CCol lg="4">
              <SuccessError success={success} error={error} />
            </CCol>
            <CCol lg="6">
              <CCard className="login" style={{
                marginTop: "70px",
                borderRadius: "20px",
                backgroundColor:"#01070d74",
                width: "500px",
                height: "400px"
              }}>
                <CCardBody>
                  <CRow alignHorizontal='center'>
                    <CImg src='./image/snow.png' width={100} height={100} />
                  </CRow>
                  <CRow alignHorizontal='center' className="mb-3">
                    <h3 className='login-title'>Login Form</h3>
                  </CRow>
                  <CRow className="mt-4 align-items-center">
                    <CCol lg="4"><CLabel className="form-label">User Code</CLabel></CCol>
                    <CCol lg="8">
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CImg src='./image/user.png' width={20} height={20} />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput 
                          id="userCode"  // Add an ID
                          className="login-input" 
                          placeholder='Enter User Code' 
                          type='text' 
                          autoFocus 
                          value={userCode} 
                          onChange={userCodeChange} 
                          onKeyDown={(e) => handleKeyDown(e, 'password')} // Handle Enter key press
                          style={{ color:'#130b88' }} 
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <br />
                  <br />
                  <CRow className="align-items-center">
                    <CCol lg="4"><CLabel className="form-label">Password</CLabel></CCol>
                    <CCol lg="8">
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CImg src='./image/password.png' width={20} height={20} />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput 
                          id="password"  // Add an ID
                          className="login-input" 
                          placeholder='Enter Password' 
                          type='password'
                          value={password} 
                          onChange={passwordChange} 
                          onKeyDown={(e) => handleKeyDown(e, 'login')} // Handle Enter key press
                          style={{ color:'#130b88' }} 
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <br />
                  <br />
                  <CRow alignHorizontal='center' className="mb-4">
                    <CButton id="login" className="bn30" onClick={loginClick}>
                      Login
                    </CButton>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol lg="2" />
          </CRow>
        </div>
      )}

      {zoomSize >= 170 && (
        <div className="login-bg-mobile">
          <br />
          <br />
          <br />
          <h1 style={{ textAlign: "center", fontWeight: "bold", color: "#13256F" }}>
            Login Form
          </h1>
          <SuccessError success={success} error={error} />
          <CRow style={{ justifyContent: "center" }}>
            <CCol lg="12">
              <center>
                <CImg src={"image/snow.png"} width={200} />
                <br />
              </center>
            </CCol>
          </CRow>
          <CRow style={{ paddingRight: "100px", paddingLeft: "100px" }}>
            <CCol lg="3" />
            <CCol lg="6">
              <center>
                <CLabel style={{ fontWeight: "bold", color: "Blue" }}>User Code</CLabel>
                <br />
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CImg src='./image/user.png' width={20} height={20} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput 
                    id="userCodeMobile"  // Add an ID for mobile layout
                    className="login-input" 
                    placeholder='Enter User Code' 
                    type='text' 
                    autoFocus 
                    value={userCode} 
                    onChange={userCodeChange} 
                    onKeyDown={(e) => handleKeyDown(e, 'passwordMobile')} // Handle Enter key press
                    style={{ color:'#130b88' }} 
                  />
                </CInputGroup>
                <br />
                <CLabel style={{ fontWeight: "bold", color: "Blue" }}>Password</CLabel>
                <br />
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CImg src='./image/password.png' width={20} height={20} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput 
                    id="passwordMobile"  // Add an ID for mobile layout
                    className="login-input" 
                    placeholder='Enter Password' 
                    type='password'
                    value={password} 
                    onChange={passwordChange} 
                    onKeyDown={(e) => handleKeyDown(e, 'loginMobile')} // Handle Enter key press
                    style={{ color:'#130b88' }} 
                  />
                </CInputGroup>
                <br />
                <CButton id="loginMobile" className="bn30" onClick={loginClick}>
                  Login
                </CButton>
              </center>
            </CCol>
            <CCol lg="3" />
          </CRow>
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </>
  );
};

export default LoginForm;
