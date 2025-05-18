import React from "react";
import JSZip from "jszip";
import {toSvgFile} from "../../../utils/helpers/SvgHelper";
import {combineHorizontally} from "../../../utils/combiner/Combiner";
import DownloadIcon from '@mui/icons-material/Download';
import {Button} from "@mui/material";
import {names} from "../../../utils/Constants";

const addFromUrl = async (zip, url, filename) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await response.blob();
    zip.file(filename, blob);
}

const ZipDownload = ({snooItems, showcase, hex}) => {


    const downloadZip = async () => {
        const zip = new JSZip();

        for (let i = 0; i < snooItems.length; i++) {
            await addFromUrl(zip, toSvgFile(snooItems[i]), `${names[i]}.svg`)
        }

        const firstRowSvg = combineHorizontally(snooItems.slice(0, 5), 552, 736);
        const secondRowSvg = combineHorizontally(snooItems.slice(5), 552, 736);

        await addFromUrl(zip, toSvgFile(hex), "Hex.svg")
        await addFromUrl(zip, toSvgFile(showcase), "Showcase.svg")
        await addFromUrl(zip, toSvgFile(firstRowSvg), "First row.svg")
        await addFromUrl(zip, toSvgFile(secondRowSvg), "Second row.svg")

        const content = await zip.generateAsync({type: "blob"});

        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = "archive.zip";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="outlined"
            onClick={downloadZip}
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