import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CRow,
  CSelect
} from '@coreui/react';
import { useHistory } from 'react-router';
import DatePicker from '../../common/datepicker/DatePicker';
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import { ApiRequest } from "../../common/ApiRequest";
import moment from "moment";

const EmployeeRegistrationIndex = () => {
  const history = useHistory();
  const [genderData, setGenderData] = useState([
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" },
  ]);
  const [englishSkillData, setEnglishSkill] = useState([
    { id: "1", name: "Elementary" },
    { id: "2", name: "Intermediate" },
    { id: "3", name: "Advanced" },
    { id: "4", name: "Proficient" },
  ]);
  const [japaneseSkill, setJapaneseSkill] = useState([
    { id: "1", name: "N1" },
    { id: "2", name: "N2" },
    { id: "3", name: "N3" },
    { id: "4", name: "N4" },
    { id: "5", name: "N5" },
  ]);

  const [fromDate, setFromDate] = useState(null); // for from date
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectJapan, setSelectJapan] = useState("");
  const [selectEng, setSelectEng] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [updateID, setUpdateID] = useState(localStorage.getItem('Update'));
  const [loading, setLoading] = useState(false); // For Loading
  const [updateStatus, setUpdateStatus] = useState(false); // for update status
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message

  useEffect(() => {
    let flag = localStorage.getItem('LoginProcess');
    let updateFrom = localStorage.getItem('Update');
    localStorage.removeItem('Update');
    setUpdateID(updateFrom);
    if (flag === "true") {
      if (updateFrom != null) {
        formload();
        setUpdateStatus(true);
      }
    } else {
      history.push('/Login');
    }
  }, [history]);

  const userNameChange = (e) => setUserName(e.target.value);
  const emailChange = (e) => setEmail(e.target.value);
  const selectJapanChange = (e) => setSelectJapan(e.target.value);
  const selectEngChange = (e) => setSelectEng(e.target.value);
  const selectGenderChange = (e) => setSelectGender(e.target.value);

 const fromDateChange = (date) => {
  const formattedDate = moment(new Date(date), 'dd-MM-yyyy'); // Ensure input date format
  if (validateDOB(formattedDate)) {
    setFromDate(formattedDate);
  } else {
    console.error("Invalid Date Format");
  }
};

  


  const validateDOB = (date) => {
    const selectedDate = moment(date, "DD-MM-YYYY");
    const today = moment();
    const age = today.diff(selectedDate, 'years');

    if (!selectedDate.isValid() || selectedDate.isAfter(today) || age < 18 || age > 120) {
      setError(["Please select a valid birthdate."]);
      setFromDate(null); // Reset the date if invalid
      return false;
    }

    setError([]); // Clear any previous errors if valid
    return true;
  };

  const formload = async () => {
    setLoading(true);
    let saveData = {
      method: "get",
      url: `employee/edit/${updateID}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
    } else {
      if (response.data.status === "OK") {
        setUserName(response.data.data.name);
        setEmail(response.data.data.email);
        setSelectJapan(response.data.data.japanese_skill);
        setSelectEng(response.data.data.english_skill);
        setFromDate(moment(response.data.data.date_of_birth));
        setSelectGender(response.data.data.gender);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  const reset = () => {
    setUserName("");
    setEmail("");
    setSelectJapan("");
    setSelectEng("");
    setFromDate(null);
    setSelectGender("");
  };

  const saveClick = async () => {
    if (!validateDOB(fromDate)) return;
  
    setLoading(true);
  
    try {
      let saveData = {
        method: "post",
        url: `employee/save`,
        params: {
          name: userName,
          email: email,
          japanese_skill: selectJapan,
          english_skill: selectEng,
          gender: selectGender,
          date_of_birth: moment(fromDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
        },
      };
  
      let response = await ApiRequest(saveData);
  
      if (response.flag === false) {
        setError([response.message]);
        setSuccess([]);
      } else {
        if (response.data.status === "OK") {
          setSuccess(["Employee saved successfully"]);
          setError([]);
          reset(); // Optional: reset form after successful save
        } else {
          setError([response.data.message]);
          setSuccess([]);
        }
      }
    } catch (error) {
      setError(["An error occurred while saving."]);
      setSuccess([]);
      console.error("Save Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const updateClick = async () => {
    if (!validateDOB(fromDate)) return; // Ensure date is valid
  
    setLoading(true);
  
    try {
      let updateData = {
        method: "post",
        url: `employee/update/${updateID}`,
        params: {
          name: userName,
          email: email,
          japanese_skill: selectJapan,
          english_skill: selectEng,
          gender: selectGender,
          date_of_birth: moment(fromDate, "DD-MM-YYYY").format("YYYY-MM-DD"), // Correct date format
        },
      };
  
      let response = await ApiRequest(updateData);
  
      if (response.flag === false) {
        setError([response.message]);
        setSuccess([]);
      } else {
        if (response.data.status === "OK") {
          setSuccess(["Employee updated successfully"]);
          setError([]);
        } else {
          setError([response.data.message]);
          setSuccess([]);
        }
      }
    } catch (error) {
      setError(["An error occurred while updating."]);
      setSuccess([]);
      console.error("Update Error:", error);
    } finally {
      setLoading(false); // Ensure loading is stopped regardless of success or failure
    }
  };
  

  return (
    <>
      <CRow>
        <CCol xs="12">
          <SuccessError success={success} error={error} />
          <CCard className='n-card'>
            <CCardHeader style={{backgroundColor:'#00050ae2'}}>
              <center><h4 style={{fontWeight:'bold', color:'#96B9E2', fontSize:'30px'}} className='m-0'>Employee Registration</h4></center>
            </CCardHeader>
            <CCardBody>
              <CRow style={{ marginTop: "10px" }}>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>UserName</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={userName} onChange={userNameChange} placeholder='Username' />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Gender</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect value={selectGender} onChange={selectGenderChange}>
                        <option value="">-- Select --</option>
                        {genderData.map((data, index) => (
                          <option key={index} value={data.name}>{data.name}</option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>English Skill</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect value={selectEng} onChange={selectEngChange}>
                        <option value="">-- Select --</option>
                        {englishSkillData.map((data, index) => (
                          <option key={index} value={data.name}>{data.name}</option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                </CCol>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Email</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={email} onChange={emailChange} placeholder='Email' />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Date of Birth</p>
                    </CCol>
                    <CCol lg="7">
                      <DatePicker value={fromDate} change={fromDateChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                  <CRow style={{ marginTop: "1px" }}>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Japanese Skill</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect value={selectJapan} onChange={selectJapanChange}>
                        <option value="">-- Select --</option>
                        {japaneseSkill.map((data, index) => (
                          <option key={index} value={data.name}>{data.name}</option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                </CCol>
              </CRow>
              <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
                {updateStatus === false && (
                  <CButton className="form-btn" onClick={saveClick}>Save</CButton>
                )}
                {updateStatus === true && (
                  <CButton className="form-btn" onClick={updateClick}>Update</CButton>
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Loading start={loading} />
    </>
  );
}

export default EmployeeRegistrationIndex;
