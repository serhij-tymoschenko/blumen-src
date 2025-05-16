import React from 'react';
import {Stack} from '@mui/material';

const HStack = ({spacing = 2, children}) => {
    return (
        <Stack spacing={spacing} direction="row">
            {children}
        </Stack>
    );
};

export default HStack;