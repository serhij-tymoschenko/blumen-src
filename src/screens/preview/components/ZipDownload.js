import React from "react";
import JSZip from "jszip";
import {toSvgFile} from "../../../utils/helpers/SvgHelper";
import {combineTogether, combineHorizontally} from "../../../utils/combiner/Combiner";
import DownloadIcon from '@mui/icons-material/Download';
import {Button} from "@mui/material";
import {names} from "../../../utils/Constants";
import {snooSrc} from "../../../utils/SvgSrc";

const addFromUrl = async (zip, url, filename) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await response.blob();
    zip.file(filename, blob);
}

const ZipDownload = ({items, showcase, hex}) => {


    const downloadZip = async () => {
        let localItems = [];

        const zip = new JSZip();

        for (let i = 0; i < items.length; i++) {
            const top = (i !== 9 && i !== 6) ? items[i] : snooSrc
            const bottom = (i !== 9 && i !== 6) ? snooSrc : items[i]
            const svg = combineTogether([bottom, top], 552, 736, (i === 9) ? 0 : null)
            localItems.push(svg)

            await addFromUrl(zip, toSvgFile(svg), `${names[i]}.svg`)
        }

        const firstRowSvg = combineHorizontally(localItems.slice(0, 5), 552, 736);
        const secondRowSvg = combineHorizontally(localItems.slice(5), 552, 736);

        await addFromUrl(zip, toSvgFile(hex), "Hex.svg")
        await addFromUrl(zip, toSvgFile(showcase), "Showcase.svg")
        await addFromUrl(zip, toSvgFile(firstRowSvg), "First row.svg")
        await addFromUrl(zip, toSvgFile(secondRowSvg), "Second row.svg")

        const content = await zip.generateAsync({ type: "blob" });

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
            <DownloadIcon fontSize="small" />
        </Button>
    );
};

export default ZipDownload;