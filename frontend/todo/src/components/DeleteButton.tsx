import axios from 'axios';

export const DeleteButton = ({ id, onDelete }: { id: number, onDelete: () => void }) => {

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:8000/todo/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            onDelete();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    );
};

export default DeleteButton;