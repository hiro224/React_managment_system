import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { ApiRequest } from '../../common/ApiRequest';
import EmployeeListForm from './EmployeeListForm';
import Dashboard from '../../dashboard/Dashboard';
import { useHistory } from 'react-router-dom';
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import ConfirmDeleteModal from './ConfirmDeleteModel'; // Correct import path

const EmployeeListIndex = () => {
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [loading, setLoading] = useState(false); // for loading condition
  const [employeeList, setEmployeeList] = useState([]); // for user list table data
  const [currentPage, setCurrentPage] = useState(); // for user list table current page
  const [lastPage, setLastPage] = useState(""); // for user list table last page
  const [genderData, setGenderData] = useState([
    { id: "0", name: "All" },
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" },
  ]);
  const [selectGender, setSelectGender] = useState("");
  const [userName, setUserName] = useState("");
  const [total, setTotal] = useState(""); // total rows
  const [per, setPer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // for modal state
  const [deleteId, setDeleteId] = useState(null); // to store the id of the employee to be deleted
  let history = useHistory();

  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`);
    if (flag === "true") {
      console.log("Login process success");
    } else {
      history.push(`/Login`);
    }

    (async () => {
      setLoading(true);
      await search();
      setLoading(false);
    })();
  }, []);

  const search = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        name: userName,
        gender: selectGender,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setEmployeeList([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setEmployeeList(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
      } else {
        setError([response.data.message]);
        setEmployeeList([]);
      }
    }
  };

  const tempSearch = async (page) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        name: userName,
        gender: selectGender,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setEmployeeList([]);
    } else {
      if (response.data.status === "OK") {
        setEmployeeList(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
        setPer(response.data.data.per_page);
      } else {
        setEmployeeList([]);
      }
    }
  };

  const searchClick = () => {
    search();
  };

  const pagination = (i) => {
    setCurrentPage(i);
    tempSearch(i);
  };

  const editClick = (id) => {
    history.push('/employee-management/employee-register');
    localStorage.setItem("Update", id);
  };

  const delClick = async () => {
    setLoading(true);
    let obj = {
      method: "delete",
      url: `employee/delete/${deleteId}`,
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    setIsModalOpen(false); // Close modal after delete
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        let page = currentPage;
        setSuccess([response.data.message]);
        if (employeeList.length - 1 === 0) {
          page = currentPage - 1;
        }
        tempSearch(page);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
      }
    }
  };

  const userNameChange = (e) => {
    setUserName(e.target.value);
  };
  
  const selectGenderChange = (e) => {
    setSelectGender(e.target.value);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard className="n-card">
            <CCardHeader style={{backgroundColor:"#00050ae2"}}>
              <center><h4 style={{fontWeight:'bold',
                 fontSize:'30px'}}
                 >Employee List</h4></center>
            </CCardHeader>
            <CCardBody>
              <SuccessError success={success} error={error} />
              <EmployeeListForm
                employeeList={employeeList}
                total={total}
                currentPage={currentPage}
                lastPage={lastPage}
                userName={userName}
                userNameChange={userNameChange}
                genderData={genderData}
                selectGenderChange={selectGenderChange}
                selectGender={selectGender}
                pagination={pagination}
                searchClick={searchClick}
                editClick={editClick}
                delClick={handleDeleteClick}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Loading start={loading} />
      <ConfirmDeleteModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={delClick}
      />
    </>
  );
};

export default EmployeeListIndex;
