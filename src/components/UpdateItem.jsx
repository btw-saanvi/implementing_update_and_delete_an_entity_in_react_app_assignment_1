import { useState, useEffect } from "react";

const UpdateItem = ({ itemId }) => {
    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;
    const [item, setItem] = useState(null);
    const [updatedValue, setUpdatedValue] = useState("");

    useEffect(() => {
        if (!itemId) return; // Prevent fetching if itemId is undefined

        const fetchItem = async () => {
            try {
                const response = await fetch(`${API_URI}/${itemId}`);
                if (!response.ok) throw new Error("Failed to fetch item");
                const data = await response.json();
                setItem(data);
                setUpdatedValue(data.name || "");
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        };

        fetchItem();
    }, [itemId]);

    const handleChange = (e) => {
        setUpdatedValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URI}/${itemId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: updatedValue }),
            });

            if (response.ok) {
                const updatedItem = await response.json();
                setItem(updatedItem);
                alert("Item updated successfully!");
            } else {
                alert("Failed to update item.");
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <div>
            <h2>Update Item</h2>
            {item ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Item Name:
                        <input type="text" value={updatedValue} onChange={handleChange} />
                    </label>
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Loading item...</p>
            )}
        </div>
    );
};

export default UpdateItem;
