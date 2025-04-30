import logo from './logo.svg';
import './App.css';
import { Routes, Route,BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import Loans from './Pages/Loans';
import Layout from './Layout.jsx';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
function App() {
  return (
    <div className="App">
 

 <Router>
  <PrimeReactProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/loans" element={<Loans />} />
          </Routes>
        </Layout>
 </PrimeReactProvider>
      </Router>


    </div>
  );
}

export default App;
