import React, { useEffect, useState } from 'react'
import HaederCompany from './HaederCompany'
import Fotter from '../componets/Fotter/Fotter'
import IntroCompany from './introCompany'
import privateAxios from '../axios.config/privateAxios'
import io from "socket.io-client"

export default function HomeCompany() {
  const [listUserRecruitment,setListUserRecruitment] = useState<any>([])
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const socket = io("http://localhost:3000");

 async function getAllUserRecruitment () {
  try {
    const res: any = await privateAxios.get(
      `/api/v1/cv/cv-recruitment`
    );
    setListUserRecruitment(res.data.data);
  } catch (error) {
    console.log(error);
    
  }
}
  useEffect(() => {
    getAllUserRecruitment()
  },[])
  
 const companySeenCV =async (item:any)=>{
  
 try {
   const result= await privateAxios.put(`/api/v1/company/create-seen-cv`,{
      company_id:userLogin?.company_id,
      cv_id:item.cv_id
    })
    
    socket.emit("clinet-send-seencv",{id:item.user.user_id})

 } catch (error) {
   console.log(error);
 }
   window.location.href = `/cvdetail/${item.cv_id}`
 }
 console.log(listUserRecruitment);
 
  return (
    <div className='bg-[#F4F5F7]'>
      <HaederCompany></HaederCompany>
      <IntroCompany></IntroCompany>
      <div>
    <p className='text-2xl font-[300] mt-3 ml-[200px] mb-3'> Danh sách CV đang bật tìm việc!</p>
    <div className='w-[1200px] m-auto flex flex-wrap justify-start'>
    {listUserRecruitment?.map((item:any)=>{
        return(
          <div className='w-[360px] h-[130px] bg-white rounded-[10px] m-2 p-2'>
            <p className='text-[#0F9E4D] ml-4 font-[600] text-xl hover:cursor-pointer' onClick={()=>companySeenCV(item)}>{item?.cv_job}</p>
            <div className='flex w-[320px] h-80px justify-between '>
              <img   className='rounded-lg mr-3 w-[60px] h-[60px] mt-1 ml-3' src={item?.user.user_avata} alt="" />
              <div className='w-[250px] ' >
              <p>{item?.user.user_fullName}</p>
              <p>{item?.cv_address}</p>
              </div>
              <div>
              <i className="fa-solid fa-toggle-on text-[#0F9E4D] text-[30px] mt-3"></i>
              </div>
            </div>
          </div>
        )
    })}
    </div>
    </div>
    <Fotter></Fotter>

    </div>
  )
}
