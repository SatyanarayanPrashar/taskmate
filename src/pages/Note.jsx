import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "../lib/utils";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "usehooks-ts";

const imageUrls = [
  'https://i.postimg.cc/43QJPH8x/studying.png',
  'https://i.postimg.cc/k5mJWvvH/gym.png',
  'https://i.postimg.cc/W3psHpK6/meeting.png',
  'https://i.postimg.cc/P5ZfLRYZ/food.png',
];

const Note = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { index } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNote(storedNotes[index]);
  }, [index]);

  const handleDone = () => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = storedNotes.filter((_, i) => i !== parseInt(index));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate('/');
  };

  if (!note) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <div className={cn("w-[40%] flex flex-col gap-5 my-10", isMobile && "w-[90%] mb-[7rem]")}>
        <div className="flex flex-col gap-10">
          <div
            className="bg-transparent border-[#616366] border-[1px] rounded-lg text-[#616366] flex flex-col items-center justify-center transition-all duration-300 ease-in-out h-[7rem] w-[7rem]" >
            <img
              className='p-5 w-full h-auto object-cover'
              src={imageUrls[note.imageidx]}
              alt={`Note`}
            />
          </div>
          <h1 className="flex gap-2 items-center text-[21px] font-semibold w-full">
            {note.title}
          </h1>
          <p className="flex gap-2 items-center text-[16px] w-full text-start">
            {" "}
            {note.note}{" "}
          </p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => {handleDone()}}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;