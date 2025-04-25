import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [pageContent, setPageContent] = useState({
    home: '',
    aboutMe: '',
    skills: '',
    projects: '',
    contactMe: '',
  });
  const [editing, setEditing] = useState(null);  // Track which page is being edited

  useEffect(() => {
    // Fetch the message from the serverless function
    fetch('/.netlify/functions/hello')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => console.error('Error fetching function:', error));

    // Fetch the page content from the serverless function
    fetch('/.netlify/functions/getPageData')
      .then((res) => res.json())
      .then((data) => {
        setPageContent(data);
      })
      .catch((error) => console.error('Error fetching page data:', error));
  }, []);

  // Handle saving edited page content
  const handleSaveContent = (page) => {
    const newContent = pageContent[page];

    fetch('/.netlify/functions/savePageData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, content: newContent }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Page updated:', data);
        setEditing(null);  // Stop editing mode
      })
      .catch((error) => console.error('Error saving page content:', error));
  };

  // Handle content change for editing
  const handleContentChange = (e, page) => {
    setPageContent({
      ...pageContent,
      [page]: e.target.value,
    });
  };

  return (
    <div className="App">
      <h1>Netlify Serverless Function & MongoDB Test</h1>
      <p>{message}</p>

      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#aboutMe">About Me</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contactMe">Contact Me</a></li>
        </ul>
      </nav>

      {/* Home Section */}
      <div>
        <h3>Home</h3>
        {editing === 'home' ? (
          <div>
            <textarea
              value={pageContent.home}
              onChange={(e) => handleContentChange(e, 'home')}
            />
            <button onClick={() => handleSaveContent('home')}>Save</button>
          </div>
        ) : (
          <div>
            <p>{pageContent.home}</p>
            <button onClick={() => setEditing('home')}>Edit</button>
          </div>
        )}
      </div>

      {/* About Me Section */}
      <div>
        <h3>About Me</h3>
        {editing === 'aboutMe' ? (
          <div>
            <textarea
              value={pageContent.aboutMe}
              onChange={(e) => handleContentChange(e, 'aboutMe')}
            />
            <button onClick={() => handleSaveContent('aboutMe')}>Save</button>
          </div>
        ) : (
          <div>
            <p>{pageContent.aboutMe}</p>
            <button onClick={() => setEditing('aboutMe')}>Edit</button>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div>
        <h3>Skills</h3>
        {editing === 'skills' ? (
          <div>
            <textarea
              value={pageContent.skills}
              onChange={(e) => handleContentChange(e, 'skills')}
            />
            <button onClick={() => handleSaveContent('skills')}>Save</button>
          </div>
        ) : (
          <div>
            <p>{pageContent.skills}</p>
            <button onClick={() => setEditing('skills')}>Edit</button>
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div>
        <h3>Projects</h3>
        {editing === 'projects' ? (
          <div>
            <textarea
              value={pageContent.projects}
              onChange={(e) => handleContentChange(e, 'projects')}
            />
            <button onClick={() => handleSaveContent('projects')}>Save</button>
          </div>
        ) : (
          <div>
            <p>{pageContent.projects}</p>
            <button onClick={() => setEditing('projects')}>Edit</button>
          </div>
        )}
      </div>

      {/* Contact Me Section */}
      <div>
        <h3>Contact Me</h3>
        {editing === 'contactMe' ? (
          <div>
            <textarea
              value={pageContent.contactMe}
              onChange={(e) => handleContentChange(e, 'contactMe')}
            />
            <button onClick={() => handleSaveContent('contactMe')}>Save</button>
          </div>
        ) : (
          <div>
            <p>{pageContent.contactMe}</p>
            <button onClick={() => setEditing('contactMe')}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
