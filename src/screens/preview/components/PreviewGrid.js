import {Box, Grid} from "@mui/material";
import {TraitPreview} from "../../components/TraitPreview";

const ImageGrid = () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
        bottom: '', // You can add image URLs here
        top: '',
    }));

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)', // Always 5 per row
                gap: 2,
            }}
        >
            {items.map((item, index) => (
                <TraitPreview
                    width={138}
                    height={184}
                    key={index}
                    borderRadius={5}
                    bottom={item.bottom}
                    top={item.top}
                />
            ))}
        </Box>
    );
};

export default ImageGrid;