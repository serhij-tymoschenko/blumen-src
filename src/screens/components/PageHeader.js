import React from 'react';
import {FormControlLabel, Stack, Switch, Typography} from '@mui/material';
import ButtonType from "../../data/models/ButtonType";

const PageHeader = ({activeButton, onButtonClick}) => {
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            width={'100vw'}
        >
            <Typography variant="caption">
                Combine
            </Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={activeButton === ButtonType.PREVIEW}
                        onChange={() =>
                            onButtonClick(
                                activeButton === ButtonType.COMBINE
                                    ? ButtonType.PREVIEW
                                    : ButtonType.COMBINE
                            )
                        }
                        color="primary"
                    />
                }
            />
            <Typography variant="caption">
                Preview
            </Typography>
        </Stack>
    );
};

export default PageHeader;
