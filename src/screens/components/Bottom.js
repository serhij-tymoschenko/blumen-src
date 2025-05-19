import React from 'react';
import {Link, Stack} from '@mui/material';
import bmc from "../../bmc-yellow-button.png";

const Bottom = () => {
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
            width={'100vw'}
        >
            <Link href="https://buymeacoffee.com/tymoschenko" target="_blank" rel="noopener">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={bmc} width={182} height={51}/>
            </Link>
        </Stack>
    );
};

export default Bottom;
