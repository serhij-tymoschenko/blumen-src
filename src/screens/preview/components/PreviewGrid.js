import {TraitPreview} from "../../components/TraitPreview";

const ImageGrid = ({items, setItems}) => {
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
        }, { once: true });
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
                            traitHeight={95}
                            traitWidth={150}
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