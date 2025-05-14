import React, { useState } from 'react';
import { Box, Button, Popover, Typography } from '@mui/material';
import { ChromePicker } from 'react-color';

const ColorPicker = () => {
    const [color, setColor] = useState('#2196f3');
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
            <Typography variant="body1" style={{ marginRight: 10 }}>
                Pick Color:
            </Typography>
            <Button
                variant="outlined"
                onClick={handleOpenPicker}
                style={{
                    minWidth: 0,
                    width: 40,
                    height: 40,
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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