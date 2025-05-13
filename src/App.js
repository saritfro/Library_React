import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import Loans from './Pages/Loans';
import FormDialog from './my-components/FormDialog.jsx'

import Unauthorized from './my-components/Unauthorized.jsx'
import Librarian from './my-components/Librariana.jsx'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
          <Route path='/' element={<FormDialog/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/loans' element={<Loans/>}/>
          <Route path='/unauthorized' element={<Unauthorized/>}/>
          <Route path='/librarian' element={<Librarian/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


