import React from "react";
import "../styles/Skills.css";

function Skills() {
  const skills = [
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      description: "High-level programming language for web development and interactive interfaces."
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      link: "https://react.dev/",
      description: "Most popular JavaScript library for building fast and dynamic user interfaces."
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      link: "https://www.python.org/",
      description: "Versatile programming language widely used for automation, data analysis, and web apps."
    },
    {
      name: "Flask",
      logo: "https://cdn.simpleicons.org/flask/000000",
      link: "https://flask.palletsprojects.com/",
      description: "A lightweight Python web framework for building backend services and managing APIs."
    }
  ];

  const services = [
    {
      name: "Web Development",
      logo: "https://cdn-icons-png.flaticon.com/512/2721/2721261.png",
      description: "Building responsive, dynamic, and modern web applications tailored to client needs.",
      link: "https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer"
    },
    {
      name: "LLM / ML Engineering",
      logo: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
      description: "Designing and deploying intelligent AI/ML models for real-world applications.",
      link: "https://www.ibm.com/topics/machine-learning"
    },
    {
      name: "Automation Engineering",
      logo: "https://cdn-icons-png.flaticon.com/512/2721/2721295.png", 
      description: "Creating automated workflows, scripts, and systems to optimize productivity and efficiency.",
      link: "https://en.wikipedia.org/wiki/Automation"
    },
    {
      name: "Data Engineering",
      logo: "https://cdn-icons-png.flaticon.com/512/3039/3039383.png", 
      description: "Building and maintaining scalable data pipelines, warehouses, and analytics platforms.",
      link: "https://www.ibm.com/think/topics/data-engineering"
    }
  ];

  return (
    <div className="skills-page">
      <div className="skills-services-wrapper">
        
        <div className="skills-section">
          <h1><u>My Skills</u></h1>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <img src={skill.logo} alt={`${skill.name} logo`} />
                <h2>{skill.name}</h2>
                <p className="skill-description">{skill.description}</p>
                <a href={skill.link} target="_blank" rel="noopener noreferrer">
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="services-section">
          <h1><u>My Services</u></h1>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <img src={service.logo} alt={`${service.name} logo`} />
                <h2>{service.name}</h2>
                <p className="service-description">{service.description}</p>
                <a href={service.link} target="_blank" rel="noopener noreferrer">
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
export default Skills;
