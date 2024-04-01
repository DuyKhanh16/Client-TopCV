import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Fotter from "./Fotter/Fotter";
import { useParams } from "react-router-dom";
import publicAxios from "../axios.config/publicAxios";
import { Job } from "../Company/Job";
import privateAxios from "../axios.config/privateAxios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import io from "socket.io-client"

export default function JobUserReview() {
  const idDetail: number = Number(useParams().id);
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const [jobDetail, setJobDetail] = useState<any>();
  const [flag, setFlag] = useState<boolean>(false);
  const [listJobSave, setListJobSave] = useState<any>([]);
  const [listCv, setListCv] = useState<any>();
  const [cvApply, setCvApply] = useState<number>();
  const [show, setShow] = useState(false);
  const [jobSave, setJobSave] = useState<any>([]);

  async function getJob() {
    try {
      const res: any = await publicAxios.get(`/api/v1/job/one/${idDetail}`);
      setJobDetail(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const userSaveJob = async () => {
    if (userLogin.role !== 0) {
      return;
    }
    try {
      const result = await privateAxios.get(
        `/api/v1/job/jobsave/${userLogin?.user_id}`
      );
      setJobSave(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  async function getCvUser() {
    try {
      const res = await privateAxios.get(
        `/api/v1/cv/list/${userLogin?.user_id}`
      );
      setListCv(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getJob();
    getCvUser();
    userSaveJob();
  }, [flag]);
  //
  const saveJob = async () => {
    if (userLogin.role !== 0) {
      alert("Vui lòng đăng nhập người dùng");
      return;
    }
    try {
      const result = await privateAxios.post(
        `/api/v1/job/savejob/${userLogin?.user_id}/${jobDetail?.job_id}`
      );
      alert(result.data.message);
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const apply = async () => {
    if (userLogin.role !== 0) {
      alert("Vui lòng đăng nhập người dùng");
      return;
    } else if (listCv.length === 0) {
      alert("Vui lòng tạo Cv trước khi ứng tuyển");
      return (window.location.href = "/newcv");
    }
    setShow(true);
  };
  const handleClose = async () => {
    setShow(false);
  };

  const handleApply = async () => {
    try {
      const result = await privateAxios.post(
        `/api/v1/job/apply/${jobDetail?.job_id}/${cvApply}`
      );
      alert(result.data.message);
    const socket = io("http://localhost:3000");
    socket.emit("client-send-notification", {
      id: jobDetail?.company.company_id,
    });
      setShow(false);
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
    
  };
console.log(jobDetail);

  return (
    <div className="bg-[#F4F5F7]">
      <Header></Header>
      <div className="flex justify-center">
        <div className="w-[60%] mr-3  mt-2 rounded-[10px] p-3 bg-white">
          <div>
            <p className="text-2xl font-[600]">
              {jobDetail?.job_name}-{jobDetail?.job_salary}{" "}
              <i className="fa-solid fa-circle-check text-green-500"></i>
            </p>
            <div className="flex ">
              <p className="font-[600]">
                <i className="fa-solid fa-comments-dollar text-xl text-green-500"></i>
                : {jobDetail?.job_salary}
              </p>
              <p className="ml-[200px]">
                <i className="fa-solid fa-location-dot text-xl text-green-500"></i>{" "}
                :{jobDetail?.job_city} - {jobDetail?.job_address}
              </p>
            </div>
            <div>
              <button
                onClick={apply}
                className="w-[650px] bg-green-500 h-[40px] rounded-[10px] text-white font-[600] ml-[130px] "
              >
                Ứng tuyển ngay
              </button>
              <button
                onClick={saveJob}
                style={{
                  display: `${
                    jobSave?.findIndex(
                      (e: any) => e.job.job_id === jobDetail.job_id
                    ) == -1
                      ? "inline"
                      : "none"
                  }`,
                }}
                className="w-[150px] border-[1px] border-green-500 h-[40px] rounded-[10px] text-green-500 font-[600] ml-[30px]"
              >
                Lưu tin <i className="fa-regular fa-heart"></i>
              </button>
            </div>
          </div>

          <div>
            <div className=" flex">
              <div className="w-[10px] h-[50px] bg-green-500"></div>
              <p className="text-xl font-[600] p-[12px]">
                Chi tiết tin tuyển dụng
              </p>
            </div>
            <div>
              <p className="text-xl font-[600]">- Mô tả công việc</p>
              <p>{jobDetail?.job_description}</p>
              <p className="text-xl font-[600]">- Yêu cầu ứng viên</p>
              <p>{jobDetail?.job_request}</p>
              <p className="text-xl font-[600]">- Quyền lợi</p>
              <p>{jobDetail?.job_welfare}</p>
              <p className="text-xl font-[600]">- Hạn nộp hồ sơ</p>
              <p>{jobDetail?.job_exp}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex p-2 justify-evenly w-[400px]  mt-2 bg-white rounded">
            <div>
              <div>
                <img
                  className="w-[70px] h-[70px] rounded-[50%] m-4 mt-3"
                  src={jobDetail?.company.company_avata}
                  alt=""
                />
              </div>
            </div>
            <div className="">
              <p className="font-[500] text-sm text-green-500 h-[20px] hover:cursor-pointer hover:text-blue-500" onClick={() => window.location.href = `/vewcompany/${jobDetail?.company.company_id}`}>
                {jobDetail?.company.company_name}
              </p>
              <p className="text-[13px] h-[20px]">
                Mã NTD: {jobDetail?.company.company_id}
              </p>
              <p className="text-[13px] h-[20px]">
                Email:{jobDetail?.company.company_email}
              </p>
              <p className="text-[13px] h-[20px]">
                Số ĐT: {jobDetail?.company.company_phone}
              </p>
            </div>
          </div>
          <img
          width={400}
          src="https://firebasestorage.googleapis.com/v0/b/prj-duykhanh.appspot.com/o/images%2FHi%CC%80nh%20a%CC%89nh%2021-03-2024%20lu%CC%81c%2010.26.jpeg?alt=media&token=22969e17-0480-481f-a621-aecb3b58cd42"
          alt=""
        />
        </div>
       
      </div>
      <Fotter></Fotter>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton className="h-[150px] bg-[#068937] p-4">
          <Modal.Title className="text-white w-[400px]">
            Vui lòng lựa chọn các CV bạn muốn ứng tuyển
          </Modal.Title>
          <img
            width={200}
            height={200}
            className="ml-[200px]"
            src="https://static.topcv.vn/v4/image/turn-on-job/img-header.png"
            alt=""
          />
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className=" border-[1px] border-gray-300 rounded-[10px] p-3 ">
            <p className="text-gray-500">CV Online</p>
            <div className="flex flex-wrap justify-between">
              {listCv?.map((item: any) => {
                return (
                  <div className="w-[350px] h-[60px] p-2">
                    <input
                      type="radio"
                      className="mr-2"
                      value={item.cv_id}
                      id={item.cv_job}
                      name="cv"
                      onChange={(e) => setCvApply(Number(e.target.value))}
                    />
                    <label
                      className="text-lg font-[600] "
                      htmlFor={item.cv_job}
                    >
                      {item.cv_job}
                    </label>
                    <br />
                    <p className="text-gray-500 text-[14px] ml-[20px]">
                      cập nhập ngày {item.cv_date}
                    </p>
                  </div>
                );
              })}
              ,
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
            borderTop: "none",
          }}
        >
          <Button
            style={{
              backgroundColor: "#22C45E",
              outline: "none",
              border: "none",
            }}
            onClick={handleApply}
          >
            Ứng tuyển ngay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
