import React, { useEffect, useState } from 'react'
import { User } from '../Header/Header';
import privateAxios from '../../axios.config/privateAxios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface GetNameCV{
  cv_id:number,
  cv_job:string,
  cv_status:number
}
export default function InforComponet() {
     const [show, setShow] = useState(false);
     const [userLogin,setUserLogin]=useState<User>(JSON.parse(
      localStorage.getItem("userLogin") || "{}"
    ))
      const [cv,setCv]=useState<any>()
      const [listIdCv,setListCv]=useState<Number[]>([])
    async function getNameCV(){
        try {
            const res = await privateAxios.get(`/api/v1/cv/list/${userLogin?.user_id}`)
            setCv(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
     getNameCV() 
    },[])

    const handleClose = async () =>{
       setShow(false);
       setListCv([])
       setUserLogin({...userLogin,user_recruitment:0})
       localStorage.setItem("userLogin",JSON.stringify({...userLogin,user_recruitment:0}))
     
    }
    
    const chagerRecruitment = async (e:React.ChangeEvent<HTMLInputElement>)=>{
     
      if (!cv[0]) {
        alert("Vui lòng tạo CV trước")
        return window.location.href = "/newcv"
      }
       if (e.target.checked===true) {
        setShow(true);
        setUserLogin({...userLogin,user_recruitment:1})
         localStorage.setItem("userLogin",JSON.stringify({...userLogin,user_recruitment:1}))
       
       }else{
        const check=window.confirm("Bạn có muốn hủy đăng ký tuyển dụng")
        if (!check) {
          setShow(false);
          return
        }
        setUserLogin({...userLogin,user_recruitment:0})
        localStorage.setItem("userLogin",JSON.stringify({...userLogin,user_recruitment:0}))
        try {
          const res:any= await privateAxios.patch(`/api/v1/users/recruitment/${userLogin?.user_id}`,{
            user_recruitment:Number(0),
           })
           alert(res.data.message)
        } catch (error:any) {
          console.log(error);
        }
       }
     }
     
    //  changerCV
    const changeCv = (e:React.ChangeEvent<HTMLInputElement>)=>{
      if(e.target.checked==true){
        setListCv([...listIdCv,Number(e.target.value)])
      }else{
        setListCv(listIdCv.filter(item=>item!==Number(e.target.value)))
      }
      
    }
    // Bật tìm việc
    const activeJob  = async ()=>{
      const check= confirm("Bạn có muốn đăng ký tuyển dụng")
      if (!check) {
        return
      }
              try {
          const res:any= await privateAxios.patch(`/api/v1/users/recruitment/${userLogin?.user_id}`,{
            user_recruitment:Number(1),
            cv_id:listIdCv
           })
           alert(res.data.message)
           setShow(false)
           window.location.reload()
        } catch (error:any) {
          console.log(error)
        }
    }
    
  return (
    <div className='w-[300px] bg-white rounded-[10px]  '>
        <div className='flex justify-center p-3  '>
            <img className='rounded-[50%] mr-3 w-[80px] h-[80px]'  src={userLogin?.user_avata} alt="" />
           <div> 
            <p className='text-neutral-500  '>Chào bạn trở lại,</p>
            <p className='font-[600]'>{userLogin?.user_fullName}</p>
           </div>
        </div>
        <div className='flex justify-center p-3 '>
   
          {userLogin?.user_recruitment==1?<p className='text-[#00B150] font-[600] m-2 '>Tìm Việc Đang Bật</p>:<p className='text-gray-400 font-[600] m-2 '>Tìm Việc Đang Tắt</p>}
          <label className="inline-flex items-center cursor-pointer">
         <input type="checkbox"  checked={userLogin?.user_recruitment} className="sr-only peer " onChange={chagerRecruitment} />
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>

        </div>
        <p className='text-neutral-500 text-center text-[10px] pl-3 pr-3'>Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn trong danh sách tìm kiếm của NTD.</p>
        <p className='text-neutral-700  text-[14px] pl-3 pr-3'><i className="fa-solid fa-check text-[#00B150] mr-2"></i>Nhắn tin qua Top Connect trên TopCV</p>
        <p className='text-neutral-700  text-[14px] pl-3 pr-3'><i className="fa-solid fa-check text-[#00B150] mr-2"></i>Email và Số điện thoại của bạn</p>
        <div>
          <img className='p-2 ' src="https://static.topcv.vn/v4/image/app/banner--app.png" alt="" />
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton className='h-[150px] bg-[#068937] p-4'>
          <Modal.Title className='text-white w-[400px]'>Vui lòng lựa chọn các CV bạn muốn bật tìm việc</Modal.Title>
          <img width={200} height={200} className='ml-[200px]' src="https://static.topcv.vn/v4/image/turn-on-job/img-header.png" alt="" />
        </Modal.Header>
        <Modal.Body className='p-4' >
          <div className=' border-[1px] border-gray-300 rounded-[10px] p-3 ' >
            <p className='text-gray-500'>CV Online</p>
            <div className='flex flex-wrap justify-between'>
         {cv?.map((item:any)=>{
           return( <div className='w-[350px] h-[60px] p-2' >
                  <input type="checkbox" className='mr-2' value={item.cv_id} onChange={changeCv}/>
                  <label className='text-lg font-[600] '>{item.cv_job}</label><br />
                  <p className='text-gray-500 text-[14px] ml-[20px]'>cập nhập ngày {item.cv_date}</p>
                </div>)
         })},
         </div>
         </div>
        </Modal.Body>
        <Modal.Footer style={{display:"flex",justifyContent:"center",borderTop:"none"}}>
          <Button style={{backgroundColor:"gray", outline:"none",border:"none",marginRight:"30px"}} onClick={handleClose}>Tôi không có nhu cầu</Button>
          <Button style={{backgroundColor:"#068937", outline:"none",border:"none"}} onClick={activeJob} >Bật tìm việc ngay</Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
  
}
