import React, { useEffect, useState } from "react";
import HaederCompany from "./HaederCompany";
import Fotter from "../componets/Fotter/Fotter";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import privateAxios from "../axios.config/privateAxios";
import axios from "axios";
import io from "socket.io-client"

export interface Job {
  job_id: number;
  job_name: string;
  job_description: string;
  job_city: string;
  job_address: string;
  job_salary: string;
  job_request: string;
  job_welfare: string;
  job_exp: string;
  job_status: number;
}

export default function Job() {
  const [show, setShow] = useState(false);
  const [datalocal, setDataLocal] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const handleClose = () => {
    const socket=io("http://localhost:3000")
    socket.emit('clientMessage', "create new job");
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
    // const socket=io("http://localhost:3000")
    // socket.emit('clientMessage', "create new job");
  }
  const [listJob, setListJob] = useState<Array<Job>>([]);
  const [flag, setFlag] = useState(false);
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const [job, setJob] = useState<Job>({
    job_id: 0,
    job_name: "",
    job_description: "",
    job_city: "",
    job_address: "",
    job_salary: "",
    job_request: "",
    job_welfare: "",
    job_exp: "",
    job_status: 1,
  });
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
  
  async function getApi() {
    try {
      const result = await axios.get("https://vapi.vnappmob.com/api/province/");
      setDataLocal(result.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getApi()  
    getListJob();
    const date=new Date();
    let day:number|string=date.getMonth()+1
    if (day<10) {
      day=String("0" + day)
    }
    const currentDate=Number(String(date.getFullYear()) + day +String((date.getDate())));
    setCurrentTime(currentDate)
    listJob.forEach(async (item:any)=>{
      if (Number(item.job_exp.split("-").join(""))<currentDate) {
        
        const res = await privateAxios.put(
          `/api/v1/job/updatestatus/${item.job_id}`,
          {
            job_status: 0,
          }
        );
        const socket=io("http://localhost:3000")
        socket.emit('clientMessage', "create new job");
      }
    })
  }, [flag]);
  const addJob = async (e: any) => {
    e.preventDefault();
    const check = confirm("Đăng bài tuyển dụng này?");
    if (!check) {
      return;
    }
    try {
      const res = await privateAxios.post(
        `/api/v1/job/create/${userLogin?.company_id}`,
        job
      );
      
      alert(res.data.message);
        handleClose();
        setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
   
  };

  const setstatusJob = async (item: Job) => {
    if (item.job_status == 1) {
      const check = confirm("Bạn có muốn dừng tuyến dụng này");
      if (!check) {
        return;
      }
      try {
        const res = await privateAxios.put(
          `/api/v1/job/updatestatus/${item.job_id}`,
          {
            job_status: 0,
          }
        );
        const socket=io("http://localhost:3000")
    socket.emit('clientMessage', "create new job");
        alert(res.data.message);
        setFlag(!flag);
      } catch (error) {
        console.log(error);
      }
      
      return;
    }
    const check = confirm("Bạn có muốn tiếp tục tuyến dụng này");
    if (!check) {
      return;
    }
    try {
      const res = await privateAxios.put(
        `/api/v1/job/updatestatus/${item.job_id}`,
        {
          job_status: 1,
        }
      );
      const socket=io("http://localhost:3000")
    socket.emit('clientMessage', "create new job");
      alert(res.data.message);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
   
console.log(currentTime);

  return (
    <div className="bg-[#E8EDF2]">
      <HaederCompany></HaederCompany>
      <div className="bg-gray-200 flex justify-between h-[50px] pl-5 pr-3">
        <p className="mt-[10px] text-lg font-[500] :">Quản lý tin tuyển dụng</p>
        <button
          className="bg-green-500 h-[40px] text-white p-2 mt-[5px] rounded-[10px]"
          onClick={handleShow}
        >
          + Thêm tin tuyển dụng mới
        </button>
      </div>

      {listJob?.length == 0 ? (
        <div className="w-[70%] h-[400px] mt-5 rounded-[10px] p-[70px]  m-auto bg-white">
          <p className="text-xl font-[500]"> Danh sách tin tuyến dụng</p>
          <img
            className="ml-[360px] "
            width={300}
            src="https://tuyendung.topcv.vn/app/_nuxt/img/search-empty.b2862ad.svg"
            alt=""
          />
          <p className="text-center text-2xl font-[500] text-red-600">
            Chưa có tin tuyến dụng{" "}
            <i className="fa-regular fa-face-sad-tear"></i>
          </p>
        </div>
      ) : (
        <div className="w-[70%] h-full mt-5 rounded-[10px] p-[70px]  m-auto bg-white">
          Danh sách tin tuyến dụng
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>Stt</th>
                <th>Tiêu đề tuyển dụng</th>
                <th>Trạng Thái</th>
                <th>Ngày Hết Hạn</th>
                <th>Hoạt Động</th>
                <th>Cập Nhật Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {listJob?.map((item, index) => {
                return (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.job_name}</td>
                    <td>
                      {item.job_status ? (
                        <span>Đang tuyển dụng</span>
                      ) : (
                        <span>Tạm Dừng</span>
                      )}
                    </td>
                    <td>{item.job_exp}</td>
                    <td className="flex justify-evenly">
                      <Button variant="warning">
                        <i className="fa-solid fa-pen-to-square "></i>
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        
                        onClick={() => setstatusJob(item)}
                        style={{
                          margin:"0 auto",
                          display: `${Number(item.job_exp.split("-").join(""))<currentTime ? "none" : "block"}`,
                          border: "none",
                          backgroundColor: `${
                            item.job_status ? "red" : "green"
                          }`,
                        }}
                      >
                        {item.job_status ? (
                          <span>Dừng tuyển dụng</span>
                        ) : (
                          <span>Tiếp tục TD</span>
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      <Fotter></Fotter>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tin tuyển dụng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <form action="" onSubmit={addJob}>
            <label htmlFor="">Tiêu đề tuyển dụng</label>
            <Form.Control
              className="mb-3"
              onChange={(e) => {
                setJob({ ...job, job_name: e.target.value });
              }}
              type="tetx"
              required
              placeholder="Nhập Tiêu đề"
            />
            <label htmlFor="">Mô Tả Công Việc</label>
            <Form.Control
              className="mb-3"
              onChange={(e) => {
                setJob({ ...job, job_description: e.target.value });
              }}
              as="textarea"
              required
              rows={3}
              placeholder="Nhập Mô Tả"
            />
            <label className="mb-3 mr-3" >Khu vực làm việc:</label>
            <select onChange={(e) => setJob({ ...job, job_city: e.target.value})}>
              <option value="">Chọn tỉnh thành phố</option>
              {datalocal.map((item: any) => {
              return (
                <option value={item.province_name}>{item.province_name}</option>
              );
            })}
            </select> <br />
            <label htmlFor="">Địa điểm làm việc</label>
            <Form.Control
              className="mb-3"
              onChange={(e) => {
                setJob({ ...job, job_address: e.target.value });
              }}
              type="tetx"
              required
              placeholder="Nhập địa chỉ"
            />
            <label htmlFor=""> Yêu Cầu </label>
            <Form.Control
              className="mb-3"
              onChange={(e) => {
                setJob({ ...job, job_request: e.target.value });
              }}
              as="textarea"
              required
              rows={3}
              placeholder="Nhập Yêu Cầu"
            />
            <label htmlFor=""> Mức lương</label>
            <Form.Control
              className="mb-3"
              onChange={(e) => {
                setJob({ ...job, job_salary: e.target.value });
              }}
              type="tetx"
              required
              placeholder="Nhập mức lương"
            />
            <label htmlFor="">Phúc lợi công ty</label>
            <Form.Control
              className="mb-3"
              onChange={(e) => {
                setJob({ ...job, job_welfare: e.target.value });
              }}
              as="textarea"
              required
              rows={3}
              placeholder="Nhập Phúc lợi"
            />
            <label htmlFor="">Hạn nộp hồ sơ</label>
            <Form.Control
              required
              className="mb-3"
              onChange={(e) => {
                setJob({ ...job, job_exp: e.target.value });
              }}
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
            <button className="w-ư200px] bg-green-500 h-[40px] text-white p-2 mt-[5px] ml-[300px] rounded-[10px]">
              Đăng Tin Ngay
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
