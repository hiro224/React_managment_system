import React, { useEffect, useState } from 'react';
import { ApiRequest } from '../common/ApiRequest';
import SuccessError from "../common/SuccessError";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react';
import { Pie } from 'react-chartjs-2';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { useHistory } from 'react-router';

const Dashboard = () => {
  const [totalMale, setTotalMale] = useState(0); // Total number of male employees
  const [totalFemale, setTotalFemale] = useState(0); // Total number of female employees
  const [totalOther, setTotalOther] = useState(0); // Total number of other gender employees
  const [engl1, setEngl1] = useState(0);
  const [engl2, setEngl2] = useState(0);
  const [engl3, setEngl3] = useState(0);
  const [engl4, setEngl4] = useState(0);
  const [jpl1, setjpl1] = useState(0);
  const [jpl2, setjpl2] = useState(0);
  const [jpl3, setjpl3] = useState(0);
  const [jpl4, setjpl4] = useState(0);
  const [jpl5, setjpl5] = useState(0);
  const [total, setTotal] = useState(0); // Total number of employees
  const [aTotal, setaTotal] = useState(0); // Total number of admins
  const [error, setError] = useState([]); // For error messages
  const [employeeList, setEmployeeList] = useState([]); // For employee list data
  const [admin, setAdmin] = useState([]); // For admin list data
  let history = useHistory();

  useEffect(() => {
    let flag = localStorage.getItem('LoginProcess');
    if (flag === 'true') {
      console.log('Login process success');
      search(); // Fetch employee data
      aSearch(); // Fetch admin data
    } else {
      history.push('/Login');
    }
  }, [history]);

  const search = async (page = 1) => {
    let allEmployees = [];
    let isMoreData = true;

    while (isMoreData) {
      let search = {
        method: 'get',
        url: `employee/search?page=${page}`,
      };
      let response = await ApiRequest(search);
      if (response.flag === false) {
        setEmployeeList([]);
        setError(response.message);
        isMoreData = false; // Stop the loop if there's an error
      } else {
        if (response.data.status === 'OK') {
          const employees = response.data.data.data;
          allEmployees = [...allEmployees, ...employees];

          // Check if there is more data to fetch
          if (response.data.data.current_page < response.data.data.last_page) {
            page++;
          } else {
            isMoreData = false;
          }
        } else {
          setError([response.data.message]);
          setEmployeeList([]);
          isMoreData = false; // Stop the loop if there's an error
        }
      }
    }

    // Set the state with all employees' data
    setEmployeeList(allEmployees);
    setTotal(allEmployees.length);

    const maleCount = allEmployees.filter(emp => emp.gender === 'Male').length;
    const femaleCount = allEmployees.filter(emp => emp.gender === 'Female').length;
    const otherCount = allEmployees.filter(emp => emp.gender === 'Other').length;
    const englv1 = allEmployees.filter(emp => emp.english_skill === 'Elementary').length;
    const englv2 = allEmployees.filter(emp => emp.english_skill === 'Intermediate').length;
    const englv3 = allEmployees.filter(emp => emp.english_skill === 'Advanced').length;
    const englv4 = allEmployees.filter(emp => emp.english_skill === 'Proficient').length;
    const jplv1 = allEmployees.filter(emp => emp.japanese_skill === 'N5').length;
    const jplv2 = allEmployees.filter(emp => emp.japanese_skill === 'N4').length;
    const jplv3 = allEmployees.filter(emp => emp.japanese_skill === 'N3').length;
    const jplv4 = allEmployees.filter(emp => emp.japanese_skill === 'N2').length;
    const jplv5 = allEmployees.filter(emp => emp.japanese_skill === 'N1').length;

    setEngl1(englv1);
    setEngl2(englv2);
    setEngl3(englv3);
    setEngl4(englv4);
    setjpl1(jplv1);
    setjpl2(jplv2);
    setjpl3(jplv3);
    setjpl4(jplv4);
    setjpl5(jplv5);
    setTotalMale(maleCount);
    setTotalFemale(femaleCount);
    setTotalOther(otherCount);
    setError([]);
  };

  const aSearch = async (page = 1) => {
    let search = {
      method: 'get',
      url: `admin/get?page=${page}`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);
      setError(response.message);
    } else {
      if (response.data.status === 'OK') {
        setaTotal(response.data.data.total);
        setAdmin(response.data.data.data);
        setError([]);
      } else {
        setError([response.data.message]);
        setAdmin([]);
      }
    }
  };

  // Pie Chart Data
  const pieData = {
    labels: ['Employees', 'Admins'],
    datasets: [
      {
        data: [total, aTotal],
        backgroundColor: ['#f485ed', '#96B9E2'],
        hoverBackgroundColor: ['#f864ee', '#489dff'],
      },
    ],
  };

  const pieGender = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [totalMale, totalFemale, totalOther],
        backgroundColor: ['#f485ed', '#96B9E2', '#eef881'],
        hoverBackgroundColor: ['#f864ee', '#489dff', '#ecfb48'],
      },
    ],
  };

  // Bar Chart Data
  const barData = [
    { name: 'Elementary', number: engl1 },
    { name: 'Intermediate', number: engl2 },
    { name: 'Advanced', number: engl3 },
    { name: 'Proficient', number: engl4 },
  ];

  const barData1 = [
    { name: 'N5', number: jpl1 },
    { name: 'N4', number: jpl2 },
    { name: 'N3', number: jpl3 },
    { name: 'N2', number: jpl4 },
    { name: 'N1', number: jpl5 },
  ];

  return (
    <>
      <center>
        <h1 style={{ fontWeight: 'bold', color: '#96B9E2' }}>Dashboard</h1>
      </center>
      <br /><br />
      <CRow>
        <CCol lg="4">
          <CCard className="n1-card">
            <center><h4 style={{ fontWeight: 'bold', color: '#96B9E2' }}
              className='mt-3'
            >Total of Employees</h4></center>
            <CCardBody>
              <center><h1
                style={{ fontWeight: 'bold', fontSize: '132px', color: '#f36edf' }}
              >{total}</h1></center>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg="4">
          <CCard className="n1-card">
            <center><h4 style={{ fontWeight: 'bold', color: '#96B9E2' }}
              className='mt-4 mb-4'
            >Gender Distribution</h4></center>
            <CCardBody>
              <Pie data={pieGender} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg="4">
          <CCard className='n1-card'><center>
            <img style={{ width: "250px", height: "255px", }} src='/image/gif1.gif' alt="gif"></img>
            </center>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg='6'>
          <CCard className="n1-card">
            <center><h4 style={{ fontWeight: 'bold', color: '#96B9E2' }}
              className='mt-4 mb-4'
            >English Level Distribution</h4></center>
            <CCardBody>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="number" fill="#96B9E2">
                    <LabelList dataKey="number" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg='6'>
          <CCard className="n1-card">
            <center><h4 style={{ fontWeight: 'bold', color: '#96B9E2' }}
              className='mt-4 mb-4'
            >Japanese Level Distribution</h4></center>
            <CCardBody>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData1} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="number" fill="#96B9E2">
                    <LabelList dataKey="number" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <SuccessError error={error} />
    </>
  );
};

export default Dashboard;
