import {Box} from '@mui/material';

export const TraitPreview = ({
                                 width = 190,
                                 height = 300,
                                 borderRadius = 0,
                                 item,
                             }) => {
    return (
        <Box
            sx={{
                width,
                height,
                border: '2px dashed #ccc',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                borderRadius,
            }}
        >
            <img
                width={width}
                height={height}
                src={item}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'scale-down',
                    pointerEvents: 'none',
                }}
            />
        </Box>
    );
};