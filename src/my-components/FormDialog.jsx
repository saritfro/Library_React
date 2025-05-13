import React from 'react';
// import { useHistory } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ButtonComponent from './Button';
import LoginForm from './LoginForm';
import manage from './manage'
import '../css/FormDialog.css'

export default function FormDialog() {
  // const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget; // קבל את הטופס
    if (form.checkValidity()) { // בדוק אם הטופס תקף
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const email = formJson.UserName; // או formJson.Password, לפי הצורך
      console.log(email);
      handleClose(); // סגירת ה-DIALOG לאחר שליחת הטופס
      // useHistory.push('/manage'); // מעבר לקומפוננטה Layout
    } else {
      form.reportValidity(); // הצג הודעת שגיאה אם הטופס אינו תקף
    }
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // event.preventDefault();
  //     const formData = new FormData(event.Target);
  //     const formJson = Object.fromEntries(formData.entries());
  //     const email = formJson.UserName; // או formJson.Password, לפי הצורך
  //     console.log(email);
  //     handleClose();
  //   };
  return (
    <div className="background">
      <React.Fragment>
        <ButtonComponent onClick={handleClickOpen} />
        <Dialog open={open} onClose={handleClose}
          PaperProps={{
            style: { width: '27vw' } // הגדר רוחב מותאם אישית
          }}
        >
          <DialogTitle>כניסה למערכת</DialogTitle>
          <DialogContent>

            <LoginForm onSubmit={handleSubmit} handleClose={handleClose} />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>ביטול</Button> */}
            {/* {<Button type="submit" form="login-form" onClick={handleSubmit}>אישור</Button> } */}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
