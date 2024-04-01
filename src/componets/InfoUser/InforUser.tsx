import React, { useState } from 'react'
import InforComponet from '../inforComponent/InforComponet'
import Header, { User } from '../Header/Header'
import Fotter from '../Fotter/Fotter'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import privateAxios from '../../axios.config/privateAxios';

export default function InforUser() {
    const [userLogin, setUserLogin] = useState<any>(
        JSON.parse(localStorage.getItem("userLogin") || "{}")
      );
      
      const [selectedMedia, setSelectedMedia] = useState();
      const [preview, setPreview] = useState(userLogin.user_avata);
    const [urlAvata, setUrlAvata] = useState("")
        const [inforEdit, setInforEdit] = useState({
            user_avata:userLogin.user_avata,
            user_fullName:userLogin.user_fullName,
            user_numberPhone:userLogin.user_numberPhone,
        })

 const handleAddMedia = (event: any) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const handleAdd = async () => {
    const check = confirm("bạn có muốn chọn ảnh này");
    if (!check) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedMedia);
    formData.append("upload_preset", "prj_md3");
    const [uploadMedia] = await Promise.all([
      axios.post(
        "https://api.cloudinary.com/v1_1/dwi7pnunq/image/upload",
        formData
      ),
    ]);
    setUrlAvata(uploadMedia.data.secure_url);
    setInforEdit({ ...inforEdit, user_avata: uploadMedia.data.secure_url });
  };
  
  const updateInfor = async ()=>{
    if (inforEdit.user_avata==userLogin.user_avata&&inforEdit.user_fullName==userLogin.user_fullname&&inforEdit.user_numberPhone==userLogin.user_numberPhone) {
       alert("Không có thay đổi")
        return
    }
    const check = window.confirm("Bạn có muốn cập nhật")
    if (!check) {
      return;
    }
    try {
        const res:any= await privateAxios.put(`/api/v1/users/inforedit/${userLogin.user_id}`,inforEdit)
        localStorage.setItem("userLogin",JSON.stringify({...userLogin,user_avata:inforEdit.user_avata,user_fullName:inforEdit.user_fullName,user_phone:inforEdit.user_numberPhone}))
        alert(res.data.message)
        window.location.reload()
    } catch (error) {
        console.log(error);
        
    }
   }
  return (
    <div>
        <Header></Header>
        <div className='flex justify-center bg-[#F1F2F6] p-4'>
        <div className='w-[700px] bg-white rounded-[10px] mr-5 p-4'>
            <p className='text-xl font-[600]'>Cài đặt thông tin cá nhân</p>
            <div>
            <p><span className='text-red-500'> * </span> Các thông tin bắt buộc </p>
            <img src={preview}  alt="avata" className='w-[150px] h-[150px] rounded-[50%] bg-slate-200 m-3' />
            <div className='flex ' >
            <Form.Control type="file" style={{width:"400px"}} onChange={handleAddMedia}/> 
            <Button variant="secondary" className='ml-8' onClick={handleAdd}>Chọn ảnh đại diện</Button>{' '}
            <i style={{display:`${urlAvata!==""?"inline":"none"}`}} className="fa-solid fa-circle-check mt-[13px] ml-3 text-green-500"></i>

            </div>
            </div>
            <label htmlFor="">Họ và tên <span  className='text-red-500'>*</span></label> <br />
            <input type="text" onChange={(e)=>setInforEdit({...inforEdit,user_fullName:e.target.value})} placeholder={userLogin.user_fullName} className='w-[100%] h-[50px] p-3 rounded-[10px] border-neutral-400 border-1 mt-2 mb-2 outline-green-500'  /> <br />
            <label htmlFor="">Số điện thoại</label><br />
            <input type="text" onChange={(e)=>setInforEdit({...inforEdit,user_numberPhone:e.target.value})} className='w-[100%] h-[50px] p-3 rounded-[10px] border-neutral-400 border-1 mt-2 mb-2 outline-green-500' placeholder={userLogin.user_phone}/>
            <p className='mt-3'>Địa chỉ Email <span  className='text-red-500'>*</span></p>
           <p className='w-[100%] h-[50px] p-[12px] rounded-[10px] bg-slate-200 text-gray-500 cursor-not-allowed'>{userLogin.user_email} </p>
           <button className='bg-[#3BA669] w-[100px] h-[30px] rounded-[5px] mt-3 ' onClick={updateInfor}>Lưu</button>
        </div>
        <div> <InforComponet></InforComponet></div>
        </div>
        <Fotter></Fotter>
    </div>
  )
}
