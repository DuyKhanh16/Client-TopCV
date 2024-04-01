import React from "react"
import publicAxios from "../../axios.config/publicAxios"
import { useNavigate } from "react-router-dom"

export interface UserRegiseter {
  user_fullName:string
  user_email:string
  user_password:string
  user_avatar:string
}

export default function RegisterUser() {
  const [user, setUser] = React.useState<UserRegiseter>({
    user_fullName: '',
    user_email: '',
    user_password: '',
    user_avatar: 'https://i0.wp.com/www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg?fit=415%2C415&ssl=1'
  })
  const [checkPassword, setCheckPassword] = React.useState<string>("")
  const link=useNavigate()
const addUser=async ()=>{
  if (user.user_email==""||user.user_fullName==""||user.user_password=="") {
    alert("Điền đầy đủ thông tin")
    return
  }
  if (user.user_password!=checkPassword) {
    alert("Mật khẩu nhập lại không đúng")
    return
  }
  try {
    const res = await publicAxios.post("/api/v1/users/register", user)
    alert(res.data.message)
    link("/loginUser")
  } catch (error:any) {
    alert(error.response.data.message)
    console.log(error);
  }
}
  return (
    <div className=' flex text-gray-500'>
        <div className='w-[60%] h-[870px] pt-[50px]'>
            <div className='w-[600px] m-auto '>
            <h1 className='text-[30px] font-bold text-[#00B150] mb-10'>Chào mừng bạn đến với TopCV</h1>
            <p className='mb-10'>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</p>
           
                <label htmlFor="" className='m-[10px]'>Họ và Tên</label><br />
                <input name="name" onChange={(e) => setUser({...user, user_fullName: e.target.value})}  type="text" className='m-[10px] w-[80%] h-[50px] p-3' placeholder= 'Nhập Họ và Tên'/><br/>
                <label htmlFor="" className='m-[10px]'>Email</label><br />
                <input name="email" onChange={(e) => setUser({...user, user_email: e.target.value})} type="email" className='m-[10px] w-[80%] h-[50px] p-3' placeholder=' Nhập Email'/><br />
                <label  htmlFor="" className='m-[10px]'>Mật Khẩu</label><br />
                <input name="password"  onChange={(e) => setUser({...user, user_password: e.target.value})} type="password" className='m-[10px] w-[80%] h-[50px] p-3' placeholder=' Nhập Mật Khẩu'/><br />
                <label htmlFor="" className='m-[10px]'>Nhập Lại Mật Khẩu</label><br />
                <input type="password" onChange={(e) => setCheckPassword(e.target.value)} className='m-[10px] w-[80%] h-[50px] p-3'  placeholder=' Nhap Lại Mật Khẩu'/><br />
                {checkPassword !== user.user_password ? <p className='text-red-500'>Mật không trùng nhau</p> : ''}
                <input type="checkbox" className='m-[10px]' checked={true} />
                <label htmlFor="" className='m-[10px]'>Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của TopCV</label><br />
                <button onClick={addUser} className='bg-[#00B150] text-white w-[90%] h-[40px] m-[25px] rounded-[5px]'>Đăng Ký</button>
          
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
