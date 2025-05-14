import {Box, Typography} from '@mui/material';

export const TraitPreview = ({
                                 width = 190,
                                 height = 300,
                                 borderRadius = 0,
                                 layers = [],
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
            {layers.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                    Combined Preview
                </Typography>
            ) : (
                layers.map((layer, index) => (
                    <img
                        key={index}
                        src={layer.src}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: layer.traitWidth,
                            height: layer.traitHeight,
                            objectFit: 'scale-down',
                            pointerEvents: 'none',
                        }}
                    />
                ))
            )}
        </Box>
    );
};