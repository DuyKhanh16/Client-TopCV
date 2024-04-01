import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import privateAxios from "../axios.config/privateAxios";
import Fotter from "../componets/Fotter/Fotter";
import publicAxios from "../axios.config/publicAxios";
import io from "socket.io-client"
export default function HaederCompany() {

const [show, setShow] = useState(false);
const [flag, setFlag] = useState(false);
const [changerPass, setChangerPass] = useState({
  oldPassword: "",
  newPassword: ""
});
const [listNotification, setListNotification] = useState<any>([]);
const [showNotification, setShowNotification] = useState<boolean>(false);
  const userLogin: any = JSON.parse(
    localStorage.getItem("userLogin") || "{}"
  );
 async function getListNotification() {
  try {
    const res: any = await axios.get(
      `http://localhost:3000/api/v1/company/notification/${userLogin?.company_id}`
    );
    setListNotification(res.data.data);
  } catch (error) {
    console.log(error);
  }
 }
  useEffect(() => {
    getListNotification()
    const socket=io("http://localhost:3000")
    socket.on('server-send-notifiaction', (data: any) => {
      setListNotification(data)
    });
  },[flag])
const userLogout = ()=>{
  const checkLogout = window.confirm("Bạn có muốn đăng xuất")
  if (checkLogout) {
    localStorage.removeItem("userLogin")
  localStorage.removeItem("token")
  window.location.href = "/"
  }
}
const goCv = ()=>{
  if (!userLogin.company_id) {
    alert("Vui lòng đăng nhập")
  }else{
    window.location.href = "/jobcompany"
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
      const res = await publicAxios.put(`/api/v1/company/updatepassword/${userLogin?.company_id}`,changerPass)
    alert (res.data.message)
    window.location.reload()
  }catch (error:any) {
    console.log(error);
    alert(error.response.data.message)
  }
  }
}
let count = 0
count=listNotification?.filter((item:any)=>item.notification_status === 0).length

const changeStatus = async (notification_id:number)=>{
  try {
    await privateAxios.put(`/api/v1/job/notification/updatestatus/${notification_id}`)
    setFlag(!flag)
  } catch (error) {
    console.log(error);
  }  
}
console.log(listNotification);

  return (
    <div>
        <div className="w-full h-[80px] flex justify-between pr-5 bg-[#FFFFFF]">
      <div className="flex font-[500] ">
        <img className="cursor-pointer"
        onClick={()=>window.location.href = '/homecompany'}
          width={200}
          src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
          alt=""
        />
        <p className="m-[30px] cursor-pointer hover:text-[#00B150]">Trang chủ doanh nghiệp</p>
        <p className="m-[30px] cursor-pointer hover:text-[#00B150] " onClick={goCv}>Hồ sơ& CV</p>
        <p className="m-[30px] cursor-pointer hover:text-[#00B150] ">Ứng Viên</p>
      </div>

   
        <div className="flex mr-[20px] mt-[5px]">
          <i className="fa-solid fa-bell text-[#00B150] text-3xl m-[20px] hover:cursor-pointer" onClick={()=>setShowNotification(!showNotification)}></i>
          <div style={{visibility:`${!showNotification ? "hidden" : "visible"}`}}
          className="w-[250px] h-[500px] overflow-auto rounded-[10px] absolute bg-white mt-[70px] ml-[-70px]">
            {
              listNotification?.map((item:any)=>{
                return (
                  <p style={{backgroundColor:`${item?.notification_status === 0 ? "#E4E7EB" : "white"}`}}
                   key={item?.notification_id}className=" w-[250px] h-[50px] pl-2 pt-2 cursor-pointer hover:bg-gray-300 mt-[-12px]   text-[13px]" onClick={()=>changeStatus(item?.notification_id)}> <span className="text-[#00B150] font-[800]">{item?.cv_fullnName}</span> Đã nộp CV vào công việc <span className="text-[#b10006] font-[800]">{item?.job_name}</span></p>
                )
              })
            }
          </div>
          <p style={{visibility:`${count === 0 ? "hidden" : "visible"}`}} className="text-white font-[800] ml-[-32px] mt-[13px] w-[25px] h-[25px] rounded-[50%] pl-[2px] bg-red-600">{count}</p>
          <img
            src={userLogin.company_avata}
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
        {userLogin.company_name}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{padding:10}}>
        <Dropdown.Item href="" style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10}} onClick={()=>window.location.href = '/viewinfo'}><i className="fa-regular fa-pen-to-square mt-2 text-[#00B150] mr-1" ></i> Cài đặt thông tin doanh nghiệp</Dropdown.Item>
        <Dropdown.Item href="#/action-4" style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10}}> <i className="fa-solid fa-gear mt-2 text-[#00B150] mr-1"></i>Gợi ý ứng viên </Dropdown.Item>
        <Dropdown.Item onClick={handleShow} style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10}}><i className="fa-solid fa-lock mt-2 text-[#00B150] mr-1"></i>Đổi Mật Khẩu</Dropdown.Item>
        <Dropdown.Item onClick={userLogout} style={{backgroundColor:"#F1F1F1", borderRadius:5,marginBottom:10,color:"red"}}><i className="fa-solid fa-right-from-bracket mt-2  mr-1"></i> Đăng Xuất</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
      
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
    </div>
  )
}
