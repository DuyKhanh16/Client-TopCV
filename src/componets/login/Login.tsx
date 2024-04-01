import React from 'react'
import Navbar from '../Navbar'

export default function Login() {

  return (
    <div>
        <div >
            <img onClick={() => window.location.href = '/'} className='ml-5 cursor-pointer' width={200} src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png" alt="" /> 
            
        </div>
        <div className='bg-[url(https://static.topcv.vn/v4/image/thumbnail/Thumb-Homepage-TopCV.vn.png?v=2.0.3)]
        flex justify-evenly pt-[200px] bg-cover bg-center w-[100%] h-[100vh]'>
            <div className='w-[300px] h-[400px] bg-white rounded-[20px] '  >
                <img src="https://timviec365.vn/images/New_images/uv_bg.png" alt="" />
                <ul className='m-4 ml-10' >
                    <li className='m-[2px]'> 100.000+ Công việc mơ ước</li>
                    <li className='m-[2px]'>365+ Mẫu CV chuyên nghiệp</li>
                    <li className='m-[2px]'>22+ Bộ đề câu hỏi tuyển dụng</li>
                    <button onClick={() => window.location.href = '/loginUser'} className='bg-[#00B150] cursor-pointer text-white w-[200px]  h-[40px] mt-3 rounded-[5px]' >ĐĂNG NHẬP ỨNG VIÊN</button>
                </ul>
            </div>
            <div className='w-[300px] h-[400px] bg-white rounded-[20px] ' >
            <img src="https://timviec365.vn/images/New_images/ntd_bg.png" alt="" />
                <ul className='m-4 ml-10' >
                    <li className='m-[2px]'> Đăng tin tuyển dụng miễn phí</li>
                    <li className='m-[2px]'>Tặng điểm lọc hồ sơ mỗi ngày</li>
                    <li className='m-[2px]'>Biểu mẫu nhân sự chuyên nghiệp</li>
                </ul>
                <button onClick={() => window.location.href = '/loginCompany'} className='bg-[#00B150] cursor-pointer text-white w-[250px]  h-[40px] ml-7 rounded-[5px]' >ĐĂNG NHẬP NHÀ TUYỂN DỤNG</button>

            </div>
        </div>
    </div>
  ) 
}
