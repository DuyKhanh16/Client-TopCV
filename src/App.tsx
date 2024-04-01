import React from 'react'
import RegisterUser from './componets/register/RegisterUser'
import { Route,  Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import RegisterCompany from './componets/register/RegisterCompany'
import Register from './componets/register/Register'
import LoginUser from './componets/login/LoginUser'
import LonginCompany from './componets/login/LonginCompany'
import Login from './componets/login/Login'
import Home from './componets/Home/Home'
import Cv from './componets/CV/Cv'
import NewCv from './componets/NewCV/NewCv'
import CvDetail from './componets/CvDetail'
import InforUser from './componets/InfoUser/InforUser'
import HomeCompany from './Company/HomeCompany'
import JobCompany from './Company/JobCompany'
import Job from './Company/Job'
import JobUserReview from './componets/JobUserReview'
import VewCompany from './componets/VewCompany'
import ViewInfo from './Company/ViewInfo'
import CompanyPublic from './componets/CompanyPublic'
import ApplyPending from './Company/ApplyPending'
export default function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/register' element={<Register />}/>
    <Route path='/registerUser' element={<RegisterUser />} />
    <Route path='/registerCompany' element={<RegisterCompany />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/loginUser' element={<LoginUser />}  />
    <Route path='/loginCompany' element={<LonginCompany />}></Route>
    <Route path='/cv' element={<Cv />}></Route>
    <Route path='/newcv' element={<NewCv />}></Route>
    <Route path='/cvdetail/:id' element={<CvDetail /> }></Route>
    <Route path='/vewcompany/:id' element={<VewCompany /> }></Route>
    <Route path='/inforuser' element={<InforUser /> }></Route>
    <Route path='/homeCompany' element={<HomeCompany /> }></Route>
    <Route path='/jobcompany' element={<JobCompany /> }></Route>
    <Route path='/job' element={<Job /> }></Route>
    <Route path='/jobreview/:id' element={<JobUserReview /> }></Route>
    <Route path='/viewinfo' element={<ViewInfo /> }></Route>
    <Route path='/company-public' element={<CompanyPublic /> }></Route>
    <Route path='/apply-pending' element={<ApplyPending /> }></Route>
    </Routes>
    </>
  )
}
