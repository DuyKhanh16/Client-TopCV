import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import publicAxios from '../../axios.config/publicAxios'
// import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';

import { GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import auth from '../../config-firebase/data';
import { UserRegiseter } from '../register/RegisterUser';

interface User{
  user_email:string
  user_password:string
}
// interface LoginGoogle{
//   user_fullName:string
//   user_email:string
//   user_password:string
//   user_avata:string
// }
export default function LoginUser() {
  const [user,setUser]=useState<User>({
    user_email:'',
    user_password:''
  })
  // const [loginGoogle,setLoginGoogle]=useState<UserRegiseter>({
  // user_fullName:'',
  // user_email:'',
  // user_password:'',
  // user_avatar:''
  // })
  const link=useNavigate()

  const longinUser=async ()=>{
   if (user.user_email==""||user.user_password=="") {
     alert("Điền đầy đủ thông tin")
     return
   }
   
   try {
    const result=await publicAxios.post('/api/v1/auth/users',user)
    localStorage.setItem('token',result.data.token)
    localStorage.setItem('userLogin',JSON.stringify(result.data.data))
    alert(result.data.message)
    link('/')
   } catch (error:any) {
    console.log(error);
    alert(error.response.data.message)
    
   }
  }
  // login goole
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () =>{
    let newUser:UserRegiseter={
      user_fullName:"",
      user_email:"",
      user_password:"",
      user_avatar:""
    }
     await signInWithPopup(auth, provider)
      .then( (result)  => {
        const user = result.user;
        // setUser(user);
        console.log(user);
       newUser={
      user_fullName:String(user.displayName),
      user_email:String(user.email),
      user_password:String(user.uid),
      user_avatar:String(user.photoURL)
       }

      })
      .catch((error) => {
        console.log("error", error);
      });
      
      try {
      const result= await publicAxios.post('/api/v1/auth/loginGoogle',newUser)
       localStorage.setItem('token',result.data.token)
       localStorage.setItem('userLogin',JSON.stringify(result.data.data))
       alert(result.data.message)
      link('/')
      } catch (error) {
        console.log(error);
      }
    }

 
  return (
    <div className=' flex text-gray-500'>
        <div className='w-[60%] h-[870px] pt-[100px]'>
            <div className='w-[600px] m-auto '>
            <h1 className='text-[30px] font-bold text-[#00B150] mb-10'>Chào mừng bạn đã trở lại</h1>
            <p className='mb-10'>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</p>
           
                <label htmlFor="" className='m-[10px]'>Email</label><br />
                <input onChange={(e)=>{setUser({...user,user_email:e.target.value})}} type="email" className='m-[10px] w-[80%] h-[50px] p-3' placeholder=' Nhập Email'/><br />
                <label  htmlFor="" className='m-[10px]'>Mật Khẩu</label><br />
                <input onChange={(e)=>{setUser({...user,user_password:e.target.value})}} type="password" className='m-[10px] w-[80%] h-[50px] p-3' placeholder=' Nhập Mật Khẩu'/><br />
                <input type="checkbox" className='m-[10px]' checked={true} />
                <label htmlFor="" className='m-[10px]'>Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của TopCV</label><br />
                <button onClick={longinUser} className='bg-[#00B150] text-white w-[90%] h-[40px] m-[25px] rounded-[5px]'>Đăng Nhập</button>
            <p className='m-5'>Bạn chưa có tài khoản? <span className='text-[#00B150] cursor-pointer' onClick={()=>{link('/registerUser')}}>Đăng ký ngay</span></p>
            <p className='text-center'>Đăng Nhập Bằng</p>
            <div className='flex justify-center text-white'>
            <button className='w-[100px] h-[40px] rounded-md m-10 bg-[#E73B2E]' onClick={handleGoogleSignIn}> 
            <i className="fa-brands fa-google"></i> Google
            </button>
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
