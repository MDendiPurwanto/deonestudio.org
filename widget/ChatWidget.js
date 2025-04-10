// Global React Chat Widget
(function() {
  const { useState, useEffect, useRef } = React;

  // Custom SVG Icons
  function SendIcon(props) {
      return React.createElement('svg', {
          ...props,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
      }, [
          React.createElement('line', { key: 'line1', x1: '22', y1: '2', x2: '11', y2: '13' }),
          React.createElement('polygon', { key: 'polygon', points: '22 2 15 22 11 13 2 9 22 2' })
      ]);
  }

  function MessageCircleIcon(props) {
      return React.createElement('svg', {
          ...props,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
      }, [
          React.createElement('path', { key: 'path1', d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' })
      ]);
  }

  function XIcon(props) {
      return React.createElement('svg', {
          ...props,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
      }, [
          React.createElement('line', { key: 'line1', x1: '18', y1: '6', x2: '6', y2: '18' }),
          React.createElement('line', { key: 'line2', x1: '6', y1: '6', x2: '18', y2: '18' })
      ]);
  }

  // Comprehensive Knowledge Base
  const PORTFOLIO_KNOWLEDGE = {
    profile: "A web developer with more than 2 years of work experience. Experienced in developing websites for brands from several industries, ranging from media, e-commerce, community websites and client application needs. I have experience developing integrated websites with robot hardware or the Internet of Things, I am also familiar with Embedded Systems.",
    
    skills: [
      "HTML/CSS", "JavaScript", "React.js", "Node.js", "IoT", 
      "Arduino", "PHP", "Laravel", "Codeigniter", 
      "RDBMS", "MySQL", "PostgreSQL", "RESTful API", "Git"
    ],
    
    education: [
      {
        period: "2020 - 2024",
        institution: "Universitas Majalengka",
        degree: "Informatic - Bachelor of Computer Science (S.Kom)",
        gpa: "3.90",
        activities: [
          "Member of Communications and Media Division",
          "Chairman of Informatics Student Association 2022-2023",
          "Recipient of the Existing Bank Indonesia Scholarship",
          "Cirebon Regional Coordinator Management GenBI Cirebon Head of Communications and Information Department"
        ]
      },
      {
        period: "2017 - 2020",
        institution: "SMK Negeri 1 Kertajati",
        degree: "State Vocational School",
        focus: "Electrical Avionics, Electrical Engineering"
      }
    ],
    
    experience: [
      {
        period: "August 2024 - Present",
        title: "Software Engineer",
        company: "MAIA.ID (PT Mayar Kernel Supernova - Bandung)",
        responsibilities: [
          "Developed and maintained MAIA ID platforms",
          "Implemented API integration"
        ]
      },
      {
        period: "June 2020 - August 2024",
        title: "Front-end Developer",
        company: "Freelance",
        responsibilities: [
          "Built responsive web applications",
          "Collaborated with UI/UX designers",
          "Optimized website performance"
        ]
      },
      {
        period: "January 2021 - November 2022",
        title: "Web Development",
        company: "Local News Portal AB Channel - Majalengka",
        responsibilities: [
          "Assisted in website development projects",
          "Learned modern web technologies",
          "Participated in team meetings and planning"
        ]
      }
    ],
    
    projects: [
      {
        name: "E-Commerce Website",
        description: "A full-featured e-commerce platform built with React js and Node.js",
        technologies: ["React", "Node.js"]
      },
      {
        name: "IoT Dashboard",
        description: "Real-time monitoring dashboard for IoT devices and sensors",
        technologies: ["Arduino", "MQTT", "Firebase", "React"]
      },
      {
        name: "Community Platform Satu GenBI",
        description: "Social platform for connecting and sharing within communities",
        technologies: ["Laravel", "MySQL", "Tailwind"]
      }
    ],
    
    contact: {
      email: "mdendipurwanto0112@gmail.com",
      resume: "https://deonestudio.org/assets/resume/CV.pdf",
      social: {
        linkedin: "https://www.linkedin.com/in/muhamad-dendi-purwanto-09760725a/",
        github: "https://github.com/MDendiPurwanto",
        instagram: "https://www.instagram.com/denpurwanto16/"
      }
    }
  };

  // Initial messages
  const initialMessages = [
    { 
      id: 1, 
      text: "Hi there! I'm Dendi's AI assistant. I can help you learn about his background, skills, experience, or projects. What would you like to know?", 
      sender: 'bot' 
    }
  ];

  function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessages);
    const [inputMessage, setInputMessage] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const generateResponse = (userInput) => {
      const lowercaseInput = userInput.toLowerCase();

      const intents = [
        {
          keywords: ['profile', 'who', 'about'],
          response: () => `About Dendi: ${PORTFOLIO_KNOWLEDGE.profile}`
        },
        {
          keywords: ['skill', 'skills', 'technology', 'tech'],
          response: () => `Dendi's skills include: ${PORTFOLIO_KNOWLEDGE.skills.join(', ')}`
        },
        {
          keywords: ['education', 'study', 'university', 'school'],
          response: () => {
            const edu = PORTFOLIO_KNOWLEDGE.education.map(e => 
              `${e.period}: ${e.institution} - ${e.degree}${e.gpa ? ` (GPA: ${e.gpa})` : ''}`
            ).join('\n\n');
            return `Education:\n${edu}`;
          }
        },
        {
          keywords: ['experience', 'work', 'job', 'career'],
          response: () => {
            const exp = PORTFOLIO_KNOWLEDGE.experience.map(e => 
              `${e.period}: ${e.title} at ${e.company}\n${e.responsibilities.map(r => `• ${r}`).join('\n')}`
            ).join('\n\n');
            return `Professional Experience:\n${exp}`;
          }
        },
        {
          keywords: ['project', 'projects', 'work'],
          response: () => {
            const projects = PORTFOLIO_KNOWLEDGE.projects.map(p => 
              `${p.name}: ${p.description}\nTechnologies: ${p.technologies.join(', ')}`
            ).join('\n\n');
            return `Dendi's Projects:\n${projects}`;
          }
        },
        {
          keywords: ['contact', 'reach', 'connect', 'email', 'resume'],
          response: () => {
            const contact = PORTFOLIO_KNOWLEDGE.contact;
            return `Contact Dendi:\n` +
                   `Email: ${contact.email}\n` +
                   `Resume: ${contact.resume}\n\n` +
                   `Social Media:\n` +
                   `LinkedIn: ${contact.social.linkedin}\n` +
                   `GitHub: ${contact.social.github}\n` +
                   `Instagram: ${contact.social.instagram}\n\n` +
                   `You can reach out to Dendi via email or through his social media channels.`;
          }
        }
      ];

      // Find matching intent
      for (let intent of intents) {
        if (intent.keywords.some(keyword => lowercaseInput.includes(keyword))) {
          return intent.response();
        }
      }

      // Fallback response
      return "I can help you with information about Dendi's profile, skills, education, experience, projects, or contact details. What would you like to know?";
    };

    const handleSendMessage = () => {
      if (inputMessage.trim() === '') return;

      // Add user message
      const newUserMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user'
      };
      setMessages(prev => [...prev, newUserMessage]);

      // Clear input
      setInputMessage('');

      // Generate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: generateResponse(newUserMessage.text),
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    };

    return React.createElement('div', { 
      id: 'chat-widget-app', 
      style: { 
        position: 'fixed', 
        bottom: '1rem', 
        right: '1rem', 
        zIndex: 9999, 
        width: '320px',
        maxWidth: '90vw'
      }
    }, [
      // Chat Button with Tooltip
      !isOpen && React.createElement('div', {
        style: {
          position: 'relative',
          display: 'inline-block'
        }
      }, [
        // Tooltip
        showTooltip && React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            marginBottom: '8px',
            zIndex: 10
          }
        }, 'Chat with Dendi\'s AI'),
        
        // Chat Button
        React.createElement('button', {
          onClick: () => setIsOpen(true),
          onMouseEnter: () => setShowTooltip(true),
          onMouseLeave: () => setShowTooltip(false),
          style: {
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '12px',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }
        }, [
          React.createElement(MessageCircleIcon, { style: { width: '24px', height: '24px' } })
        ])
      ]),

      // Chat Container
      isOpen && React.createElement('div', {
        style: {
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          height: '500px',
          maxHeight: '90vh'
        }
      }, [
        // Chat Header
        React.createElement('div', {
          style: {
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '12px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        }, [
          React.createElement('h3', { style: { margin: 0, fontWeight: 'bold' } }, 'Dendi\'s AI Assistant'),
          React.createElement('button', {
            onClick: () => setIsOpen(false),
            style: {
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }
          }, [
            React.createElement(XIcon, { style: { width: '20px', height: '20px' } })
          ])
        ]),

        // Message List
        React.createElement('div', {
          style: {
            flexGrow: 1,
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }
        }, [
          ...messages.map((msg) => 
            React.createElement('div', {
              key: msg.id,
              style: {
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#3B82F6' : '#E5E7EB',
                color: msg.sender === 'user' ? 'white' : 'black',
                padding: '8px 12px',
                borderRadius: '12px',
                maxWidth: '80%',
                wordWrap: 'break-word'
              }
            }, msg.text)
          ),
          React.createElement('div', { ref: messagesEndRef })
        ]),

        // Message Input
        React.createElement('div', {
          style: {
            padding: '12px',
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }
        }, [
          React.createElement('input', {
            ref: inputRef,
            type: 'text',
            value: inputMessage,
            onChange: (e) => setInputMessage(e.target.value),
              onKeyPress: handleKeyPress,
              placeholder: 'Ask about Dendi\'s portfolio...',
              style: {
                flexGrow: 1,
                padding: '8px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }
            }),
            React.createElement('button', {
              onClick: handleSendMessage,
              disabled: inputMessage.trim() === '',
              style: {
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }, [
              React.createElement(SendIcon, { style: { width: '20px', height: '20px' } })
            ])
          ])
        ])
      ]);
    }
  
    // Render the widget when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      const chatWidgetContainer = document.getElementById('chat-widget');
      if (chatWidgetContainer) {
        // Use createRoot if available (React 18+), fallback to render
        if (ReactDOM.createRoot) {
          const root = ReactDOM.createRoot(chatWidgetContainer);
          root.render(React.createElement(ChatWidget));
        } else {
          ReactDOM.render(
            React.createElement(ChatWidget),
            chatWidgetContainer
          );
        }
      }
    });
  })();