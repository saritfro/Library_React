
// רכיב מ MUI
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        כניסה למערכת
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: function(event) {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
            }
          },
        }}
      >
        <DialogTitle>כניסה למערכת</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            required
            id="name"
            name="UserName"
            label="שם משתמש"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            id="name"
            name="Password"
            label="ססמה"
            type= 'password'
            fullWidth
            variant="standard"
          />        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button type="submit">אישור</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  }
