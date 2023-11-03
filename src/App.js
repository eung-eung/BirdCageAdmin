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
import Logout from './components/logout/Logout';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
// import CageList from './components/adminDashboard/cageManage/test';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WithNav />} >
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
          <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute> } />
          <Route path='/feedback' element={<ProtectedRoute><Feedback /></ProtectedRoute> } />
          <Route path='/cage' element={<ProtectedRoute><CageManage /></ProtectedRoute> } />
          <Route path='/custom' element={<ProtectedRoute><CustomManage /></ProtectedRoute> } />
          <Route path='/update/:id' element={<ProtectedRoute><UpdateCage /></ProtectedRoute> } />
          <Route path='/logout' element={<ProtectedRoute><Logout /></ProtectedRoute> } />
          {/* <Route path='/test' element={<CageList />} /> */}
          {/* <Route path='/logout' element={<Logout />} /> */}
        </Route>
        <Route element={<WithoutNav />} >
          <Route path="/" element={<Login />} />
        </Route>


      </Routes>
    </div>
  );
}

export default App;
