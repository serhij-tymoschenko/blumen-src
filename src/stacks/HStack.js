import React from 'react';
import { Box } from '@mui/material';

const HStack = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {children}
        </Box>
    );
};

export default HStack;