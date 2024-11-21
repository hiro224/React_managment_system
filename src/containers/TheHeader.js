import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CSubheader,
  CBreadcrumbRouter,
  CRow,
  CCol,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import moment from "moment";
import routes from "../routes";
import { useHistory } from "react-router-dom";
import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [realTime, setRealTime] = useState(moment().format("h:mm:ss A"));
  const [date, setDate] = useState(moment().format("dddd, MMMM Do YYYY"));
  let history = useHistory();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRealTime(moment().format("h:mm:ss A"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader
      withSubheader
      style={{
        backgroundColor: "#96B9E2",  // Header background color
        borderRadius: "15px",         // Apply border radius to header
        margin: "10px",               // Add some margin for better visual separation
      }}
    >
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CSubheader
        className="px-3 d-flex align-items-center justify-content-between"
        style={{
          backgroundColor: "#96B9E2", // Subheader background color
          borderRadius: "0 0 15px 15px",        // Apply border radius to subheader
        }}
      >
        <div className="d-flex align-items-center">
          <CToggler className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
          <CToggler className="menu" onClick={toggleSidebar} />
          {/* <CBreadcrumbRouter 
            className="nev-k m-0 px-0 px-md-3"
            routes={routes}
          /> */}
        </div>
        <div className="d-flex align-items-center">
          <CRow>
            <CCol>
            <img style={{width:'50px', height:'50px', marginRight:'10px'}}
             src='/image/gf3.gif'></img>
            </CCol>
          </CRow>
          <CRow className="align-items-center">
            <CCol
              className="text-right"
              style={{
                minWidth: "10rem",
                color: "#fff",  // Adjust text color for contrast
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              <CLabel>
                {date} <br />
                {realTime}
              </CLabel>
            </CCol>
          </CRow>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
