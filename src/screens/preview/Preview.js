import PreviewGrid from "./components/PreviewGrid";
import {Paper, Typography} from "@mui/material";


import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import Showcase from "./components/Showcase";
import ColorSection from "./components/ColorSection";
import {objectUrlToBlob} from "../../utils/helpers/ObjectHelper";
import Centered from "../../stacks/Centered";
import VStack from "../../stacks/VStack";
import HStack from "../../stacks/HStack";

const Preview = ({setOpenSnackbar, setSnackbarMessage}) => {
    const [bodyColors, setBodyColors] = useState('#00FF00')
    const [hairColors, setHairColors] = useState('#0000FF')
    const [eyesColors, setEyesColors] = useState('#FFFF00')

    const [items, setItems] = useState([]);

    const getImageData = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);

            img.onload = async () => {
                let imgWidth, imgHeight;

                if (img.width === 552) {
                    imgWidth = 138;
                    imgHeight = 184;
                } else {
                    imgWidth = 95;
                    imgHeight = 150;
                }


                const readBlob = (blob, isSvg) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        if (isSvg) {
                            reader.readAsText(blob);
                        } else {
                            reader.readAsDataURL(blob);
                        }
                    });
                };

// Usage

                const blob = await objectUrlToBlob(objectUrl);
                const isSvg = blob.type === 'image/svg+xml'; // Check if the image is SVG
                const localSrc = await readBlob(blob, isSvg);

                resolve({
                    src: localSrc,
                    traitWidth: imgWidth,
                    traitHeight: imgHeight,
                });
            };

            img.src = objectUrl;
        });
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        // Wait for all images to be processed
        const newItems = await Promise.all(
            acceptedFiles.map((file) => getImageData(file))
        );

        setItems(newItems);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*': []},
        multiple: true,
    });

    return (
        <Centered>
            <VStack>
                <Paper
                    {...getRootProps()}
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        border: '2px dashed #aaa',
                        padding: 4,
                        textAlign: 'center',
                        backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa',
                        cursor: 'pointer',
                        mb: 4, // space below
                    }}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <Typography>Drop the images here ...</Typography>
                    ) : (
                        <Typography>Drag and drop images here, or click to select files</Typography>
                    )}
                </Paper>

                <HStack>
                    <Showcase items={items} eyesColor={eyesColors} bodyColor={bodyColors} hairColor={hairColors}/>
                    <PreviewGrid items={items} setItems={setItems} bodyColor={bodyColors} hairColor={hairColors}
                                 eyesColor={eyesColors}/>
                    <ColorSection bodyColor={bodyColors} setBodyColor={setBodyColors} hairColor={hairColors}
                                  setHairColor={setHairColors} eyesColor={eyesColors} setEyesColor={setEyesColors}/>
                </HStack>
            </VStack>
        </Centered>
    )
}

export default Preview;