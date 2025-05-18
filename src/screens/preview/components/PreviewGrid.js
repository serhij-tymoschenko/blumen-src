import {TraitPreview} from "../../components/TraitPreview";
import {toSvgFile} from "../../../utils/helpers/SvgHelper";
import {Stack, Typography} from "@mui/material";
import React from "react";
import {names} from "../../../utils/Constants";

const ImageGrid = ({items, setItems, snooItems}) => {
    const handleDragStart = (index) => (event) => {
        event.dataTransfer.setData('text/plain', index);

        const draggedElement = event.currentTarget;

        const dragImage = draggedElement.cloneNode(true);
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-9999px';
        dragImage.style.left = '-9999px';
        dragImage.style.pointerEvents = 'none';

        document.body.appendChild(dragImage);

        event.dataTransfer.setDragImage(dragImage, dragImage.clientWidth / 2, dragImage.clientHeight / 2);

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
        event.preventDefault();
    };

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
            {snooItems.map((snooItem, i) => (

                <Stack spacing={0} direction="column">
                    <Typography width={138 + 4} variant="caption" align="center">
                        {names[i]}
                    </Typography>
                    {
                        i !== 9 ?
                            <div
                                key={i}
                                draggable
                                onDragStart={handleDragStart(i)}
                                onDrop={handleDrop(i)}
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
                                    item={toSvgFile(snooItem)}
                                />
                            </div>
                            :
                            <TraitPreview
                                width={138}
                                height={184}
                                traitWidth={138}
                                traitHeight={184}
                                borderRadius={5}
                                item={toSvgFile(snooItem)}
                            />
                    }
                </Stack>
            ))}
        </div>
    );
};

export default ImageGrid;