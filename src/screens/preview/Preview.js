import PreviewGrid from "./components/PreviewGrid";
import {Paper, Stack, Typography} from "@mui/material";


import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import Showcase from "./components/Showcase";
import ColorSection from "./components/ColorSection";
import {objectUrlToBlob} from "../../utils/helpers/ObjectHelper";
import Centered from "../../stacks/Centered";
import VStack from "../../stacks/VStack";

const Preview = ({setOpenSnackbar, setSnackbarMessage}) => {
    const [bodyColors, setBodyColors] = useState('#00FF00')
    const [hairColors, setHairColors] = useState('#0000FF')
    const [eyesColors, setEyesColors] = useState('#FFFF00')

    const [items, setItems] = useState(new Array(10).fill(""));

    const getImageData = async (file) => {
        const objectUrl = URL.createObjectURL(file);

        // Convert object URL to Blob (you must define this function correctly)
        const blob = await objectUrlToBlob(objectUrl);
        const isSvg = blob.type === 'image/svg+xml';

        // Read the blob content
        const localSrc = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;

            if (isSvg) {
                reader.readAsText(blob); // for inline SVG content
            } else {
                reader.readAsDataURL(blob); // for image preview
            }
        });

        console.log(localSrc)
        return localSrc; // either raw SVG text or data:image/... base64
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


                <Stack
                    direction="row"
                    spacing={2}
                    sx={{height: '100%'}}
                    alignItems={'flex-end'}
                >
                    <Showcase items={items} eyesColor={eyesColors} bodyColor={bodyColors} hairColor={hairColors}/>
                    <PreviewGrid items={items} setItems={setItems} bodyColor={bodyColors} hairColor={hairColors}
                                 eyesColor={eyesColors}/>
                </Stack>
            </VStack>
        </Centered>
    )
}

// <VStack>
//     <ColorSection bodyColor={bodyColors} setBodyColor={setBodyColors} hairColor={hairColors}
//                   setHairColor={setHairColors} eyesColor={eyesColors} setEyesColor={setEyesColors}/>
// </VStack>

export default Preview;