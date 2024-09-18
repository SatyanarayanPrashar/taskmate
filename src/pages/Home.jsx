import React, { useEffect, useState } from 'react';
import NewButtonBox from '../components/newbuttonbox';
import { Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";

const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Organized', 'Focused', 'Productive'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const deleteNote = (index, e) => {
    e.stopPropagation();
    const updatedNotes = notes.filter((_, i) => i !== index);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const viewNote = (index) => {
    navigate(`/note/${index}`);
  };

  return (
    <div className="flex flex-col items-center min-h-[100vh]">
      <div className='mt-[9rem] mb-16 flex flex-col items-center text-[#1f1f20] text-[3rem] font-bold font-playwright w-full'>
        <div className={cn("flex items-center pr-[7rem]  justify-center w-full", isMobile && "flex-col pr-[10.3rem] mb-5")}>
          <span className={cn("mr-[1rem]", isMobile && "ml-[10rem]")}>Stay</span>
          <div className="relative h-20 w-40 overflow-visible flex items-center justify-center text-blue-600 text-[4rem]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={words[currentWord]}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute left-0 text-center italic"
              >
                {words[currentWord]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <h1 className='relative text-[3rem] text-center mt-[-1rem]'>
          Manage Your Tasks with 
          <span className='italic text-[4rem] relative inline-block text-blue-600'>
            TaskMate
            <img src='taskunderline.png' alt='Task underline' className='absolute inset-x-0 bottom-[-20px] mx-auto w-[100%]' />
          </span>
        </h1>
      </div>

      <div className={cn('w-full max-w-4xl mt-8 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', notes.length === 0 && "items-center justify-center flex", isMobile && "mb-[7rem]")}>
        <NewButtonBox />
        
        {notes.length > 0 && (
          notes.map((note, index) => (
            <div key={index} className='relative border rounded-lg p-4 bg-white hover:shadow-[5px_5px_0px_0px_#1a202c] transition-shadow duration-470 group overflow-hidden' onClick={() => viewNote(index)}>
              <h2 className='text-xl font-semibold'>{note.title.slice(0, 12)}{note.title.length > 12 ? '...' : ''}</h2>
              <p className='mt-2'>{note.note.slice(0, 25)}{note.note.length > 25 ? '...' : ''}</p>
              <div className={cn('absolute flex gap-5 bottom-2 right-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300', isMobile && "opacity-100")}>
                <button
                    className='flex gap-2 bg-green-200 rounded-lg justify-center items-center px-2'
                    onClick={(e) => deleteNote(index, e)}
                >
                    Done
                    <Check color='green' size={20}/>
                </button>
                <button
                    className='group-hover:opacity-100 transition-opacity duration-300'
                    onClick={(e) => deleteNote(index, e)}
                >
                    <Trash2 color='red' size={20}/>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;