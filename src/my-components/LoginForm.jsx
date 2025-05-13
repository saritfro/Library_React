import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleClose }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userName === 'מנהלת' && password === '1234') {
      navigate('/dashboard'); // אם הפרטים נכונים
    } 
    else
    if(userName==="ספרנית"&& password==='5678'){
      navigate('/librarian')// אם הפרטים נכונים
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