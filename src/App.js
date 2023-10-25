import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import WithoutNav from './components/adminDashboard/withoutNav/WithoutNav';
import { Login } from './pages/login/Login';
import WithNav from './components/adminDashboard/withNav/WithNav';
import Dashboard from './components/adminDashboard/dashboard/Dashboard';
import Orders from './components/adminDashboard/orders/Orders';
import Feedback from './components/adminDashboard/feedback/Feedback';
import CageManage from './components/adminDashboard/cageManage/CageManage';
import CustomManage from './components/adminDashboard/customManage/CustomManage';
import UpdateCage from './components/adminDashboard/cageManage/UpdateCage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WithNav />} >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/cage' element={<CageManage />} />
          <Route path='/custom' element={<CustomManage />} />
          <Route path='/update/:id' element={<UpdateCage />} />
        </Route>
        <Route element={<WithoutNav />} >
          <Route path="/" element={<Login />} />
        </Route>


      </Routes>
    </div>
  );
}

export default App;
