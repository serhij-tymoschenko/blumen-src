import React from 'react';
import { Box } from '@mui/material';

const Centered = ({ children }) => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </Box>
    );
};

export default Centered;