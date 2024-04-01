import React, { useEffect, useState,useRef } from 'react'
import { useParams } from 'react-router-dom'
import privateAxios from '../axios.config/privateAxios'
import { User } from './Header/Header'
import { useReactToPrint } from 'react-to-print'

export default function CvDetail() {
    const cv_id=Number(useParams().id)
    const [cvdetail,setCvdetail]=useState<any>({})
   async function getCv(){
    try {
        const res = await privateAxios.get(`/api/v1/cv/one/${cv_id}`)
        setCvdetail(res.data.data)
    } catch (error) {
        console.log(error);
    }
   }
   useEffect(()=>{
    getCv()
   },[])
   
   const componetPDF=useRef<any>()

   const dowloadPDF=useReactToPrint({
       content:()=>componetPDF.current,
       documentTitle:'Cv_'+cvdetail?.cv_fullname + '_' + cvdetail?.cv_job,
       onAfterPrint:()=>alert('Download CV thành công'),
       
   })
   console.log(cvdetail);
   
  return (
    <div className='w-full pt-5 h-[1000px] bg-[url(https://images.pexels.com/photos/640781/pexels-photo-640781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]
    bg-cover bg-center'>
        <div className='w-full h-[50px] fixed top-0 bg-gray-500 bg-opacity-50 flex justify-between text-white ] pl-5 pr-20'> 
        <p className='text-xl font-[500] mt-2 '>CV Ứng tuyển vị trí {cvdetail?.cv_job} của {cvdetail?.cv_fullname}</p>
        <button> <i className="fa-solid fa-print" onClick={dowloadPDF}></i> Tải Cv file PDF </button>
        </div>
      
         <div ref={componetPDF}   className='flex w-[900px] m-auto bg-[url(https://e1.pxfuel.com/desktop-wallpaper/271/821/desktop-wallpaper-cv-backgrounds-cv.jpg)] p-2 mt-4 rounded-[10px]  border-[1px] border-neutral-500'>
            <div className='border-[1px] border-neutral-500 w-[50%] pt-4 pr-4 rounded-[10px] text-end '>
                <div className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[220px] rounded-[10px] p-[10px] ml-[205px] text-white'>
                    <p>Kinh ngiệm Làm Việc</p>
                </div>
                <div>
                    <p className='mt-3 mb-3 pl-[70px]'>{cvdetail?.cv_experience}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[120px] rounded-[10px] p-[10px] ml-[305px] text-white'>Học vấn</p>
                <p className='mt-3 mb-3 pl-[70px]'>  {cvdetail?.cv_education}</p> 
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[295px] text-white'>Hoạt Động</p >
                    <p className='mt-3 mb-3 pl-[70px]'>{cvdetail?.cv_action}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[295px] text-white'>Chứng chỉ</p>
                   <p className='mt-3 mb-3 pl-[70px]'>{cvdetail?.cv_cartificate}</p>
                </div>
            </div>
            <div className='border-[1px] border-neutral-500 w-[50%] p-4 rounded-[10px] '>
                <div>
                <img src={cvdetail?.cv_avata} alt="avata" className='rounded-[50%] w-[150px] h-[150px] m-4 bg-[#A6ACB2]' />
                <p className='text-2xl font-[700] m-3' >{cvdetail?.cv_fullname}</p>
                <p className='text-xl font-[600] text-cyan-800 ml-2'>{cvdetail?.cv_job}</p>
                </div>
                <div>
                    <p className='text-xl font-[500]'> Thông tin cá nhân</p>
                    <p> <span><i className="fa-regular fa-calendar-days text-[#00B4D8] mr-2"></i></span> {cvdetail?.cv_brirthday}</p> 
                    <p><i className="fa-solid fa-phone text-[#00B4D8] mr-2"></i> {cvdetail?.cv_phone}</p>
                    
                    <p><i className="fa-regular fa-envelope text-[#00B4D8] mr-2"></i> {cvdetail?.cv_email}</p>
                    <p><i className="fa-solid fa-location-dot text-[#00B4D8] mr-2"></i> {cvdetail?.cv_address}</p>
                  
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[250px] rounded-[10px] p-[10px]  text-white'>Mục Tiêu Nghề Nghiệp</p>
                    <p className='mt-3 mb-3 pr-[70px]'>{cvdetail?.cv_target}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[200px] rounded-[10px] p-[10px] text-white'>Các kỹ năng khác</p>
                    <p className='mt-3 mb-3 pr-[70px'>{cvdetail?.cv_skill}</p>
                </div>
            </div>
        </div>
     
        {/* <div ref={componetPDF}   >
         <div className='flex w-full  bg-white p-2 mt-4 rounded-[10px]   border-[1px] border-neutral-500'>
            <div className='border-[1px] border-neutral-500 w-[50%] pt-4 pr-4 rounded-[10px] text-end '>
                <div className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[220px] rounded-[10px] p-[10px] ml-[205px] text-white'>
                    <p>Kinh ngiệm Làm Việc</p>
                </div>
                <div>
                    <p className='mt-3 mb-3 pl-[70px]'>{cvdetail?.cv_experience}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[120px] rounded-[10px] p-[10px] ml-[305px] text-white'>Học vấn</p>
                <p className='mt-3 mb-3 pl-[70px]'>  {cvdetail?.cv_education}</p> 
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[295px] text-white'>Hoạt Động</p >
                    <p className='mt-3 mb-3 pl-[70px]'>{cvdetail?.cv_action}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[130px] rounded-[10px] p-[10px] ml-[295px] text-white'>Chứng chỉ</p>
                   <p className='mt-3 mb-3 pl-[70px]'>{cvdetail?.cv_cartificate}</p>
                </div>
            </div>
            <div className='border-[1px] border-neutral-500 w-[50%] p-4 rounded-[10px] '>
                <div>
                <img src={cvdetail?.cv_avata} alt="avata" className='rounded-[50%] w-[150px] h-[150px] m-4 bg-[#A6ACB2]' />
                <p className='text-2xl font-[700] m-3' >{cvdetail?.cv_fullname}</p>
                <p className='text-xl font-[600] text-cyan-800 ml-2'>{cvdetail?.cv_job}</p>
                </div>
                <div>
                    <p className='text-xl font-[500]'> Thông tin cá nhân</p>
                    <p> <span><i className="fa-regular fa-calendar-days text-[#00B4D8] mr-2"></i></span> {cvdetail?.cv_birthday}</p> 
                    <p><i className="fa-solid fa-phone text-[#00B4D8] mr-2"></i> {cvdetail?.cv_phone}</p>
                    
                    <p><i className="fa-regular fa-envelope text-[#00B4D8] mr-2"></i> {cvdetail?.cv_email}</p>
                    <p><i className="fa-solid fa-location-dot text-[#00B4D8] mr-2"></i> {cvdetail?.cv_address}</p>
                  
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[250px] rounded-[10px] p-[10px]  text-white'>Mục Tiêu Nghề Nghiệp</p>
                    <p className='mt-3 mb-3 pr-[70px]'>{cvdetail?.cv_target}</p>
                </div>
                <div>
                    <p className='bg-[#00B4D8] h-[50px] text-xl font-[700] w-[200px] rounded-[10px] p-[10px] text-white'>Các kỹ năng khác</p>
                    <p className='mt-3 mb-3 pr-[70px'>{cvdetail?.cv_skill}</p>
                </div>
            </div>
        </div> */}
        {/* </div> */}
    </div>
  )
}
