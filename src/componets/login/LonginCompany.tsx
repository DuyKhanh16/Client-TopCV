import React from 'react'
import { useNavigate } from 'react-router-dom'
import publicAxios from '../../axios.config/publicAxios'
interface company {
  company_email: string,
  company_password: string
}
export default function LonginCompany() {
 const [company, setCompany] = React.useState<company>({
  company_email: '',
  company_password: ''
 })
 const link=useNavigate()
 const longinCompany=async ()=>{
  if (company.company_email==""||company.company_password=="") {
    alert("Điền đầy đủ thông tin")
    return
  }
  
  try {
    const newCompany={
      company_email:String(company.company_email),
      company_password:String(company.company_password)
    }
    const result=await publicAxios.post('/api/v1/auth/company',newCompany)
    localStorage.setItem('token',result.data.token)
    localStorage.setItem('userLogin',JSON.stringify(result.data.data))
    alert(result.data.message)
    link('/homeCompany')
   } catch (error:any) {
    console.log(error);
    alert(error.response.data.message)
    
   }
 }

  return (
    <div className=' flex text-gray-500'>
    <div className='w-[60%] h-[870px] pt-[100px]'>
        <div className='w-[600px] m-auto '>
        <h1 className='text-[30px] font-bold text-[#00B150] mb-10'>Chào mừng bạn đã trở lại</h1>
        <p className='mb-10'>Xây dựng một cộng đồng doanh nghiệp phát triển cùng TopCV</p>
       
            <label htmlFor="" className='m-[10px]'>Email</label><br />
            <input  type="email" onChange={(e)=>{setCompany({...company,company_email:e.target.value})}} className='m-[10px] w-[80%] h-[50px] p-3' placeholder=' Nhập Email'/><br />
            <label  htmlFor="" className='m-[10px]'>Mật Khẩu</label><br />
            <input  type="password" onChange={(e)=>{setCompany({...company,company_password:e.target.value})}} className='m-[10px] w-[80%] h-[50px] p-3' placeholder=' Nhập Mật Khẩu'/><br />
            <input type="checkbox" className='m-[10px]' checked={true} />
            <label htmlFor="" className='m-[10px]'>Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của TopCV</label><br />
            <button onClick={longinCompany} className='bg-[#00B150] text-white w-[90%] h-[40px] m-[25px] rounded-[5px]'>Đăng Nhập</button>
      
        <p className='text-center'>Đăng Nhập Bằng</p>
        <div className='flex justify-center text-white'>
        <button className='w-[100px] h-[40px] rounded-md m-10 bg-[#E73B2E]'> <i className="fa-brands fa-google"></i> Google</button>
        <button className='w-[100px] h-[40px] rounded-md m-10 bg-[#1777F2]'> <i className="fa-brands fa-facebook-f"></i> Facebook</button>
        <button className='w-[100px] h-[40px] rounded-md m-10 bg-[#0B65C2]'><i className="fa-brands fa-linkedin"></i>Linkedin</button>
        </div>
        </div>
    </div>
    <div className='w-[40%]  bg-cover
     bg-[url("https://firebasestorage.googleapis.com/v0/b/prj-duykhanh.appspot.com/o/images%2FHi%CC%80nh%20a%CC%89nh%2031-01-2024%20lu%CC%81c%2016.31.jpeg?alt=media&token=a92dc155-943d-4e52-ac02-8b5727a39edb")]'  >
      <div className='cursor-pointer w-[250px] h-[70px] mt-[430px] ml-10' onClick={()=>{window.location.href="/"}}></div>
     </div>
</div>
  )
}
