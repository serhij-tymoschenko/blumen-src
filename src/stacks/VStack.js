import React from 'react';
import {Box} from '@mui/material';

const VStack = ({gap = 2, children}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center',
                gap: gap
            }}
        >
            {children}
        </Box>
    );
};

export default VStack;