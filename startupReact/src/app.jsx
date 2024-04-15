import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Upload } from './pages/upload';
import { Profile } from './pages/profile';
import './app.css';

function App() {
  return (
    <div style={{margin: '-8px', width: '100vw'}}>
      <Router>
        <Routes>
          <Route path="/" element={<Main username="lol"/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;