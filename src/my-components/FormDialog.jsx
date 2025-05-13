import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonComponent from './Button';
import LoginForm from './LoginForm';
import '../css/FormDialog.css'

export default function FormDialog() {

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
    } else {
      form.reportValidity(); // הצג הודעת שגיאה אם הטופס אינו תקף
    }
  };

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
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
