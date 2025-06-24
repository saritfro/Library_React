import logo from './logo.svg';
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import UserDashboard from './Pages/UserDashBoard.jsx';
import Loans from './Pages/Loans';
import Layout from './Layout.jsx';
import UserLayout from './UserLayout.jsx';
import UserReturn from './Pages/UserReturn.jsx';
import SettingForm from './Comp/Settings/SettingForm.jsx';
import EntryLayout from './entryLayout.jsx'
import Form from './Comp/TryComp/Form.jsx';
import FormManager from './Comp/TryComp/FormManager.jsx';
import UsersDashBoard from './Pages/UsersDashBoard.jsx'
import NotFoundPage from './Comp/NotFoundPage.jsx'; 
function App() {
  return (
    <div className="App">

      <Routes>
      <Route path="/" element={<EntryLayout><Form /></EntryLayout>} />{/* V */}
      <Route path="/Users" element={<EntryLayout><UsersDashBoard /></EntryLayout>} />

        <Route path="/UserLoans" element={<UserLayout><UserDashboard /></UserLayout>} />

        <Route path="/UserReturn" element={<UserLayout><UserReturn /></UserLayout>} />
        <Route path="/SettingForm" element={<Layout><SettingForm /></Layout>} />

        <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/loans" element={<EntryLayout><Loans /></EntryLayout>} />

        <Route path="/FormManager" element={<FormManager/>} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;
