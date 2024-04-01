import React, { useEffect, useState } from 'react'
import { User } from './Header/Header';
import privateAxios from '../axios.config/privateAxios';

export default function ListJobSave() {
const [userLogin, setUserLogin] = useState<User>(
        JSON.parse(localStorage.getItem("userLogin") || "{}")
      );
const [jobSave, setJobSave] = useState<any>();
const [flag, setFlag] = useState<boolean>(false);
 
const userSaveJob = async () => {
        if (userLogin.role !==0 ) {
          return
        }
        try {
          const result= await privateAxios.get(`/api/v1/job/jobsave/${userLogin?.user_id}`);
          setJobSave(result.data.data);      
        } catch (error) {
          console.log(error);
          
        }
      }
useEffect(() => {
    userSaveJob()
},[flag])

  return (
    <div className='mb-3'>
        <p className='text-2xl font-[200] m-2'>Danh sách công việc đã lưu</p>
        <div>
            {jobSave?.map((item:any) => (
               
                    <div className='flex bg-white p-2 mb-2 rounded-[10px] h-[130px]'>
                        <img className='mr-3 w-[70px] h-[70px] rounded mt-3 ml-2' src={item.job.company.company_avata} alt=""  width={100} />
                        <div>
                            <p className='text-[18px] font-[600] text-green-500 cursor-pointer' onClick={()=>window.location.href = `/jobreview/${item.job.job_id}`}>{item.job.job_name} - {item.job.job_salary}</p>
                            <p className='font-[200] text-[14px]'>{item.job.company.company_name}</p>
                            <p  className='font-[200] text-[14px]'><i className="fa-solid fa-location-dot"></i> {item.job.job_city} {item.job.job_address}</p>
                        </div>
                    </div>
                
            ))}
        </div>

    </div>
  )
}
