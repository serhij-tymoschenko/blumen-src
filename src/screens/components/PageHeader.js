import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import ButtonType from "../../data/models/ButtonType";

const PageHeader = ({title, activeButton, onButtonClick}) => {
    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Box>
                    <Button
                        variant={
                            activeButton === ButtonType.COMBINE
                                ? 'contained'
                                : 'outlined'
                        }
                        color="primary"
                        onClick={() => onButtonClick(ButtonType.COMBINE)}
                        sx={{mr: 1}}
                    >
                        Combine
                    </Button>
                    <Button
                        variant={
                            activeButton === ButtonType.PREVIEW
                                ? 'contained'
                                : 'outlined'
                        }
                        color="primary"
                        onClick={() => onButtonClick(ButtonType.PREVIEW)}
                    >
                        Preview
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default PageHeader;
