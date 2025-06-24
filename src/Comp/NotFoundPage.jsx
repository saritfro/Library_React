import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Container style={{ textAlign: 'center', marginTop: '100px' }}>
            <Typography variant="h1" component="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Go Back Home
            </Button>
        </Container>
    );
};

export default NotFoundPage;
