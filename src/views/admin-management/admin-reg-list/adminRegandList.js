import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImg,
  CInput,
  CRow
} from '@coreui/react'
import { useHistory } from 'react-router'
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import { ApiRequest } from "../../common/ApiRequest";
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ConfirmSaveModal from './ConfirmSaveModal';
import NPagination from '../../common/pagination/NPagination';
import { validatePwd } from '../../common/CommonValidation';


const AdminRegAndListIndex = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState([]);
  const [totalRow, setTotalRow] = useState("");
  const [currentPage, setCurrentPage] = useState();
  const [lastPage, setLastPage] = useState("");
  const [updateID, setUpdateID] = useState(localStorage.getItem('Update'));
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);
  const [total, setTotal] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false); // Add save modal state
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    let flag = localStorage.getItem('LoginProcess');
    if (flag === "true") {
      console.log("Login process success");
    } else {
      history.push('/Login');
    }

    (async () => {
      setLoading(true);
      await search();
      setLoading(false);
    })();
  }, [history]);

  const search = async (page = 1) => {
    let search = {
      method: "get",
      url: `admin/get?page=${page}`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setAdmin(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
      } else {
        setError([response.data.message]);
        setAdmin([]);
      }
    }
  }

  const pagination = (i) => {
    search(i); // Call the correct search function with the page number
  };

  
  

  const userNameChange = (e) => {
    setUserName(e.target.value);
  }

  const passwordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  
    // Use validatePwd function to check if the password is strong
    if (!validatePwd(newPassword)) {
      setError(["Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."]);
    } else {
      setError([]); // Clear any existing error when the password is valid
    }
  };

  const reset = () => {
    setUserName("");
    setPassword("");
  }

// Add handleConfirmSave function similar to handleConfirmDelete
const handleConfirmSave = async () => {
  setIsSaveModalVisible(false); // Hide the save modal

  // Validate the password before proceeding
  if (!validatePwd(password)) {
    setError(["Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."]);
    return; // Stop the function execution if the password is invalid
  }

  // Continue with the save logic
  setLoading(true);
  setUpdateStatus(false);

  let saveData = {
    method: "post",
    url: `admin/save`,
    params: {
      name: userName,
      password: password,
    },
  };

  let response = await ApiRequest(saveData);
  if (response.flag === false) {
    setError(response.message);
    setSuccess([]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } else {
    if (response.data.status === "OK") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setSuccess([response.data.message]);
      reset();
      search();
      setError([]);
    } else {
      setError([response.data.message]);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }
  setLoading(false);
};
 

  const saveClick = async () => {
    // Validate the password before proceeding
    if (!validatePwd(password)) {
      setError(["Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."]);
      return; // Stop the function execution if the password is invalid
    }
  
    // Continue with the save logic
    setLoading(true);
    setUpdateStatus(false);
  
    let saveData = {
      method: "post",
      url: `admin/save`,
      params: {
        name: userName,
        password: password,
      },
    };
  
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([response.data.message]);
        reset();
        search();
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };
  

  const editClick = async (id) => {
    setUpdateStatus(true);
    setUpdateID(id);
    let saveData = {
      method: "get",
      url: `admin/edit/${id}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUserName(response.data.data.name);
        setPassword(response.data.data.password);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  }

  const delClick = (id) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    setIsModalVisible(false);
    if (!deleteId) return;

    try {
      setLoading(true);
      const obj = {
        method: "delete",
        url: `admin/delete/${deleteId}`,
      };
      const response = await ApiRequest(obj);
      setLoading(false);

      if (response.flag === false) {
        setSuccess([]);
        setError(response.message);
      } else if (response.data.status === "OK") {
        setSuccess([response.data.message]);
        reset();
        search();
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
      }
    } catch (error) {
      setLoading(false);
      setError(['An error occurred. Please try again.']);
      setSuccess([]);
    }
  };

  const updateClick = async () => {
    // Validate the password before proceeding
    if (!validatePwd(password)) {
      setError(["Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."]);
      return; // Stop the function execution if the password is invalid
    }
  
    // Continue with the update logic
    setLoading(true);
    setUpdateStatus(false);
  
    let saveData = {
      method: "post",
      url: `admin/update/${updateID}`,
      params: {
        name: userName,
        password: password,
      },
    };
  
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([response.data.message]);
        reset();
        search();
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };
  

  return (
    <>
      <CRow>
        <CCol xs="12">
          <SuccessError success={success} error={error} />
          <CCard className='n-card'>
            <CCardHeader style={{backgroundColor:'#00050ae2'}}>
              <h4 className='m-0'>Admin Registration</h4>
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
                      <CInput type="text" value={userName} onChange={userNameChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Password</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="password" value={password} onChange={passwordChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow style={{ justifyContent: "center" }} className="mt-4">
                {!updateStatus && (
                  <CButton className="form-btn" onClick={saveClick}>
                    Save
                  </CButton>
                )}
                {updateStatus && (
                  <CButton className="form-btn" onClick={updateClick}>
                    Update
                  </CButton>
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-3">
        <CCol xs="12">
          <CCard className='n-card'>
            <CCardHeader style={{backgroundColor:'#00050ae2'}}>
              <h4 className='m-0'>Admin List</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  {admin.length > 0 && (
                    <>
                      <p style={{textAlign:'right'}} className='mb-0 font-weight-bold'>Total: {total} row(s)</p>
                      <div className='overflow'>
                        <table className='emp-list-table'>
                          <thead>
                            <tr>
                              <th className="text-center" width={50}>No</th>
                              <th className='text-center' width={220}>UserName</th>
                              <th className='text-center' width={220}>UserCode</th>
                              <th className='text-center' width={220}>Password</th>
                              <th className='text-center' width={80} colSpan={2}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {admin.map((data, index) => (
                              <tr key={index}>
                                <td width={50} className="text-center">{index + 1}</td>
                                <td className="text-center" width={120}>{data.name}</td>
                                <td className="text-center" width={120}>{data.user_code}</td>
                                <td className="text-center" width={120}>{data.password}</td>
                                <td style={{ border: "1px solid" , textAlign:"center"}}>
                              <div className="user-edit">
                                <CImg
                                  src="/image/edit.png"
                                  onClick={() => {
                                    editClick(data.id);
                                  }}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                              </div>
                            </td>

                            <td style={{ border: "1px solid" , textAlign:"center"}}>
                              <div className="user-before">
                                <CImg
                                  src='/image/del.png' 
                                  onClick={() => delClick(data.id)}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                              </div>
                            </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ConfirmDeleteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />


      <br></br>
       {total > 10 &&
        <NPagination
          activePage={currentPage}
          pages={lastPage}
          currentPage={currentPage}
          totalPage={lastPage}
          pagination={pagination}
        />
      }
    </>
  );
}

export default AdminRegAndListIndex;
