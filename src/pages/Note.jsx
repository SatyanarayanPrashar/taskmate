import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "../lib/utils";

const imageUrls = [
  'https://i.postimg.cc/43QJPH8x/studying.png',
  'https://i.postimg.cc/k5mJWvvH/gym.png',
  'https://i.postimg.cc/W3psHpK6/meeting.png',
  'https://i.postimg.cc/P5ZfLRYZ/food.png',
];

const Note = () => {
  const { index } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNote(storedNotes[index]);
  }, [index]);

  if (!note) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-[bgColor]">
      <div className="w-[40%] flex flex-col gap-5">
        <div className="flex flex-col gap-10">
          <div
            className={cn(
              "bg-transparent border-[#616366] border-[1px] rounded-lg text-[#616366] flex flex-col items-center justify-center transition-all duration-300 ease-in-out h-[7rem] w-[7rem]"
            )}
          >
            <img
              className='p-5 w-full h-auto object-cover'
              src={imageUrls[note.imageidx]}
              alt={`Note`}
            />
          </div>
          <h1 className="flex gap-2 items-center text-[21px] font-semibold w-full">
            {note.title}
          </h1>
          <p className="flex gap-2 items-center text-[16px] w-full h-[14rem] text-start">
            {" "}
            {note.note}{" "}
          </p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => {}}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;