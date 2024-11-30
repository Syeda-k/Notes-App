import './App.css';  // This should remain here, in App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './components/Home';
import About from './components/About';
import NotesState from './context/notes/notestate';


function App() {
  return (
    <NotesState>
 <Router>
      <div className="App">
        <Navbar />
        <div className='container'><Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
        </Routes></div>
        
      </div>
    </Router>
    </NotesState>
   
  );
}

export default App;
