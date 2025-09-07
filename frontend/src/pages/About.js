import React, { useState, useEffect, useMemo } from "react";
import "../styles/About.css";

function About() {
  const sections = useMemo(() => [
    {
      heading: "Name",
      content: "M. Talha Faizan",
    },
    {
      heading: "Introduction",
      content:
        "Hi! I am a passionate developer with a keen interest in building modern web applications. I like to explore new technologies, including Artificial Intelligence (AI) and Machine Learning (ML), and continuously improving my skills.",
    },
    {
      heading: "Purpose of this Portfolio",
      content:
        "This portfolio is created to demonstrate my abilities, and provide a platform for potential collaborators or employers to get to know my work.",
    },
    {
      heading: "Current Situation",
      content:
        "Currently, I am pursuing Computer Science at UCP and actively working on personal and academic projects to strengthen my development skills.",
    },
    {
      heading: "Future Goals",
      content:
        "I aim to become a passionate software engineer providing best services related to full-stack development, AI and ML solutions, and cloud services and solve real world problems with continuous learning."
    },
  ], []); 

  const [displayedText, setDisplayedText] = useState([""]);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentSection < sections.length) {
      const content = sections[currentSection].content;
      if (currentChar < content.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const newTexts = [...prev];
            newTexts[currentSection] =
              (newTexts[currentSection] || "") + content[currentChar];
            return newTexts;
          });
          setCurrentChar((prev) => prev + 1);
        }, 1);
        return () => clearTimeout(timeout);
      } else {
        setCurrentSection((prev) => prev + 1);
        setCurrentChar(0);
        setDisplayedText((prev) => [...prev, ""]);
      }
    }
  }, [currentChar, currentSection, sections]);

  return (
    <div className="about-page">
      <div className="about-container">
        <h1>
          <u>About Me</u>
        </h1>
        <div className="about-content">
          {sections.map((section, index) => (
            <div key={index} className="about-section">
              <h3 className="about-heading">{section.heading}:</h3>
              <p>{displayedText[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
