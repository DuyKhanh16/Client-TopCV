import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import Fotter from './Fotter/Fotter'
import publicAxios from '../axios.config/publicAxios';

export default function CompanyPublic() {
    const [listCompany, setListCompany] = useState<any>([]);
    const [search, setSearch] = useState<string>("");
    const [flag, setFlag] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    async function getAllCompany() {
      try {
        const res: any = await publicAxios.get(`/api/v1/company/list?limit=${count}`);
        setListCompany(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
        getAllCompany()
    },[flag])
    const getCompanySearch = async ()=>{
        if (search=="") {
            return;
        }
        const newlist=listCompany.filter((item:any)=>{
            return item.company_name.toLowerCase().includes(search.toLowerCase())
        })
        setListCompany(newlist)
    }

    const setCountUp = ()=>{
        if (listCompany.length<12) {
            return
        }
        setCount(count+1)
        setFlag(!flag)
    }

    const setCountDown = ()=>{
        if (count===0) {
            return
        }
        setCount(count-1)
        setFlag(!flag)
    }
  return (
    <div>
        <Header></Header>
        <div className='w-[100%] h-[330px] bg-[#e1fbed] flex justify-between p-4'>
        <div className='p-5'>
            <p className='text-[28px] text-green-500 ml-[20px]'>Khám phá 100.000+ công ty nổi bật</p>
            <p className='ml-[20px]'>Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn</p>
            <div>
            <div className="bg-white h-[50px] m-3 rounded-[10px]  ">
          <i className="fa-solid fa-magnifying-glass text-[25px] text-gray-500 m-[10px]"></i>

          <input className="h-[30px] w-[250px] ml-[20px] outline-none " type="text" placeholder="Nhập tên công ty"  onChange={(e) => setSearch(e.target.value)} />

          <i className="fa-solid fa-location-dot text-[25px] text-gray-500"></i>

          <select  className="ml-[10px] outline-none ">
            <option value="">Tất cả ngành nghề</option>
            
          </select>
          <button className="ml-[10px] w-[80px] h-[30px] rounded-[5px] bg-[#00B150] text-white" onClick={getCompanySearch}>Tìm Kiếm</button>
        </div>
            </div>
        </div>
        <div>
            <img width={260}  className="mr-[100px]" src="https://static.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0" alt="" />
        </div>
        </div>
        <h3 className='font-[400] text-center m-3'>Danh sách các công ty</h3>
        <div className='w-[1300px] m-auto flex justify-evenly flex-wrap'>
        {listCompany?.map((item: any,index:number) => (
            
                <div className='w-[425px] rounded-lg shadow-md  hover:cursor-pointer'>
                    <img className='w-[100%] h-[150px] rounded-t-lg ' src={item.company_bacgroundPhoto} alt="" />
                    <div className='flex justify-between p-3'>
                        <img className='rounded-lg mt-[-60px] w-[80px] h-[80px]' width={100} src={item.company_avata} alt="" />
                    </div>
                    <p className='text-center text-lg font-[600]'>{item.company_name}</p>
                    <textarea value={item.company_description} cols="45" rows="5" className='outline-none ml-5 text-gray-500 font-[300]'></textarea>
                </div>
            
        ))}
        </div >
        <div className='flex justify-evenly w-[170px] m-auto mt-4'>
            <p className='w-[32px] h-[32px] bg-gray-300 rounded-[50%] text-center pt-[3px] hover:cursor-pointer' onClick={() => setCount(0)}> &lt;&lt;</p>
            <p className='w-[32px] h-[32px] bg-gray-300 rounded-[50%] text-center pt-[3px] hover:cursor-pointer' onClick={setCountDown}>&lt;</p>
            ...
            <p className='w-[32px] h-[32px] bg-gray-300 rounded-[50%] text-center pt-[3px] hover:cursor-pointer' onClick={setCountUp}>&gt;</p>
            <p className='w-[32px] h-[32px] bg-gray-300 rounded-[50%] text-center pt-[3px] hover:cursor-not-allowed'>&gt;&gt;</p>
        </div>
     
        <Fotter></Fotter>
    </div>
  )
}
