import './App.css';
import './index.css'
import CreateNote from './pages/CreateNote';
import Home from './pages/Home';
import Note from './pages/Note';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/note/:index" element={<Note />} />
      </Routes>
    </div>
  );
}

export default App;
