import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import UserDashboard from './Pages/UserDashBoard.jsx';
import Loans from './Pages/Loans';
import Layout from './Layout.jsx';
import UserLayout from './UserLayout.jsx';
import UserReturn from './UserReturn.jsx'; // ודא שייבאת את הרכיב נכון

function App() {
  return (
    <div className="App">
      <button>
        <p style={{ color: "rgba(30, 31, 32, 0.68)" }}>ניהול ספריה</p>
      </button>

      <Link
        to="/UserLoans"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        משתמש
      </Link>

      <Routes>
        {/* משתמש */}
        <Route path="/UserLoans" element={<UserLayout><UserDashboard /></UserLayout>} />
        <Route path="/UserReturn" element={<UserLayout><UserReturn /></UserLayout>} />

        {/* דף הבית ותחומים נוספים */}
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/loans" element={<Layout><Loans/></Layout>} />
      </Routes>
    </div>
  );
}

export default App;
