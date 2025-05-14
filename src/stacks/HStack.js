import React from 'react';
import { Box } from '@mui/material';

const HStack = ({ gap = 4, children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: gap,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {children}
        </Box>
    );
};

export default HStack;