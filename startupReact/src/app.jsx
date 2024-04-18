import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Upload } from './pages/upload';
import { Profile } from './pages/profile';
import './app.css';

function App() {
  (async function() {
    await fetch('/api/email', {
      method: 'GET',
      credentials: 'include' 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("text") !== -1) {
        return response.text();
      } else {
        throw new Error(`Unexpected content type: ${contentType}`);
      }
    })
    .then(data => {
      const username = (data) ? data : null;
      return (
        <div style={{margin: '-8px', width: '100vw'}}>
          <Router>
            <Routes>
              <Route path="/" element={<Main username={username}/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </div>
      );
    })
    .catch(e => {
      console.error('Error fetching /api/email:', e);
    });
  })();
}

export default App;