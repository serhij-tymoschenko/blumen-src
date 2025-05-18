import React from 'react';
import {Stack, Link, Typography} from '@mui/material';

const Bottom = () => {
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
            width={'100vw'}
        >
            <Typography variant="h5">
                <Link href="https://buymeacoffee.com/tymoschenko" target="_blank" rel="noopener">
                    Buy me a coffee
                </Link>
            </Typography>
        </Stack>
    );
};

export default Bottom;
