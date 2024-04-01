import axios from "axios";
import React, { useEffect, useState } from "react";

export default function IntroCompany() {
  const [datalocal, setDataLocal] = useState([]);
  const [flag, setFlag] = useState(false);

  async function getApi() {
    try {
      const result = await axios.get("https://vapi.vnappmob.com/api/province/");
      setDataLocal(result.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getApi();
  }, []);
  return (
    <div className="bg-[url(https://static.topcv.vn/v4/image/welcome/bg_header.webp)] bg-cover w-[100%] h-[500px] flex justify-evenly  ">
      <div className="w-[40%] pt-5">
        <div className="text-white ">
          <p className="text-xl font-[600]">
            Công nghệ AI dự đoán, Tự động hóa, Chuyển đổi số
          </p>
          <p>
            <span className="text-[#00B150] font-[600] ml-2">
              Định hướng đề xuất ứng viên 
            </span>{" "}
            dành cho bạn.
          </p>
        </div>
        <div className="bg-white h-[50px] m-3 rounded-[10px]  ">
          <i className="fa-solid fa-magnifying-glass text-[25px] text-gray-500 m-[10px]"></i>

          <input className="h-[30px] w-[250px] ml-[20px] outline-none " type="text" placeholder="Ngành cần tìm ứng viên" />

          <i className="fa-solid fa-location-dot text-[25px] text-gray-500"></i>

          <select className="ml-[10px] outline-none ">
            <option>Tất Cả Địa Diểm</option>
            {datalocal.map((item: any) => {
              return (
                <option value={item.province_id}>{item.province_name}</option>
              );
            })}
          </select>
          <button className="ml-[10px] w-[80px] h-[30px] rounded-[5px] bg-[#00B150] text-white">Tìm Kiếm</button>
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
  );
}
