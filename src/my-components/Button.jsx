import React from 'react';
import Button from '@mui/material/Button';

const ButtonComponent = ({ onClick }) => {
  return (
    <Button variant="outlined" onClick={onClick}>
      כניסה למערכת
    </Button>
  );
};

export default ButtonComponent;