import { ImagePlus } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const imageUrls = [
    'studying.png',
    'gym.png',
    'meeting.png',
    'food.png',
];

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [bgColor, setBgColor] = useState('transparent');
  const [imageidx, setImageidx] = useState(null); // Changed initial value to null
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const [isSettingIcon, setIssettingIcon] = useState(false);

  const saveNote = () => {
    if (title && note) {
      const newNote = { title, note, imageidx, bgColor };
      const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      storedNotes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(storedNotes));
      navigate('/');
    } else {
      alert('Both fields are required.');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] bg-[bgColor]'>
      <div className='w-[40%] flex flex-col gap-5'>
        <div className='flex gap-4'>
          <div
            className={cn(
              'bg-white border-[#616366] border-[1px] rounded-lg text-[#616366] flex flex-col items-center justify-center transition-all duration-300 ease-in-out',
              isSettingIcon ? 'h-[7rem] w-full' : 'h-[7rem] w-[7rem]'
            )}
            role='button'
            onClick={() => setIssettingIcon(!isSettingIcon)} // Toggle state on click
          >
            {!isSettingIcon ? (
                <div className='relative'>
                    {imageidx !== null && (
                    <img
                        className='p-5 w-full h-auto object-cover'
                        src={imageUrls[imageidx]}
                        alt={`Image ${imageidx + 1}`}
                    />
                    )}
                    <div className='w-full h-full bg-white opacity-80 absolute top-0 rounded-lg'></div>
                    <ImagePlus
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    size={24}
                    />
                </div>
            ) : (
              <div className='flex '>
                <div className='grid grid-cols-4 gap-2'>
                  {imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Image ${index + 1}`}
                      className={`object-cover cursor-pointer border rounded-lg h-[6rem] mx-2 p-5 ${imageidx === index ? 'border-2 border-blue-500' : ''}`}
                      onClick={() => setImageidx(index)}
                    />
                  ))}
                </div>
                <button
                  className='mx-10'
                  onClick={() => setIssettingIcon(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        <input
          className="flex gap-2 items-center text-[21px] font-semibold px-4 py-2 rounded-lg border w-full"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="flex gap-2 items-center text-[16px] px-4 py-2 rounded-lg border w-full h-[14rem]"
          placeholder="note"
          value={note} // Fixed value attribute to use 'note'
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={saveNote}
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
