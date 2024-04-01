import React, { useEffect, useState } from "react";
import HaederCompany from "./HaederCompany";
import Fotter from "../componets/Fotter/Fotter";
import { Job } from "./Job";
import privateAxios from "../axios.config/privateAxios";

export default function JobCompany() {
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const [listJob, setListJob] = useState<Array<Job>>([]);
  const [flag, setFlag] = useState(false);

  async function getListJob() {
    try {
      const res: any = await privateAxios.get(
        `/api/v1/job/list/${userLogin?.company_id}`
      );
      setListJob(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getListJob();
  }, [flag]);

  return (
    <div className="bg-[#E8EDF2]">
      <HaederCompany></HaederCompany>
      <div className="w-[1200px] m-auto flex justify-between p-[40px]">
        <div className="w-[550px]">
          <div>
            <img
              className="rounded-[10px] mb-3"
              src="https://tuyendung.topcv.vn/app/_nuxt/img/banner-cv-recommend.a68e834.webp"
              alt=""
            />
          </div>

          <div className=" w-[100%] p-[10px]   bg-white rounded-[10px] mb-3">
            <p className="text-[18px] font-[500] mb-3">Hiệu quả tuyển dụng</p>
            <div className="flex flex-wrap justify-between">
              <div className="flex justify-between w-[250px]  bg-[#EBF3FF] p-2 mt-2 mb-2 rounded-[10px] text-blue-500">
                <div className=" ">
                  <p>0</p>
                  <p>Chiến dịch đang mở</p>
                </div>
                <div>
                  <i className="fa-solid fa-bullhorn"></i>
                </div>
              </div>
              <div className="flex justify-between  w-[250px] bg-[#F5FFF9] p-2 mt-2 mb-2 rounded-[10px] text-green-500">
                <div>
                  <p>0</p>
                  <p>CV Tiếp nhận</p>
                </div>
                <div>
                  <i className="fa-solid fa-file"></i>
                </div>
              </div>
              <div
                onClick={() => {
                  window.location.href = "/job";
                }}
                className="flex justify-between w-[250px] bg-[#FFFAE9] p-2 mt-2 mb-2 rounded-[10px] text-yellow-500 cursor-pointer"
              >
                <div>
                  <p>{listJob.length}</p>
                  <p>Tin tuyển dụng</p>
                </div>
                <div>
                  <i className="fa-solid fa-signal"></i>
                </div>
              </div>
              <div onClick={() => { window.location.href = "/apply-pending" }} className="flex justify-between w-[250px] hover:cursor-pointer bg-[#FFF3F2] p-2 mt-2 mb-2 rounded-[10px] text-red-500">
                <div >
                  <p>0</p>
                  <p>Cv ứng tuyển mới</p>
                </div>
                <div>
                  <i className="fa-regular fa-address-card"></i>
                </div>
              </div>
            </div>
          </div>
          <div className=" ">
            <img
              className="rounded-[10px]"
              src="https://www.l-a.com.vn/wp-content/uploads/2024/01/con-khat-tuyen-dung-sau-tet-van-bung-no.png"
              alt=""
            />
          </div>
        </div>
        <div className="w-[550px]">
          <div>
            <img
              className="rounded-[10px] mb-3"
              src="https://tuyendung.topcv.vn/app/_nuxt/img/banner_new_year.be0fe96.png"
              alt=""
            />
          </div>
          <div className="flex p-4  bg-white rounded">
            <div>
              <div>
                <img
                  className="w-[70px] h-[70px] rounded-[50%] m-4 mt-3"
                  src={userLogin.company_avata}
                  alt=""
                />
              </div>
            </div>
            <div className="h-[100px]">
              <p className="font-[500] text-sm text-green-500 h-[20px]">
                {userLogin.company_name}
              </p>
              <p className="text-[13px] h-[20px]">
                Mã NTD: {userLogin.company_id}
              </p>
              <p className="text-[13px] h-[20px]">
                Email:{userLogin.company_email}
              </p>
              <p className="text-[13px] h-[20px]">
                Số ĐT: {userLogin.company_phone}
              </p>
            </div>
          </div>
          <img
            className="w-[100%] rounded-[10px]"
            src="https://res.cloudinary.com/dwi7pnunq/image/upload/v1708556593/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2024-02-22_lu%CC%81c_06.02.14_rbjlmq.png"
            alt=""
          />
        </div>
      </div>
      <Fotter></Fotter>
    </div>
  );
}
