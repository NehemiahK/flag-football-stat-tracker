import { useNavigate } from "react-router-dom";

export default function BackButton(){

    const navigate = useNavigate();

    return(<button 
        onClick={() => navigate(-1)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
        Back
        </button>)
}

