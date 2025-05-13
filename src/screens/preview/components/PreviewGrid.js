import {TraitPreview} from "../../components/TraitPreview";
import {useState} from "react";

const ImageGrid = () => {
    const [items, setItems] = useState([
        {top: '/images/trait1.png', bottom: ''},
        {top: '', bottom: ''},
        {top: '', bottom: ''},
        {top: '', bottom: ''},
        {top: '', bottom: ''},
        {top: '', bottom: ''},
        {top: '', bottom: ''}
    ]);

    const handleDragStart = (index) => (event) => {
        event.dataTransfer.setData('text/plain', index);
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

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)', // 5 items per row
                gap: '16px',
                justifyItems: 'center',
            }}
        >
            {items.map((item, index) => (
                <div style={{ width: 138, textAlign: 'center' }}>
                    {/* Label above, NOT draggable */}
                    <div
                        style={{
                            marginBottom: 6,
                            fontSize: 14,
                            color: '#333',
                        }}
                    >
                        Trait {index + 1}
                    </div>

                    {/* Draggable box only */}
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
                            borderRadius={5}
                            bottom={item.bottom}
                            top={item.top}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;