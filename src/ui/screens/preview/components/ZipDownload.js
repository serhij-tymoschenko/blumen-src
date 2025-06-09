import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import {Button} from "@mui/material";
import {downloadZip} from "../../../../utils/ZipHelper";

const ZipDownload = ({snooItems, showcase, hex}) => {
    const onClick = async() => {
        await downloadZip(snooItems, showcase, hex);
    }

    return (
        <Button
            variant="outlined"
            onClick={onClick}
            style={{
                minWidth: 0,
                width: 30,
                height: 30,
                padding: 0,
                borderRadius: '50%',
                border: '1px solid #ccc',
            }}
        >
            <DownloadIcon fontSize="small"/>
        </Button>
    );
};

export default ZipDownload;