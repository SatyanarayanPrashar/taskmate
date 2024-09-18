import { PlusCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewButtonBox = () => {
    const navigate = useNavigate();

    return (
        <button className="p-[2rem] border-dashed border-[#616366] border-[1px] rounded-lg text-[#616366] flex flex-col items-center hover:shadow-[5px_5px_0px_0px_#1a202c] transition-shadow duration-470"
        onClick={() => navigate('/create-note')}
        >
            <PlusCircle />
            <p>Create</p>
        </button>
    );
};

export default NewButtonBox;
