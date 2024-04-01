import React, { useEffect, useState } from "react";
import { Job } from "../../Company/Job";
import publicAxios from "../../axios.config/publicAxios";
import Form from "react-bootstrap/Form";
import axios from "axios";
import io from "socket.io-client"
import privateAxios from "../../axios.config/privateAxios";
interface Search{
  job_search:string
  city_search:string
}
export default function Boydy() {
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const [listJob, setListJob] = useState<Array<any>>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [datalocal, setDataLocal] = useState([]);
  const [jobSave, setJobSave] = useState<any>([]);
  const [search, setSearch] = useState<Search>({
    job_search: "",
    city_search: "",
  })
  const [localJob, setLocalJob] = useState<string>("");
  
  async function getAllJob() {
    try {
    const result = await axios.get(
      `http://localhost:3000/api/v1/job/list`
    )
    setListJob(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }
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
  async function getApi() {
    try {
      const result = await axios.get("https://vapi.vnappmob.com/api/province/");
      setDataLocal(result.data.results);
    } catch (error) {
      console.log(error);
    }
  }
 
  useEffect(() => {
  
    getAllJob();
    getApi();
    userSaveJob()
    const socket = io("http://localhost:3000");
    socket.on("serverMessage", (data) => {
      setListJob(data);
      
    });
  }, [flag]);
   const getJobSearch = async ()=>{
    if (search.job_search !== "" && search.city_search === "") {
      const newlist=listJob.filter((item:any)=>{
        return item.job_name.toLowerCase().includes(search.job_search.toLowerCase())
      })
      setListJob(newlist)
      return
    } 
    if (search.job_search === "" && search.city_search !== "") {
      const newList= listJob.filter((item:any)=>{
        return item.job_city===search.city_search
      })
      setListJob(newList)
      return
    }
    if (search.job_search !== "" && search.city_search !== "") {
      const newlist=listJob.filter((item:any)=>{
        return item.job_name.toLowerCase().includes(search.job_search.toLowerCase()) && item.job_city===search.city_search
      })
      setListJob(newlist)
      return
    }
   }
  const handleSearchJobByCity = async (e: React.ChangeEvent<HTMLSelectElement>) => {
   
    const newList= listJob.filter((item:any)=>{
      return item.job_city===e.target.value
    })
    setListJob(newList)
    
  }
  const saveJob = async (job_id:number) => {
  
    if (userLogin.role !==0 ) {
      alert("Vui lòng đăng nhập người dùng");
      return
    }
    try {
      const result= await privateAxios.post(`/api/v1/job/savejob/${userLogin?.user_id}/${job_id}`);
      alert(result.data.message);

    } catch (error:any) {
      console.log(error);
      alert(error.response.data.message)
    }
    setFlag(!flag);
  }
  
  const [content, setContent] = useState<string>("");
  const changerEnter = (e: any) => {
   

  }
  const handleExport = async () => {
   const result= await axios.get(`http://localhost:4000/api/v1/excel/export`);
   console.log(result);
   
  }
  return (
    <div className="bg-[#F4F5F7]">
        <div className="bg-[url(https://static.topcv.vn/v4/image/welcome/bg_header.webp)] bg-cover w-[100%] h-[500px] flex justify-evenly  ">
      <div className="w-[40%] pt-5">
        <div className="text-white ">
          <p className="text-xl font-[600]">
            Công nghệ AI dự đoán, cá nhân hoá việc làm
          </p>
          <p>
            <span className="text-[#00B150] font-[600] ml-2">
              Định hướng nghề nghiệp
            </span>{" "}
            dành cho bạn.
          </p>
        </div>
        <div className="bg-white h-[50px] m-3 rounded-[10px]  ">
          <i className="fa-solid fa-magnifying-glass text-[25px] text-gray-500 m-[10px]"></i>

          <input className="h-[30px] w-[250px] ml-[20px] outline-none " type="text" placeholder="Vị trí ứng tuyển" onChange={(e) => setSearch({ ...search, job_search: e.target.value })} />

          <i className="fa-solid fa-location-dot text-[25px] text-gray-500"></i>

          <select onChange={(e) => setSearch({ ...search, city_search: e.target.value })} className="ml-[10px] outline-none ">
            <option value="">Tất Cả Địa Điểm</option>
            {datalocal.map((item: any) => {
              return (
                <option value={item.province_name}>{item.province_name}</option>
              );
            })}
          </select>
          <button className="ml-[10px] w-[80px] h-[30px] rounded-[5px] bg-[#00B150] text-white" onClick={getJobSearch}>Tìm Kiếm</button>
        </div>
        <div className="ml-[30px]" >
          <img  width={600}
            src="https://cdn-new.topcv.vn/unsafe/800x/https://static.topcv.vn/v4/image/welcome/section-header/banner.png"
            alt=""
          />
        </div>
      </div>
      <div className="w-[40% pt-[60px]">
        <img
          width={700}
          src="https://firebasestorage.googleapis.com/v0/b/prj-duykhanh.appspot.com/o/images%2FHi%CC%80nh%20a%CC%89nh%2019-02-2024%20lu%CC%81c%2014.50.jpeg?alt=media&token=a7a62bf8-c680-4f01-a0e5-7df26c0a0dbb"
          alt=""
        />
      </div>
    </div>
    <div className="w-[1400px] bg-[#F4F5F7] m-auto mt-3 rounded-[10px] p-4 ">
      <p className="text-2xl font-[700] text-green-500">Việc làm hấp dẫn</p>
      <div>
        <i className="mr-3">
          {" "}
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          Tìm kiếm
        </i>
        <select name="" id="" onChange={handleSearchJobByCity}>
          <option value="">Tất Cả Địa Diện</option>
          {datalocal.map((item: any) => {
            return (
              <option value={item.province_name}>{item.province_name}</option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-wrap ml-7 ">
        {listJob?.map((item: any) => {
          return (
            <div className="w-[400px] p-2 rounded-[10px] m-2 bg-white">
              <div className="flex pt-2">
                <div className="m-2">
                  <img className="w-[50px] h-[50px] rounded-[50%]" src={item?.company_avata} alt="" />
                </div>
                <div>
                  <p className="font-[600] cursor-pointer hover:text-blue-500 " onClick={()=>window.location.href = `/jobreview/${item?.job_id}`}>{item?.job_name}</p>
                  <p className=" hover:cursor-pointer hover:text-blue-500 "  onClick={() => window.location.href = `/vewcompany/${item?.company_id}`}>{item?.company_name}</p>
                </div>
              </div>
              <div className="flex justify-evenly mt-2">
                <p className="font-[600] text-[#00B150] mr-10 ">{item?.job_salary}</p>
                <p className="text-[12px] w-[200px]">{item?.job_city},{item.job_address}</p>
                <p className="ml-[30px]"> <i onClick={() => saveJob(item.job_id)} className="fa-solid fa-heart cursor-pointer hover:text-red-500" style={{color:`${jobSave?.findIndex((e:any)=> e?.job.job_id === item?.job_id) !== -1 ? "red" : "black"}`}}></i></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
   <div className="w-full bg-white pt-4">
    <img width={1200} className="m-auto " src="https://firebasestorage.googleapis.com/v0/b/prj-duykhanh.appspot.com/o/images%2FHi%CC%80nh%20a%CC%89nh%2024-03-2024%20lu%CC%81c%2017.34.jpeg?alt=media&token=ea2c6e84-d21f-45ba-a519-06f76f37d42f" alt="" />
   </div>
   <div  className="w-full bg-[#F4F5F7] pt-4">
        <img width={1200} className="m-auto " src="https://firebasestorage.googleapis.com/v0/b/prj-duykhanh.appspot.com/o/images%2FHi%CC%80nh%20a%CC%89nh%2024-03-2024%20lu%CC%81c%2017.35.jpeg?alt=media&token=2960ccb2-031e-4389-bbe9-778d31ec054f" alt="" />
   </div>
   <button onClick={handleExport}>excel</button>
    </div>
  );
}
