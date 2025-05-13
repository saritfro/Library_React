import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import useHistory from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// const LoginForm = ({ onSubmit, handleClose }) => {
//   return (
//     <form onSubmit={onSubmit}>
//       <TextField
//         autoFocus
//         required
//         id="UserName"
//         name="UserName"
//         label="שם משתמש"
//         type="text"
//         fullWidth
//         variant="standard"
//       />
//       <TextField
//         required
//         id="Password"
//         name="Password"
//         label="ססמה"
//         type='password'
//         fullWidth
//         variant="standard"
//       />
//       <Button onClick={handleClose}>ביטול</Button>
//       <Link to='/dashboard'>
//         <Button type="submit">אישור</Button> {/* כפתור לשליחת הטופס */}
//       </Link>
//     </form>
//   );
// };

const LoginForm = ({ handleClose }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // השתמש ב-useNavigate במקום useHistory

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userName === 'מנהלת' && password === '1234') {
      navigate('/dashboard'); // אם הפרטים נכונים
    } 
    else
    if(userName==="ספרנית"&& password==='5678'){
      navigate('/librarian')
    }
    else {
      navigate('/unauthorized'); // אם הפרטים לא נכונים
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        autoFocus
        required
        id="UserName"
        name="UserName"
        label="שם משתמש"
        type="text"
        fullWidth
        variant="standard"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        required
        id="Password"
        name="Password"
        label="ססמה"
        type='password'
        fullWidth
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleClose}>ביטול</Button>
      <Button type="submit">אישור</Button> {/* כפתור לשליחת הטופס */}
    </form>
  );
};

export default LoginForm;