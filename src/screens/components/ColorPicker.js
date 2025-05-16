import React, {useState} from 'react';
import {Box, Button, Popover} from '@mui/material';
import {ChromePicker} from 'react-color';

const ColorPicker = ({color, setColor}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenPicker = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePicker = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box mt={2} display="flex" alignItems="center">
            <Button
                variant="outlined"
                onClick={handleOpenPicker}
                style={{
                    minWidth: 0,
                    width: 30,
                    height: 30,
                    padding: 0,
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '1px solid #ccc'
                }}
            />
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePicker}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <ChromePicker
                    color={color}
                    onChange={(updatedColor) => setColor(updatedColor.hex)}
                />
            </Popover>
        </Box>
    );
};

export default ColorPicker;