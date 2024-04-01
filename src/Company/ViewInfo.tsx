import React, { useEffect, useState } from 'react'
import HaederCompany from './HaederCompany'
import Fotter from '../componets/Fotter/Fotter'
import privateAxios from '../axios.config/privateAxios';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
interface Address{
  address_id:number
  city:string
  district:string
  home:string
  street:string
}
export interface Company{
  company_avata:string|null
  company_bacgroundPhoto:string|null
  company_career:string|null
  company_description:string|null
  company_email:string|null
  company_human:string|null
  company_id:number
  company_name:string|null
  company_password:string|null
  company_pay:number
  company_phone:string|null
  company_web:string|null
  role:number
  address:Address
}

export default function ViewInfo() {
    let userLogin: any = JSON.parse(
        localStorage.getItem("userLogin") || "{}"
      );
      const [infoCompany, setInfoCompany] = useState<Company>({
        company_avata: "",
        company_bacgroundPhoto: "",
        company_career: "",
        company_description: "",
        company_email: "",
        company_human: "",
        company_id: 0,
        company_name: "",
        company_password: "",
        company_pay: 0,
        company_phone: "",
        company_web: "",
        role: 0,
        address: {
          address_id: 0,
          city: "",
          district: "",
          home: "",
          street: "",
        },
      });
      const [smShow, setSmShow] = useState(false);
      const [lgShow, setLgShow] = useState(false);
    
      const [selectedMedia, setSelectedMedia] = useState<string>("");
      const [previewBg, setPreviewBg] = useState<string>();
      const [urlBg, setUrlBg] = useState<string>("");
      const [flag, setFlag] = useState<boolean>(false);
      

      const [previewAvta, setPreviewAvata] = useState<string>("");
    async function getallInfoCompany() {
        try {
          const res: any = await privateAxios.get(
            `/api/v1/company/one/${userLogin?.company_id}`
          );
          setInfoCompany(res.data.data);
        } catch (error) {
          console.log(error);
        }
    }
    useEffect(() => {
     
        getallInfoCompany()
    },[])
    const handleEditBakgroud = ()=>{
      const check = confirm("Bạn có muốn đổi hình nền")
      if (!check) {
        return;
      }
      setLgShow(true)
    }
     const handlechageBg = async(event:any)=>{
      setSelectedMedia(event.target.files[0]);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        setPreviewBg(event.target.result);
        setFlag(!flag);
      };
      reader.readAsDataURL(file);
     }
     const handleAddBg = async ()=>{
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
      setUrlBg(uploadMedia.data.secure_url);
     }
     const handleSaveBg = async ()=>{
      try {
        const res = await privateAxios.put(`/api/v1/company/update-backgroud/${userLogin?.company_id}`,{
          company_bacgroundPhoto:urlBg
        })
        alert(res.data.message);
        setUrlBg("")
        setLgShow(false)
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
     }
     const handleEditAvatar = ()=>{
      const check = confirm("Bạn có muốn đổi hình đại diện")
      if (!check) {
        return;
      }
      setSmShow(true)
     }

     const handlechageAvt = async(event:any)=>{
      setSelectedMedia(event.target.files[0]);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        setPreviewAvata(event.target.result);
        setFlag(!flag);
      };
      reader.readAsDataURL(file);
     }
    
     const handleSaveAvt = async ()=>{
      try {
        const res = await privateAxios.put(`/api/v1/company/update-avatar/${userLogin?.company_id}`,{
          company_avatar:urlBg
        })
        alert(res.data.message);
        userLogin.user_avata = urlBg
        console.log(userLogin);
        console.log(urlBg);
        
        localStorage.setItem("userLogin",JSON.stringify(userLogin))
        setUrlBg("")
        setLgShow(false)
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
     }

     const handleSaveCompany = async ()=>{
       const check = confirm("Bạn có muốn lưu thay đổi")
       if (!check) {
         return;
       }
       try {
         const res = await privateAxios.put(`/api/v1/company/update-info/${userLogin?.company_id}`,infoCompany)
         alert(res.data.message);
         window.location.reload();
       } catch (error) {
         console.log(error);
       }
     }
     
  return (
    <>
    <HaederCompany></HaederCompany>
    <div className='w-[1200px] m-auto h-[470px] mt-3  ' >
      <div onClick={handleEditBakgroud} className='w-[1200px] h-[350px] bg-gray-200  'style={{backgroundImage:`url(${infoCompany?.company_bacgroundPhoto})`, backgroundSize:"cover", backgroundPosition:"center"}}>
        
      </div>
      <div className='w-[1200px] pt-3 h-[100px] bg-[#0F9E4D] mt-[-15px]'>
      <p  className='ml-[300px] text-2xl text-white font-[400]'>{infoCompany?.company_name}</p>
      <div className='flex ml-[200px] justify-between w-[950px] text-white h-[30px] '>
        <p><i className="fa-solid fa-globe">:</i> {infoCompany?.company_web}</p>
        <p><i className="fa-solid fa-people-arrows">:</i> {infoCompany?.company_human} người</p>
        <p><i className="fa-solid fa-location-dot">:</i> {infoCompany?.address.home}-{infoCompany?.address.district}-{infoCompany?.address.city}</p>
      </div>
      </div>
      <div onClick={handleEditAvatar} className='w-[150px] h-[150px]  m-[-175px] ml-[100px] rounded-[50%] mb-[50px]' style={{backgroundImage:`url(${infoCompany?.company_avata})`, backgroundSize:"cover", backgroundPosition:"center"}}>
      </div>
      
    </div>
    <h3 className='ml-[240px] font-[300]'>Thông tin công ty</h3>
    <div className='w-[1200px] m-auto p-2'>
        <div>
         <label htmlFor=""> Cập nhật giới thiệu về công ty:</label> <br />
         <textarea onChange={(e)=>setInfoCompany({...infoCompany,company_description:e.target.value})}  cols="30" rows="10" value={infoCompany.company_description} className='outline-none w-[800px] h-[200px] border-[1px] rounded-md pl-2 mb-3'></textarea>
        </div>
        <label htmlFor="">Cập nhật số điện thoại:</label><br/> 
        <input type="text" onChange={(e)=>setInfoCompany({...infoCompany,company_phone:e.target.value})} value={infoCompany.company_phone} className='outline-none w-[800px] h-[50px] border-[1px] rounded-md pl-2 mb-3'/><br />
        <label htmlFor="">Cập nhật số nhân viên:</label><br/> 
        <input type="text" onChange={(e)=>setInfoCompany({...infoCompany,company_human:e.target.value})} value={infoCompany.company_human} className='outline-none w-[800px] h-[50px] border-[1px] rounded-md pl-2 mb-3'/><br />
        <label htmlFor="">Cập nhật website:</label><br/>
        <input type="text" value={infoCompany?.company_web} onChange={(e)=>setInfoCompany({...infoCompany,company_web:e.target.value})} className='outline-none w-[800px] h-[50px] border-[1px] rounded-md pl-2 mb-3'/><br />
        <label htmlFor="">Cập nhật ngành nghề:</label><br/>
        <input type="text" value={infoCompany?.company_career} onChange={(e)=>setInfoCompany({...infoCompany,company_career:e.target.value})} className='outline-none w-[800px] h-[50px] border-[1px] rounded-md pl-2 mb-3'/><br />
      </div>
      <button onClick={handleSaveCompany} className='w-[200px] ml-[240px] rounded-lg h-[50px] bg-yellow-500 text-white'>Cập nhật</button>
    <Fotter></Fotter>
    <Modal
        size="m"
        show={smShow}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton onClick={() => setSmShow(false)}>
          <Modal.Title id="example-modal-sizes-title-sm">
            Cập  ảnh đại diện
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img width={160} height={160} className='bg-gray-200 rounded-[50%] m-2' src={previewAvta} alt="" />
          <input type="file" onChange={handlechageAvt} className="" /><br /><br />
          {urlBg ===""?<button className='w-[100px] rounded-md bg-gray-500 text-white' onClick={handleAddBg}>Tải lên cloud</button>:<button className='w-[100px] rounded-md bg-yellow-500' onClick={handleSaveAvt}>Save</button>}
        </Modal.Body>
      </Modal>
      <Modal
        size="m"
        show={lgShow}
        // onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
       <Modal.Header closeButton onClick={()=>setLgShow(false)}>
          <Modal.Title id="example-modal-sizes-title-sm">
            Cập  Nhật ảnh nền
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img width={300} height={160} className='bg-gray-200 rounded-md m-2' src={previewBg} alt="" />
          <input type="file" onChange={handlechageBg} className="" /><br /><br />
          {urlBg ===""?<button className='w-[100px] rounded-md bg-gray-500 text-white' onClick={handleAddBg}>Tải lên cloud</button>:<button className='w-[100px] rounded-md bg-yellow-500' onClick={handleSaveBg}>Save</button>}
          </Modal.Body>
      </Modal>

    </>
  )
}
