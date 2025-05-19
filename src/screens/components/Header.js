import React from 'react';
import {FormControlLabel, Stack, Switch, Typography} from '@mui/material';
import ScreenType from "../../data/models/ScreenType";

const Header = ({activeButton, onButtonClick}) => {
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            width={'100vw'}
        >
            <Typography variant="h5">
                Combine
            </Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={activeButton === ScreenType.PREVIEW}
                        onChange={() =>
                            onButtonClick(
                                activeButton === ScreenType.COMBINE
                                    ? ScreenType.PREVIEW
                                    : ScreenType.COMBINE
                            )
                        }
                        color="primary"
                    />
                }
            />
            <Typography variant="h5">
                Preview
            </Typography>
        </Stack>
    );
};

export default Header;
