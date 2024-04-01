import React from 'react'
import HaederCompany from './HaederCompany'
import Fotter from '../componets/Fotter/Fotter'
import Table from 'react-bootstrap/Table';


export default function ApplyPending() {
 const userLogin: any = JSON.parse(
    localStorage.getItem("userLogin") || "{}"
 )        

  return (
    <div>
        <HaederCompany></HaederCompany>
        <p className='text-[24px] font-[700] m-3 text-center'>Danh Sách Ứng Tuyển</p>
<div className='w-[1200px] m-auto'>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Stt</th>
          <th>Tên ứng viên</th>
          <th>Tên Tuyển Dụng</th>
          <th>Username</th>
        </tr>
      </thead>
      
    </Table>
</div>
        <Fotter></Fotter>
    </div>
  )
}
