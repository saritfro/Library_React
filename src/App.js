import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import UserDashboard from './Pages/UserDashBoard.jsx';
import Loans from './Pages/Loans';
import Layout from './Layout.jsx';
import UserLayout from './UserLayout.jsx';
import UserReturn from './Pages/UserReturn.jsx'; // ודא שייבאת את הרכיב נכון
import SettingForm from './Comp/Settings/SettingForm.jsx';
function App() {
  return (
    <div className="App">
     

      <Link
        to="/UserLoans"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        משתמש
      </Link>
        <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        ניהול ספריה
      </Link>
 <Link
        to="/SettingForm"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        הגדרות
      </Link>
      <Routes>
        {/* משתמש */}
        <Route path="/UserLoans" element={<UserLayout><UserDashboard /></UserLayout>} />
        <Route path="/UserReturn" element={<UserLayout><UserReturn /></UserLayout>} />
        <Route path="/SettingForm" element={<UserLayout><SettingForm /></UserLayout>} />

        {/* דף הבית ותחומים נוספים */}
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/loans" element={<Layout><Loans/></Layout>} />
      </Routes>
    </div>
  );
}

export default App;
