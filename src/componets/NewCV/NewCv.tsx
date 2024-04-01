import React, { useState } from 'react'
import Header, { User } from '../Header/Header'
import Fotter from '../Fotter/Fotter'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import privateAxios from '../../axios.config/privateAxios';
export interface User_cv {
    user_exp: string,
    user_education: string,
    user_action: string,
    user_cartificate: string
    user_name: string
    user_avata: string
    user_job: string
    user_birthday: string
    user_address: string
    user_email: string
    user_numberPhone:string
    user_taget: string
    user_skill: string
    cv_date: string

}

export default function NewCv() {
    const [userLogin,setUserLogin]=useState<User>(JSON.parse(
        localStorage.getItem("userLogin") || "{}"
      ))
      const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedMedia, setSelectedMedia] = useState();
  const [preview, setPreview] = useState();
  const [urlAvata, setUrlAvata] = useState("");


  const today=new Date()
  const [infoCv,setInfoCv]=useState<User_cv>({
    user_exp: '',
    user_education: '',
    user_action: '',
    user_cartificate: '',
    user_name: userLogin?.user_fullName,
    user_avata: "",
    user_job: '',
    user_birthday: '',
    user_address: '',
    user_email: userLogin?.user_email,
    user_numberPhone: "",
    user_taget: '',
    user_skill: '',
    cv_date:today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
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
    setInfoCv({ ...infoCv, user_avata: uploadMedia.data.secure_url });
  };
  const handleSaveCV = async ()=>{
    const check=confirm("Bạn có muốn lưu CV")
    if (!check) {
      return
    }
      if (infoCv.user_exp==""||infoCv.user_education==""||infoCv.user_action==""||infoCv.user_cartificate==""||infoCv.user_avata==""||infoCv.user_birthday==""||
      infoCv.user_numberPhone==""||infoCv.user_taget==""||infoCv.user_skill==""||infoCv.user_job=="") {
        alert("Vui lý điền đầy đủ thông tin")
        return
      }
      try {
        const res:any= await privateAxios.post(`/api/v1/cv/newcv/${userLogin?.user_id}`,infoCv)
        alert(res.data.message)
        window.location.href = `/cv`
      } catch (error:any) {
        console.log(error);
      }
  }
  
  return (
    <div className='bg-[#F1F2F6]'>
        <Header></Header>
        <div className='flex  bg-white p-2 mt-4 rounded-[10px] w-[70%] m-auto border-[1px] border-neutral-500'>
            <div className='border-[1px] border-neutral-500 w-[50%] p-4 rounded-[10px] text-end'>
                <div className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[220px] rounded-[10px] p-[10px] ml-[300px] text-white'>
                    <p>Kinh ngiệm Làm Việc</p>
                </div>
                <div>
                    <textarea  onChange={(e)=>setInfoCv({...infoCv,user_exp:e.target.value})} cols="60" rows="10" className='text-end outline-none ' placeholder='Vị trí công việc -Thời gian làm việc- Mô Tả'></textarea>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[120px] rounded-[10px] p-[10px] ml-[410px] text-white'>Học vấn</p>
                <textarea onChange={(e)=>setInfoCv({...infoCv,user_education:e.target.value})} cols="60" rows="10" className='text-end outline-none' placeholder='Ngành học-Tên trường-Mô Tả'></textarea>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[400px] text-white'>Hoạt Động</p >
                    <textarea onChange={(e)=>setInfoCv({...infoCv,user_action:e.target.value})} cols="60" rows="10" className='text-end outline-none' placeholder='Vị trí - Thời gian - Mô Tả'></textarea>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[400px] text-white'>Chứng chỉ</p>
                    <textarea onChange={(e)=>setInfoCv({...infoCv,user_cartificate:e.target.value})} cols="60" rows="10" className='text-end outline-none' placeholder='Tên chứng chỉ'></textarea>
                </div>
            </div>
            <div className='border-[1px] border-neutral-500 w-[50%] p-4 rounded-[10px] '>
                <div >
                <img  src={preview} alt="avata" className='w-[150px] h-[150px] rounded-[50%] m-4 bg-[#A6ACB2]' />
                <input type="file" onChange={handleAddMedia} /> <button onClick={handleAdd} className='border-[1px] border-neutral-500 rounded-[10px]'>Chọn ảnh</button>
                <i style={{display:`${urlAvata===""?"none":"inline"}`}} className="fa-solid fa-check ml-2 text-green-500"></i>
                <p className='text-2xl font-[700] m-3' >{userLogin.user_fullName}</p>
                <input type="text" className='ml-5 outline-none' onChange={(e)=>setInfoCv({...infoCv,user_job:e.target.value})} placeholder='Vị trí ứng tuyển' />
                </div>
                <div>
                    <p className='text-xl font-[500]'> Thông tin cá nhân</p>
                    <label ><i className="fa-regular fa-calendar-days text-[#00B4D8] mr-2"></i></label>
                    <input type="date" onChange={(e)=>setInfoCv({...infoCv,user_birthday:e.target.value})} /> <br />
                    <label htmlFor=""><i className="fa-solid fa-phone text-[#00B4D8] mr-2"></i></label>
                    <input type="text" onChange={(e)=>setInfoCv({...infoCv,user_numberPhone:e.target.value})} className='outline-none' placeholder='Số điện thoại' />
                    <p><i className="fa-regular fa-envelope text-[#00B4D8] mr-2"></i> {userLogin.user_email}</p>
                    <label htmlFor=""><i className="fa-solid fa-location-dot text-[#00B4D8] mr-2"></i></label>
                    <input type="text" placeholder='Địa chỉ' className='outline-none' onChange={(e)=>setInfoCv({...infoCv,user_address:e.target.value})} />
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[250px] rounded-[10px] p-[10px]  text-white'>Mục Tiêu Nghề Nghiệp</p>
                    <textarea onChange={(e)=>setInfoCv({...infoCv,user_taget:e.target.value})} cols="60" rows="10" className='outline-none' placeholder='Mục tiêu nghề nghiệp của bạn, bao gồm cả ngắn hạn và dài hạn'></textarea>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[200px] rounded-[10px] p-[10px] text-white'>Các kỹ năng khác</p>
                    <textarea onChange={(e)=>setInfoCv({...infoCv,user_skill:e.target.value})} cols="60" rows="10" className='outline-none' placeholder='Mô Tả'></textarea>
                </div>
            </div>
        </div>
       <div >
       <button className='w-[150px] h-[50px] bg-[#00B150] rounded-[10px] text-white ml-[45%] mt-4' onClick={handleSaveCV}>Lưu CV</button>
       <Button variant="primary" className='ml-[350px]' onClick={handleShow}>
        Xem Trước CV
      </Button>
       </div>
       <Fotter></Fotter>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Xem Trước CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='flex  bg-white p-2 mt-4 rounded-[10px]  m-auto border-[1px] border-neutral-500'>
            <div className='border-[1px] border-neutral-500 w-[50%] pt-4 pr-4 rounded-[10px] text-end '>
                <div className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[220px] rounded-[10px] p-[10px] ml-[300px] text-white'>
                    <p>Kinh ngiệm Làm Việc</p>
                </div>
                <div>
                    <p>{infoCv.user_exp}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[120px] rounded-[10px] p-[10px] ml-[410px] text-white'>Học vấn</p>
                <p>  {infoCv.user_education}</p> 
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[400px] text-white'>Hoạt Động</p >
                    <p>{infoCv.user_action}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[400px] text-white'>Chứng chỉ</p>
                   <p>{infoCv.user_cartificate}</p>
                </div>
            </div>
            <div className='border-[1px] border-neutral-500 w-[50%] p-4 rounded-[10px] '>
                <div>
                <img src={urlAvata} alt="avata" className='rounded-[50%] w-[150px] h-[150px] m-4 bg-[#A6ACB2]' />
                <p className='text-2xl font-[700] m-3' >{userLogin.user_fullName}</p>
                <p className='text-xl font-[600] text-cyan-800 ml-2'>{infoCv.user_job}</p>
                </div>
                <div>
                    <p className='text-xl font-[500]'> Thông tin cá nhân</p>
                    <p> <span><i className="fa-regular fa-calendar-days text-[#00B4D8] mr-2"></i></span> {infoCv.user_birthday}</p> 
                    <p><i className="fa-solid fa-phone text-[#00B4D8] mr-2"></i> {infoCv.user_numberPhone}</p>
                    
                    <p><i className="fa-regular fa-envelope text-[#00B4D8] mr-2"></i> {userLogin.user_email}</p>
                    <p><i className="fa-solid fa-location-dot text-[#00B4D8] mr-2"></i> {infoCv.user_address}</p>
                  
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[250px] rounded-[10px] p-[10px]  text-white'>Mục Tiêu Nghề Nghiệp</p>
                    <p>{infoCv.user_taget}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[200px] rounded-[10px] p-[10px] text-white'>Các kỹ năng khác</p>
                    <p>{infoCv.user_skill}</p>
                </div>
            </div>
        </div>
        </Modal.Body>
       
      </Modal>
    </div>
  )
}
