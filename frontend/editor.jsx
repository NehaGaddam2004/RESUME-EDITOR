import { useState } from 'react';
import axios from 'axios';

export default function Editor() {
  const [resume, setResume] = useState({
    name: 'John Doe',
    summary: 'Experienced developer...',
    experience: ['Software Engineer at XYZ'],
    education: ['B.Sc Computer Science'],
    skills: ['JavaScript', 'React']
  });

  const enhanceSection = async (section) => {
    const res = await axios.post('http://127.0.0.1:8000/ai-enhance', {
      section,
      content: resume[section]
    });
    setResume({ ...resume, [section]: res.data.enhanced_content });
  };

  const saveResume = async () => {
    await axios.post('http://127.0.0.1:8000/save-resume', { resume });
    alert('Resume saved!');
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
  };

  return (
    <div>
      <h2>Edit Your Resume</h2>
      <label>Name:</label>
      <input value={resume.name} onChange={(e) => setResume({ ...resume, name: e.target.value })} />

      <h3>Summary</h3>
      <textarea value={resume.summary} onChange={(e) => setResume({ ...resume, summary: e.target.value })} />
      <button onClick={() => enhanceSection('summary')}>Enhance with AI</button>

      <h3>Experience</h3>
      <textarea value={resume.experience.join('\n')} onChange={(e) => setResume({ ...resume, experience: e.target.value.split('\n') })} />

      <h3>Education</h3>
      <textarea value={resume.education.join('\n')} onChange={(e) => setResume({ ...resume, education: e.target.value.split('\n') })} />

      <h3>Skills</h3>
      <textarea value={resume.skills.join(', ')} onChange={(e) => setResume({ ...resume, skills: e.target.value.split(',').map(s => s.trim()) })} />

      <br /><br />
      <button onClick={saveResume}>Save Resume</button>
      <button onClick={downloadResume}>Download JSON</button>
    </div>
  );
}