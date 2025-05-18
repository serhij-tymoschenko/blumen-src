import {TraitPreview} from "../../components/TraitPreview";
import {replaceColors, toSvgFile} from "../../../utils/helpers/SvgHelper";
import {combineTogether} from "../../../utils/combiner/Combiner";
import {Stack, Typography} from "@mui/material";
import React from "react";
import {names} from "../../../utils/Constants";
import {snooSrc} from "../../../utils/SvgSrc";

const ImageGrid = ({items, setItems, bodyColor, hairColor, eyesColor}) => {
    let localItems = replaceColors(items, bodyColor, hairColor, eyesColor)

    const handleDragStart = (index) => (event) => {
        event.dataTransfer.setData('text/plain', index);

        // Get the original draggable element
        const draggedElement = event.currentTarget;

        // Clone the element to use as drag image
        const dragImage = draggedElement.cloneNode(true);
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-9999px'; // Move it off-screen
        dragImage.style.left = '-9999px';
        dragImage.style.pointerEvents = 'none';

        document.body.appendChild(dragImage);

        // Set it as the drag image
        event.dataTransfer.setDragImage(dragImage, dragImage.clientWidth / 2, dragImage.clientHeight / 2);

        // Optional cleanup after drag ends
        event.target.addEventListener('dragend', () => {
            document.body.removeChild(dragImage);
        }, {once: true});
    };


    const handleDrop = (index) => (event) => {
        const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
        if (draggedIndex === index) return;

        const newItems = [...items];
        [newItems[draggedIndex], newItems[index]] = [newItems[index], newItems[draggedIndex]];
        setItems(newItems);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow drop
    };

    const getTop = (item, index) => {
        return (index !== 9 && index !== 6) ? item : snooSrc
    }

    const getBottom = (item, index) => {
        return (index !== 9 && index !== 6) ? snooSrc : item
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '16px',
                alignItems: 'stretch',
                justifyItems: 'center',
            }}
        >
            {localItems.map((item, index) => (
                <Stack spacing={0} direction="column">
                    <Typography width={138 + 4} variant="caption" align="center">
                        {names[index]}
                    </Typography>
                    {
                        index !== 9 ?
                            <div
                                key={index}
                                draggable
                                onDragStart={handleDragStart(index)}
                                onDrop={handleDrop(index)}
                                onDragOver={handleDragOver}
                                style={{
                                    position: 'relative',
                                    width: 138 + 4,
                                    height: 184 + 4,
                                    cursor: 'grab',
                                    borderRadius: 5,
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                    backgroundColor: '#f9f9f9',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                }}
                            >
                                <TraitPreview
                                    width={138}
                                    height={184}
                                    traitHeight={150}
                                    traitWidth={95}
                                    borderRadius={5}
                                    item={toSvgFile(combineTogether([getBottom(item, index), getTop(item, index)], 552, 736))}
                                />
                            </div>
                            :
                            <TraitPreview
                                width={138}
                                height={184}
                                traitWidth={138}
                                traitHeight={184}
                                borderRadius={5}
                                item={toSvgFile(combineTogether([getBottom(item, index), getTop(item, index)], 552, 736, 0))}
                            />
                    }
                </Stack>
            ))}
        </div>
    );
};

export default ImageGrid;