import React, { useEffect, useState } from "react";
import Header, { User } from "../Header/Header";
import Fotter from "../Fotter/Fotter";
import InforComponet from "../inforComponent/InforComponet";
import { NavLink } from "react-router-dom";
import { User_cv } from "../NewCV/NewCv";
import ListJobSave from "../ListJobSave";
import { Modal } from "react-bootstrap";
import axios from "axios";
import privateAxios from "../../axios.config/privateAxios";
interface CvUpdate{
  cv_id: number
  cv_experience: string,
  cv_education: string,
  cv_action: string,
  cv_cartificate: string
  cv_fullnName: string
  cv_avata: string
  cv_job: string
  cv_birthday: string
  cv_address: string
  cv_email: string
  cv_phone:string
  cv_target: string
  cv_skill: string
  cv_date: string
}
export default function Cv() {
  const [show, setShow] = useState(false);
  
  const [userLogin, setUserLogin] = useState<User>(
    JSON.parse(localStorage.getItem("userLogin") || "{}")
  );
  const [listCv, setListCv] = useState([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [infoCv, setInfoCv] = useState<CvUpdate>(
    {
      cv_id: 0,
      cv_experience: '',
      cv_education: '',
      cv_action: '',
      cv_cartificate: '',
      cv_fullnName: "",
      cv_avata: "",
      cv_job: '',
      cv_birthday: '',
      cv_address: '',
      cv_email: "",
      cv_phone: "",
      cv_target: '',
      cv_skill: '',
      cv_date: ''
    }
  )
  const [preview, setPreview] = useState<string>();
  const [urlAvata, setUrlAvata] = useState<string>("");
  const [selectedMedia, setSelectedMedia] = useState<string>("");


  async function getCV() {
    try {
      const res = await privateAxios.get(
        `/api/v1/cv/list/${userLogin?.user_id}`
      );
      setListCv(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCV();
  }, [flag]);

  const delateCv = async (id: number) => {
    const confirm = window.confirm("Bạn có muốn xóa CV này");
    if (!confirm) {
      return;
    }
    try {
      const res = await privateAxios.delete(`/api/v1/cv/delete/${id}`);
      getCV();
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  const handleClose = () => setShow(false);

  const editCv = async (item: any) => {
    const check=window.confirm("Bạn có muốn cập nhật CV này")
    if (!check) {
      return
    }
    setInfoCv(item);
    setPreview(item.cv_avata);
    setShow(true);
  }

  const handleAddMedia = (event: any) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
    
  }
  const  handleAdd = async () => {
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
    setInfoCv({ ...infoCv, cv_avata: uploadMedia.data.secure_url });
  }

  const handleUpdate = async () => {
    const check= window.confirm("Bạn có muốn cập nhật CV này")
    if (!check) {
      return
    }
    try {
      const result= await privateAxios.put(`/api/v1/cv/update/${infoCv.cv_id}`,infoCv)
      alert(result.data.data.message)
      setShow(false)
      setFlag(!flag)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Header></Header>
      <div className="flex justify-center bg-[#F1F2F6] pt-4">
        <div className="w-[700px]">
          <div>
            <img
              className="rounded-[10px]"
              src="https://static.topcv.vn/v4/image/cv-manager/banner.png?v=1.0.0"
              alt=""
            />
          </div>
          <div className="bg-white rounded-[10px]">
            <div className="flex justify-between p-4 w-[100%] h-[70px]">
              <p className="text-xl font-[600]">CV đã tạo trên TopCV</p>
              <button
                className="bg-[#3BA669] w-[100px] h-[30px] rounded-[15px]"
                onClick={() => (window.location.href = "/newcv")}
              >
                + Tạo mới
              </button>
            </div>
            <div className="flex flex-wrap justify-evenly p-[20px]">
              {listCv?.map((item: any) => {
                return (
                  <div
                    className=" hover:scale-105 w-[300px] h-[300px] bg-[url(https://res.cloudinary.com/dwi7pnunq/image/upload/v1708449400/Hi%CC%80nh_a%CC%89nh_21-02-2024_lu%CC%81c_00.16_tonwmj.jpg)]
                            bg-cover bg-no-repeat bg-center rounded-[10px] "
                  >
                    <div className=" w-[300px] h-[300px] backdrop-blur-[1px] hover:backdrop-blur-[3px] rounded-[10px] pt-[190px] pl-2 pr-2 text-gray-600 text-xl font-[600]">
                      <p
                        className="hover:text-blue-600 hover:underline hover:cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/cvdetail/${item.cv_id}`)
                        }
                      >
                        {item.cv_fullname}_Ứng tuyển {item.cv_job}
                      </p>
                      <div className="flex justify-between">
                        <button onClick={() => editCv(item)}>
                          <i className="fa-solid fa-pen-to-square text-green-600"></i>
                        </button>
                        <button onClick={() => delateCv(item.cv_id)}>
                          <i className="fa-solid fa-trash text-red-600"></i>{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ListJobSave></ListJobSave>

        </div>
        <div className=" w-[300px] h-[700px] ml-5">
          <InforComponet></InforComponet>
        </div>
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
        <Modal.Body >
          <div className="flex">
        <div className='border-[1px] border-neutral-500 w-[50%] p-4 rounded-[10px] border-r-0 text-end'>
                <div className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[220px] rounded-[10px] p-[10px] ml-[300px] text-white'>
                    <p>Kinh ngiệm Làm Việc</p>
                </div>
                <div>
                    <textarea  onChange={(e)=>setInfoCv({...infoCv,cv_experience:e.target.value})} cols="60" rows="10" className='text-end outline-none ' value={infoCv.cv_experience} placeholder='Vị trí công việc -Thời gian làm việc- Mô Tả'></textarea>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[120px] rounded-[10px] p-[10px] ml-[410px] text-white'>Học vấn</p>
                <textarea onChange={(e)=>setInfoCv({...infoCv,cv_education:e.target.value})} cols="60" rows="10" className='text-end outline-none' value={infoCv.cv_education} placeholder='Ngành học-Tên trường-Mô Tả'></textarea>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[400px] text-white'>Hoạt Động</p >
                    <textarea onChange={(e)=>setInfoCv({...infoCv,cv_action:e.target.value})} cols="60" rows="10" className='text-end outline-none' value={infoCv.cv_action} placeholder='Vị trí - Thời gian - Mô Tả'></textarea>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[400px] text-white'>Chứng chỉ</p>
                    <textarea onChange={(e)=>setInfoCv({...infoCv,cv_cartificate:e.target.value})} cols="60" rows="10" className='text-end outline-none' value={infoCv.cv_cartificate} placeholder='Tên chứng chỉ'></textarea>
                </div>
            </div>
            <div className='border-[1px] border-neutral-500 w-[50%] p-4 rounded-[10px] '>
                <div >
                <img  src={preview} alt="avata" className='w-[150px] h-[150px] rounded-[50%] m-4 bg-[#A6ACB2]' />
                <input type="file" onChange={handleAddMedia} /> <button onClick={handleAdd} className='border-[1px] border-neutral-500 rounded-[10px]'>Chọn ảnh</button>
                <i style={{display:`${urlAvata===""?"none":"inline"}`}} className="fa-solid fa-check ml-2 text-green-500"></i>
                <p className='text-2xl font-[700] m-3' >{infoCv.cv_fullnName}</p>
                <input type="text" className='ml-5 outline-none' onChange={(e)=>setInfoCv({...infoCv,cv_job:e.target.value})} value={infoCv.cv_job} placeholder='Vị trí ứng tuyển' />
                </div>
                <div>
                    <p className='text-xl font-[500]'> Thông tin cá nhân</p>
                    <label ><i className="fa-regular fa-calendar-days text-[#00B4D8] mr-2"></i></label>
                    <input type="date" onChange={(e)=>setInfoCv({...infoCv,cv_birthday:e.target.value})}  value={infoCv.cv_birthday}/> <br />
                    <label htmlFor=""><i className="fa-solid fa-phone text-[#00B4D8] mr-2"></i></label>
                    <input type="text" onChange={(e)=>setInfoCv({...infoCv,cv_phone:e.target.value})} className='outline-none' value={infoCv.cv_phone} placeholder='Số điện thoại' />
                    <p><i className="fa-regular fa-envelope text-[#00B4D8] mr-2"></i> {userLogin.user_email}</p>
                    <label htmlFor=""><i className="fa-solid fa-location-dot text-[#00B4D8] mr-2"></i></label>
                    <input type="text" placeholder='Địa chỉ' className='outline-none' value={infoCv?.cv_address} onChange={(e)=>setInfoCv({...infoCv,cv_address:e.target.value})} />
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[250px] rounded-[10px] p-[10px]  text-white'>Mục Tiêu Nghề Nghiệp</p>
                    <textarea onChange={(e)=>setInfoCv({...infoCv,cv_taget:e.target.value})} cols="60" rows="10" value={infoCv.cv_target} className='outline-none' placeholder='Mục tiêu nghề nghiệp của bạn, bao gồm cả ngắn hạn và dài hạn'></textarea>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[200px] rounded-[10px] p-[10px] text-white'>Các kỹ năng khác</p>
                    <textarea onChange={(e)=>setInfoCv({...infoCv,user_skill:e.target.value})} cols="60" rows="10" value={infoCv.cv_skill} className='outline-none' placeholder='Mô Tả'></textarea>
                </div>
            </div>
            
            </div>
              <button className="bg-yellow-400 w-[150px] ml-[44%] text-white font-[600]  rounded-[10px] p-2 mt-4" onClick={handleUpdate}>Update</button>
        </Modal.Body>
       
      </Modal>
    </div>
  );
}
