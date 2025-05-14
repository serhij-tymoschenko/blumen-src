import React from 'react';
import {Box} from '@mui/material';

const MatchParent = ({width = '100%', height = '100%', children}) => {
    return (
        <Box sx={{width: width, height: height, alignItems: 'center', justifyContent: 'center'}}>
            {children}
        </Box>
    );
};

export default MatchParent;