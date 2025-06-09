import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button, MenuItem, Menu} from "@mui/material";
import React, {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from '@mui/icons-material/Visibility';

const DropMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const onMenuClose = () => {
        setAnchorEl(null);
    };

    return <>
        <Button
            id="drop-button"
            variant="outlined"
            aria-controls={open ? 'drop-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={onMenuOpen}
            style={{
                minWidth: 0,
                width: 24,
                height: 24,
                padding: 0,
                borderRadius: '50%',
                border: '1px solid #ccc',
            }}
        >
            <MoreVertIcon fontSize="small"/>
        </Button>

        <Menu
            id="drop-menu"
            aria-labelledby="drop-button"
            anchorEl={anchorEl}
            open={open}
            onClose={onMenuClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem onClick={onMenuClose}>
                <Button
                    variant="outlined"
                    style={{
                        minWidth: 0,
                        width: 24,
                        height: 24,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                    }}
                >
                    <AddIcon fontSize="small"/>
                </Button>
            </MenuItem>

            <MenuItem onClick={onMenuClose}>
                <Button
                    variant="outlined"
                    style={{
                        minWidth: 0,
                        width: 24,
                        height: 24,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                    }}
                >
                    <RemoveIcon fontSize="small"/>
                </Button>
            </MenuItem>

            <MenuItem onClick={onMenuClose}>
                <Button
                    variant="outlined"
                    style={{
                        minWidth: 0,
                        width: 24,
                        height: 24,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                    }}
                >
                    <VisibilityOffIcon fontSize="small"/>
                </Button>
            </MenuItem>
        </Menu>
    </>
}

export default DropMenu;