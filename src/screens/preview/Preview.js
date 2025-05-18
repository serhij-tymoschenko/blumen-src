import PreviewGrid from "./components/PreviewGrid";
import {Box, Paper, Stack, Typography} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import Showcase from "./components/Showcase";
import ColorSection from "./components/ColorSection";
import Centered from "../../stacks/Centered";
import ZipDownload from "./components/ZipDownload";
import {getShowcaseAndHex, getSnooItems} from "../../utils/SnooUtils";

const Preview = ({setOpenSnackbar, setSnackbarMessage}) => {
    const [bodyColors, setBodyColors] = useState('#00FF00')
    const [hairColors, setHairColors] = useState('#0000FF')
    const [eyesColors, setEyesColors] = useState('#FFFF00')

    const [items, setItems] = useState(new Array(10).fill("<svg></svg>"));

    const [snooItems, setSnooItems] = useState(getSnooItems(items), bodyColors, hairColors, eyesColors);
    const [showcase, setShowcase] = useState(null);
    const [hex, setHex] = useState("");

    useEffect(() => {
        const getItems = async (items, bodyColors, hairColors, eyesColors) => {
            const [showcase, hex] = await getShowcaseAndHex(items, bodyColors, hairColors, eyesColors)
            setShowcase(showcase)
            setHex(hex)
        }

        getItems(items, bodyColors, hairColors, eyesColors)
        setSnooItems(getSnooItems(items, bodyColors, hairColors, eyesColors))
    }, [bodyColors, eyesColors, hairColors, items]);

    const getImageData = async (file) => {
        const objectUrl = URL.createObjectURL(file);
        const isSvg = file.type === 'image/svg+xml';

        const localSrc = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;

            if (isSvg) {
                reader.readAsText(file);
            } else {
                reader.readAsDataURL(file);
            }
        });

        const {width, height} = await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({width: img.naturalWidth, height: img.naturalHeight});
                URL.revokeObjectURL(objectUrl);  // clean up
            };
            img.onerror = () => {
                resolve({width: null, height: null});
                URL.revokeObjectURL(objectUrl);
            };
            img.src = localSrc;
        });

        return {src: localSrc, width, height};
    };

    const isScaledRatio = (width, height, baseWidth, baseHeight) => {
        if (width * baseHeight !== height * baseWidth) return false;
        const widthRatio = width / baseWidth;
        const heightRatio = height / baseHeight;

        return Number.isInteger(widthRatio) && Number.isInteger(heightRatio);
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 10) {
            setSnackbarMessage(`Max: 10 files`, {variant: 'error'});
            setOpenSnackbar(true);
            return
        }

        const processedItems = await Promise.all(acceptedFiles.map(async (file) => {
            const data = await getImageData(file);
            return {file, data};
        }));

        const validItems = [];
        let background = ""

        processedItems.forEach(({file, data}) => {
            if (isScaledRatio(data.width, data.height, 380, 600)) {
                validItems.push(data.src);
            } else if (isScaledRatio(data.width, data.height, 552, 736)) {
                background = data.src
            } else {
                setSnackbarMessage(`${file.name} has invalid ratio`, {variant: 'error'});
                setOpenSnackbar(true);
            }
        });

        setItems([...validItems, ...new Array(10 - validItems.length - 1).fill(""), background]);
    }, [setOpenSnackbar, setSnackbarMessage]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, accept: {'image/*': []}, multiple: true,
    });

    return (<Centered>
            <Stack direction="column" spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                <Paper
                    {...getRootProps()}
                    elevation={3}
                    sx={{
                        width: "89%",
                        border: '2px dashed #aaa',
                        padding: 4,
                        textAlign: 'center',
                        alignSelf: 'flex-start',
                        backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa',
                        cursor: 'pointer',
                        mb: 4,
                    }}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (<Typography>Drop the images here ...</Typography>) : (
                        <Typography>Drag and drop images here, or click to select files</Typography>)}
                </Paper>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{height: '100%'}}
                    justifyContent="center"
                >
                    <Box sx={{alignSelf: 'flex-end'}}>
                        <Showcase
                            showcase={showcase}
                            hex={hex}
                        />
                    </Box>
                    <PreviewGrid
                        items={items}
                        setItems={setItems}
                        snooItems={snooItems}
                        sx={{alignSelf: 'flex-end'}}
                    />
                    <Box
                        sx={{
                            alignSelf: 'center'
                        }}
                    >
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ColorSection
                                bodyColor={bodyColors}
                                setBodyColor={setBodyColors}
                                hairColor={hairColors}
                                setHairColor={setHairColors}
                                eyesColor={eyesColors}
                                setEyesColor={setEyesColors}
                            />
                            <ZipDownload snooItems={snooItems} hex={hex} showcase={showcase}/>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Centered>
    )
}


export default Preview;