import React, { useEffect, useState } from 'react';
import NewButtonBox from '../components/newbuttonbox';
import { Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const viewNote = (index) => {
    navigate(`/note/${index}`);
  };

  return (
    <div className="flex flex-col items-center min-h-[100vh]">
      <div className='mt-[9rem] mb-16 flex flex-col items-center text-[3rem] font-bold font-playwright'>
        <h1 className=''>Stay Organized, Stay Ahead</h1>
        <h1 className=''>Manage Your Tasks with <span className='italic text-[4rem]'>TaskMate</span></h1>
      </div>

      <div className='w-full max-w-4xl mt-8 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <NewButtonBox />
        
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className='relative border rounded-lg p-4 bg-white shadow-lg group' onClick={() => viewNote(index)}>
              <h2 className='text-xl font-semibold'>{note.title}</h2>
              <p className='mt-2'>{note.note.slice(0, 25)}{note.note.length > 25 ? '...' : ''}</p>
              <div className='absolute flex gap-5 bottom-2 right-2 brounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <button
                    className='flex gap-2 group-hover:opacity-100 transition-opacity duration-300 bg-green-200 rounded-lg justify-center items-center px-2'
                    onClick={() => deleteNote(index)}
                >
                    Done
                    <Check color='green' size={20}/>
                </button>
                <button
                    className='group-hover:opacity-100 transition-opacity duration-300'
                    onClick={() => deleteNote(index)}
                >
                    <Trash2 color='red' size={20}/>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='col-span-full text-center'>No notes available</p>
        )}
      </div>
    </div>
  );
};

export default Home;