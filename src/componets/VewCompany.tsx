import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import { useParams } from "react-router-dom";
import publicAxios from "../axios.config/publicAxios";
import Fotter from "./Fotter/Fotter";
import { Company } from "../Company/ViewInfo";
import { Job } from "../Company/Job";

export default function VewCompany() {
  const company_id = useParams().id;
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
  const [listJob, setListJob] = useState<Array<Job>>([]);
  
  async function getOneCompany() {
    try {
      const result = await publicAxios.get(`/api/v1/company/one/${company_id}`);
      setInfoCompany(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getListJob() {
    try {
      const res: any = await publicAxios.get(`/api/v1/job/list/${company_id}`);
      setListJob(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getListJob();
    getOneCompany();
  }, []);
  console.log(infoCompany);
  console.log(listJob);

  return (
    <div className="bg-[#F4F5F7]" >
      <Header></Header>
      <p>Thông tin công ty & tin tuyển dụng từ</p>
      <div className="w-[1200px] m-auto   mt-3 bg-grey-200 ">
        <div
          className="w-[1200px] h-[350px] bg-gray-200  "
          style={{
            backgroundImage: `url(${infoCompany?.company_bacgroundPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="w-[1200px] pt-3 h-[100px] bg-[#0F9E4D] mt-[-15px]">
          <p className="ml-[300px] text-2xl text-white font-[400]">
            {infoCompany?.company_name}
          </p>
          <div className="flex ml-[200px] justify-between w-[950px] text-white h-[30px] ">
            <p>
              <i className="fa-solid fa-globe">:</i> {infoCompany?.company_web}
            </p>
            <p>
              <i className="fa-solid fa-people-arrows">:</i>{" "}
              {infoCompany?.company_human} người
            </p>
            <p>
              <i className="fa-solid fa-location-dot">:</i>{" "}
              {infoCompany?.address.city}
            </p>
          </div>
        </div>
        <div
          className="w-[150px] h-[150px]  m-[-175px] ml-[100px] rounded-[50%] mb-[50px]"
          style={{
            backgroundImage: `url(${infoCompany?.company_avata})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
       
      </div>
      <div className="w-[1200px]  m-auto flex justify-between mt-2 ]">
      <div className="w-[65%] bg-white rounded-lg ">
           <p className="text-2xl text-white font-[600] h-[50px] bg-[#0F9E4D] rounded-lg rounded-b-none p-[10px] ">Giới thiệu về công ty</p>
           <p className="p-2">{infoCompany?.company_description}</p>
          </div>
          <div className="w-[30%]  bg-white rounded-lg ">
            <p className="text-2xl text-white font-[600] h-[50px] bg-[#0F9E4D] rounded-lg rounded-b-none p-[10px] ">Thông tin liên hệ</p>
            <p className="p-2"><i className="fa-solid fa-location-dot text-green-500"></i>: {infoCompany?.address.home}, {infoCompany?.address.district}, {infoCompany?.address.city}</p>
            <p className="p-2"><i className="fa-solid fa-phone text-green-500"></i>: {infoCompany?.company_phone}</p>
            <p className="p-2"><span className="text-green-500">Lĩnh vực hoạt động</span>: <span className="text-red-500 font-[600]">{infoCompany?.company_career}</span></p>
          </div>
        </div>
       <div className="w-[780px] mt-4 ml-[240px] bg-white">
        <p className="text-2xl text-white font-[600] h-[50px] bg-[#0F9E4D] rounded-lg rounded-b-none p-[10px] ">Tuyển dụng</p>
        {listJob?.map((item, index) => {
          return (
            <div key={index} className="flex justify-between bg-[#F2FBF6] m-2 rounded-md">
              <div className="flex pt-2">
                <div className="m-2">
                  <img className="w-[50px] h-[50px] rounded-[50%]" src={infoCompany.company_avata} alt="" />
                </div>
                <div className="w-[400px]">
                  <p className="font-[600]  cursor-pointer hover:text-blue-500 " onClick={()=>window.location.href = `/jobreview/${item.job_id}`}>{item.job_name}</p>
                  <div className="flex justify-between w-[450px]">
                  <p className=" hover:cursor-pointer hover:text-blue-500 "  onClick={() => window.location.href = `/vewcompany/${infoCompany.company_id}`}>{infoCompany.company_name}</p>
                <p><span>Hạn nộp Cv:</span> <span>{item.job_exp}</span></p>
                </div>
                </div>
              </div>
              <div className="flex justify-evenly mt-2">
                <p className="font-[600] text-[#00B150] mr-10 ">{item.job_salary}</p>
              </div>
              <p className="p-2 text-red-600 font-[700]">{item.job_status ? "Đang tuyển" : "Hêt hạn"}</p>
              </div>
        )})}
       </div>
      <Fotter></Fotter>
    </div>
  );
}
