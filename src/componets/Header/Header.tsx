import React, { useEffect, useState } from "react";
import publicAxios from "../../axios.config/publicAxios";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import  io  from "socket.io-client";
import privateAxios from "../../axios.config/privateAxios";
import { list } from "firebase/storage";
 export interface User {
  user_id: number;
  user_avata: string ;
  user_email: string;
  user_fullName: string;
  user_password: string;
  user_recruitment: number;
  user_status: number;
  user_address: any;
  role:number
  
}

export default function Header() {

const [show, setShow] = useState(false);
const [userNotification, setUserNotification] = useState<any>([]);
const [changerPass, setChangerPass] = useState({
  oldPassword: "",
  newPassword: ""
});

  const userLogin: User | null = JSON.parse(
    localStorage.getItem("userLogin") || "{}"
  );
 async function getNoti() {
  try {
    const res= await axios.get(
      `http://localhost:3000/api/v1/user/notification/${userLogin?.user_id}`
    )
    setUserNotification(res.data.data);
  } catch (error) {
    console.log(error);
    
  }
 }

 useEffect(() => {
  const socket=io("http://localhost:3000")
  socket.on('server-send-seencv', (data: any) => {
    setUserNotification(data)
  })
   getNoti()
 },[])
const userLogout = ()=>{
  const checkLogout = window.confirm("Bạn có muốn đăng xuất")
  if (checkLogout) {
    localStorage.removeItem("userLogin")
  localStorage.removeItem("token")
  window.location.href = "/"
  }
}
const goCv = ()=>{
  if (!userLogin?.user_id) {
    alert("Vui lòng đăng nhập")
  }else{
    window.location.href = "/cv"
  }
}


const handleClose = () => {
  const checkOut = window.confirm("Hủy bỏ thay đổi")
  if (!checkOut) {
    return;
  }
  setShow(false)
};
const handleShow = () => setShow(true);

const changerPassword = async ()=>{
  const checkPassword = window.confirm("Bạn có muốn đổi mật khẩu")
  if (!checkPassword) {
    return;
  }
  if (changerPass.oldPassword =="" || changerPass.newPassword=="") {
    alert("Vui lòng điền đầy đủ")
  }
  if (changerPass.oldPassword === changerPass.newPassword) {
    alert("Vui lòng nhập mật khẩu khác với mật khẩu hiện tại")
  }else{
    try {
      const res = await privateAxios.put(`/api/v1/users/updatepassword/${userLogin?.user_id}`,changerPass)
    alert (res.data.message)
    window.location.reload()
  }catch (error:any) {
    console.log(error);
    alert(error.response.data.message)
  }
  }
}
console.log(userNotification);

  return (
    <div className="w-full h-[80px] flex justify-between pr-5 bg-[#FFFFFF]">
      <div className="flex font-[500] ">
        <img className="cursor-pointer"
        onClick={()=>window.location.href = '/'}
          width={200}
          src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
          alt=""
        />
        <p className="m-[30px] cursor-pointer  hover:text-[#00B150] " onClick={()=>window.location.href = '/'}>Việc Làm</p>
        <p className="m-[30px] cursor-pointer hover:text-[#00B150] " onClick={goCv}>Hồ sơ& CV</p>
        <p className="m-[30px] cursor-pointer  hover:text-[#00B150]" onClick={()=>window.location.href = '/company-public'} >Công ty</p>
      </div>

      {userLogin?.user_id ? (
        <div className="flex mr-[20px] mt-[5px]">
          <i className="fa-solid fa-bell text-[#00B150] text-3xl m-[20px]"></i>
          <img
            src={userLogin.user_avata}
            alt="avatar"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              margin: 10,
            }}
          />
         <Dropdown style={{marginTop:15}} >
      <Dropdown.Toggle style={{backgroundColor:'white',color:'black',border:'none',fontWeight:500}} variant="success" id="dropdown-basic">
        {userLogin.user_fullName}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{padding:10}}>
        <Dropdown.Item href="/inforuser" style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10}}><i className="fa-regular fa-pen-to-square mt-2 text-[#00B150] mr-1"></i> Cài đặt thông tin cá nhân</Dropdown.Item>
        <Dropdown.Item href="/inforuser" style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10}}><i className="fa-regular fa-eye mt-2 text-[#00B150] mr-1"></i> Nhà Tuyển Dụng Xem Hồ Sơ</Dropdown.Item>
        <Dropdown.Item href="#/action-4" style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10}}> <i className="fa-solid fa-gear mt-2 text-[#00B150] mr-1"></i>Gợi Ý Nhận Việc Làm </Dropdown.Item>
        <Dropdown.Item onClick={handleShow} style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10}}><i className="fa-solid fa-lock mt-2 text-[#00B150] mr-1"></i>Đổi Mật Khẩu</Dropdown.Item>
        <Dropdown.Item onClick={userLogout} style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10,color:"red"}}><i className="fa-solid fa-right-from-bracket mt-2  mr-1"></i> Đăng Xuất</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
      ) : (
        <div className="w-[300px]">
          <button
            className="w-[100px] h-8 border-[1px] border-[#00B150] rounded-[5px] m-4"
            onClick={() => (window.location.href = "/login")}
          >
            Đăng Nhập
          </button>
          <button
            className="w-[100px] h-8  bg-[#00B150] rounded-[5px]"
            onClick={() => (window.location.href = "/register")}
          >
            Đăng Ký
          </button>
        </div>
      )}
       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <label htmlFor="">Mật Khẩu Cũ</label>
         <Form.Control type="text" placeholder="Nhập mật khẩu cũ " onChange={(e)=>setChangerPass({...changerPass,oldPassword:e.target.value})} /> <br />
         <label htmlFor="">Mật Khẩu Mới</label>
         <Form.Control type="text" placeholder=" Nhập mật khẩu mới" onChange={(e)=>setChangerPass({...changerPass,newPassword:e.target.value})} /> <br />
     
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={changerPassword}>Đổi Mật Khẩu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
