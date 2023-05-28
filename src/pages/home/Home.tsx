import { Box, Typography } from '@mui/material';
import React from 'react'

export default function Home() {
  return (
    <>
    <Box
        sx={{
            backgroundColor: '#FF0'
        }}
    >    
    <Typography
        sx={{
            fontSize: '200px',
            justifyContent: 'center',
            alignItems: 'center'
        }}    
    >
        Sup
    </Typography>
    </Box>
    </>
  );
}
