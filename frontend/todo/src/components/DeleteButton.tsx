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
        <button className="bg-red-900 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition duration-200"
         onClick={handleDelete} >
            Delete
        </button>
    );
};

export default DeleteButton;