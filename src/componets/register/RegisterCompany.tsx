import React, { useEffect, useState } from "react";
import publicAxios from "../../axios.config/publicAxios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export interface Adress {
  home: string;
  street: string;
  district: string;
  city: string;
}
interface company {
  company_name: string;
  company_address: Adress;
  company_email: string;
  company_password: string;
}
export default function RegisterCompany() {
  const link = useNavigate();
  const [city, setCity] = useState<any>();
  const [district, setDistrict] = useState<any>();
  const [dataLocal, setDataLocal] = React.useState<any>([]);
  const [datastreet, setDataStreet] = React.useState<any>([]);
  const [dataDistrict, setDataDistrict] = React.useState<any>([]);
  const [flag, setFlag] = React.useState<boolean>(true);
  const [address, setAddress] = React.useState<Adress>({
    home: "",
    street: "",
    district:"",
    city:"",
  });
  const [company, setCompany] = React.useState<company>({
    company_name: "",
    company_address: address,
    company_email: "",
    company_password: "",
  });
  const [checkPassword, setCheckPassword] = React.useState<string>("");

  // address;
  async function getApi() {
    try {
      const result = await axios.get("https://vapi.vnappmob.com/api/province/");
      setDataLocal(result.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDistrict() {
    try {
      const result = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${city.province_id}`
      );
      setDataDistrict(result.data.results);
      setCompany({
        ...company,company_address:address
      })
    } catch (error) {
      console.log(error);
    }
  }
  async function getStreet(){
    try {
      const result = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${district.district_id}`
      );
      setDataStreet(result.data.results);
      setCompany({
        ...company,company_address:address
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getApi();
    getDistrict()
    getStreet()
  }, [flag]);


  const handelChangeHome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,home:e.target.value
    })
    setCompany({
      ...company,company_address:address
    })
    setFlag(!flag);
  }

  const handelChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(dataLocal[e.target.value]);
    setAddress({
      ...address,city:dataLocal[e.target.value].province_name
    })
    setFlag(!flag);
  }
  const handleChangeDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrict(dataDistrict[e.target.value]);
    setAddress({
      ...address,district:dataDistrict[e.target.value].district_name
    })
    setFlag(!flag);
  }
  
  const handleChageStreet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress({
      ...address,street:e.target.value
    })
    setCompany({
      ...company,company_address:address
    })
    setFlag(!flag);
  }
  const addCompany = async () => {
    if (
      company.company_email == "" ||
      company.company_name == "" ||
      company.company_password == ""
    ) {
      alert("Điền đầy đủ thông tin");
      return;
    }
    if (company.company_password != checkPassword) {
      alert("Mật khẩu nhập lại không đúng");
      return;
    }
    try {
      const res = await publicAxios.post(
        "/api/v1/company/register",
        company
      );
      alert(res.data.message);
      link("/loginCompany");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataLocal);
  
  
  return (
    <div className="flex  text-gray-500">
      <div className="w-[60%] h-[870px] pt-[50px]">
        <div className="w-[800px] m-auto ">
          <h1 className="text-[30px] font-bold text-[#00B150] mb-10">
            Chào mừng bạn đến với TopCV
          </h1>
          <p className="mb-10">
            Xây dựng một cộng đồng doanh nghiệp cùng TopCV
          </p>
          <label htmlFor="" className="m-[10px]">
            Tên công ty
          </label>
          <br />
          <input
            type="text"
            name="company_name"
            onChange={(e) =>
              setCompany({ ...company, company_name: e.target.value })
            }
            className="m-[10px] w-[80%] h-[50px] p-3"
            placeholder="Nhập tên công ty"
          />
          <br />
          <label htmlFor="">Địa chỉ công ty</label>
          <br />
          <input
            type="text"
            name="company_address"
            onChange={handelChangeHome}
            className="m-[10px] w-[80%] h-[50px] p-3"
            placeholder="Địa chỉ cụ thể"
          />{" "}
          <br />
          <select
           className="w-[200px] h-[40px] m-[10px] "
            onChange={handelChangeCity}
          >
            <option value="">Chọn tỉnh thành phố</option>
            {dataLocal?.map((item: any, index: number) => (
              <option key={index} value={index}>{item.province_name}</option>
            ))}
          </select>

          <select   className="w-[200px] h-[40px] m-[10px] "onChange={handleChangeDistrict}>
            <option value="">Chọn Quận Huyện</option>
            {dataDistrict?.map((item: any,index:number) => (
              <option key={index} value={index}>{item.district_name}</option>
            ))}
          </select>
          <select   className="w-[200px] h-[40px] m-[10px] " onChange={handleChageStreet}>
            <option value="">Chọn phường,xã</option>
            {datastreet?.map((item: any,index:number) => (
              <option key={index} value={item.ward_name}>{item.ward_name}</option>
            ))}
          </select><br />
          <label htmlFor="" className="m-[10px]">
            Email
          </label>
          <br />
          <input
            type="email"
            onChange={(e) =>
              setCompany({ ...company, company_email: e.target.value })
            }
            name="company_email"
            className="m-[10px] w-[80%] h-[50px] p-3"
            placeholder=" Nhập Email"
          />
          <br />
          <label htmlFor="" className="m-[10px]">
            Mật Khẩu
          </label>
          <input
            type="password"
            onChange={(e) =>
              setCompany({ ...company, company_password: e.target.value })
            }
            name="company_password"
            className="m-[10px] w-[200px] h-[50px] p-3"
            placeholder=" Nhập Mật Khẩu"
          />
          <label htmlFor="" className="m-[10px]">
            Nhập Lại Mật Khẩu
          </label>
          <input
            type="password"
            className="m-[10px] w-[200px] h-[50px] p-3"
            onChange={(e) => setCheckPassword(e.target.value)}
            placeholder=" Nhap Lại Mật Khẩu"
          />
          <br />
          {checkPassword === company.company_password ? (
            <div></div>
          ) : (
            <p className="text-red-500">Mật Khẩu Không Đồng Nhất</p>
          )}
          <input type="checkbox" className="m-[10px]" checked={true} />
          <label htmlFor="" className="m-[10px]">
            Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật
            của TopCV
          </label>
          <br />
          <button
            onClick={addCompany}
            className="bg-[#00B150] text-white w-[90%] h-[40px] m-[25px] rounded-[5px]"
          >
            Đăng Ký
          </button>
         
        </div>
      </div>
      <div
        className='w-[40%]  bg-cover
         bg-[url("https://firebasestorage.googleapis.com/v0/b/prj-duykhanh.appspot.com/o/images%2FHi%CC%80nh%20a%CC%89nh%2031-01-2024%20lu%CC%81c%2016.31.jpeg?alt=media&token=a92dc155-943d-4e52-ac02-8b5727a39edb")]'
      >
        <div
          className="cursor-pointer w-[250px] h-[70px] mt-[430px] ml-10"
          onClick={() => {
            window.location.href = "/";
          }}
        ></div>
      </div>
    </div>
  );
}
