
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/api/contact', form)
    alert("Message sent successfully!")
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div style={{ fontFamily: "Arial", padding: "40px" }}>
      <h1>Abrar Guntaguli</h1>
      <h2>Full Stack Developer</h2>
      <p>I build responsive and scalable web applications using React and Node.js.</p>

      <h3>Projects</h3>
      <ul>
        <li>Weather Dashboard (API Integration)</li>
        <li>E-Commerce Frontend</li>
        <li>Business Website</li>
      </ul>

      <h3>Contact Me</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br/><br/>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br/><br/>
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required /><br/><br/>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
