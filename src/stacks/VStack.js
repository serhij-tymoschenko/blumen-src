import React from 'react';
import {Box, Stack} from '@mui/material';

const VStack = ({spacing = 2, children}) => {
    return (
        <Stack spacing={spacing} direction="column">
            {children}
        </Stack>
    );
};

export default VStack;