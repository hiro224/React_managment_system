import { CButton, CCol, CInput, CSelect, CImg, CRow } from '@coreui/react';
import React from 'react';
import { format } from 'date-fns';
import NPagination from '../../common/pagination/NPagination';

function EmployeeListForm(props) {
  const {
    userName, userNameChange, genderData, selectGender, selectGenderChange,
    searchClick, employeeList, total,
    currentPage, lastPage, pagination,
    editClick, delClick, per = 10  // Default to 10 if per is undefined
  } = props;

  // Calculate the start index based on the current page and items per page
  const startIndex = (currentPage - 1) * per + 1;

  return (
    <div className='mt-4'>
      <CRow alignHorizontal='center' className="mb-3">
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
              <p className='mt-2'>Gender</p>
            </CCol>
            <CCol lg="7">
              <CSelect
                value={selectGender}
                onChange={selectGenderChange}
              >
                <option value="">-- Select --</option>
                {genderData.map((data, index) => (
                  <option
                    key={index}
                    value={data.name}
                  >
                    {data.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow alignHorizontal="center" className="mt-5">
        <CButton className="form-btn" onClick={searchClick}>
          Search
        </CButton>
      </CRow>
      <CRow className='mt-5'>
        <CCol>
          {employeeList.length > 0 && (
            <>
              <p style={{ textAlign: 'right' }} className='mb-0 font-weight-bold'>
                Total : {total} row(s)
              </p>
              <div className='overflow'>
                <table className='emp-list-table'>
                  <thead>
                    <tr>
                      <th className="text-center" width={50}>No</th>
                      <th className='text-center' width={180}>UserName</th>
                      <th className='text-center' width={250}>Email</th>
                      <th className='text-center' width={200}>Date Of Birth</th>
                      <th className='text-center' width={150}>Gender</th>
                      <th className='text-center' width={230}>English Skill</th>
                      <th className='text-center' width={150}>Japanese Skill</th>
                      <th className='text-center' width={80} colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.map((data, index) => (
                      <tr key={index}>
                        <td width={50} className="text-center">
                          {startIndex + index}
                        </td>
                        <td className="text-center">{data.name}</td>
                        <td className="text-center">{data.email}</td>
                        <td className='text-center'>{format(new Date(data.date_of_birth), 'dd-MM-yyyy')}</td>
                        <td className='text-center'>{data.gender}</td>
                        <td className="text-center">{data.english_skill}</td>
                        <td className="text-center">{data.japanese_skill}</td>
                        <td style={{ border: "1px solid", textAlign: "center" }}>
                          <div className="user-edit">
                            <CImg
                              src="/image/edit.png"
                              onClick={() => editClick(data.id)}
                              style={{
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </td>
                        <td style={{ border: "1px solid", textAlign: "center" }}>
                          <div className="user-before">
                            <CImg
                              src='/image/del.png'
                              onClick={() => delClick(data.id)}
                              style={{
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                              }}
                            />
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
      <br />
      {total > 10 &&
        <NPagination
          activePage={currentPage}
          pages={lastPage}
          currentPage={currentPage}
          totalPage={lastPage}
          pagination={pagination}
        />
      }
    </div>
  );
}

export default EmployeeListForm;
