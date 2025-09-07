import React, { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const maxWords = 3000;
  const wordCount = message.trim() === "" ? 0 : message.trim().split(/\s+/).length;

  const handleMessageChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= maxWords) {
      setMessage(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to send message. Try again!");
        return;
      }

      alert(data.message || "Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to send message. Try again!");
    }
  };

  return (
    <div className="contact-page">

      <form className="contact-form" onSubmit={handleSubmit}>
            <h1 className="contact-heading"><u>Contact Me</u></h1>
        <input 
          type="text" 
          placeholder="Enter Complete Name" 
          className="contact-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Enter Email" 
          className="contact-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Enter message details here"
          className="contact-textarea"
          value={message}
          onChange={handleMessageChange}
        />

        <div className="word-count">
          {wordCount}/{maxWords} Words
        </div>

        <button type="submit" className="contact-submit">Submit</button>
      </form>

      <p className="contact-email-note">
        OR you can also Email me at
        <a
          href="mailto:mtalhafaizan30@mail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          mtalhafaizan30@gmail.com
        </a>
      </p>
    </div>
  );
}
export default Contact;
