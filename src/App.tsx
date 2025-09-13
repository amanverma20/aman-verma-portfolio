import emailjs from '@emailjs/browser';
import { Briefcase, Calendar, ChevronDown, Code, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Palette, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // In a real application, this would download an actual PDF file
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1Gt0q7_xuhOvuea3AOn381IGRnxgTVcAu/view?usp=drive_link'; // You would replace this with your actual resume file
    link.download = 'Aman_Verma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSendStatus('idle');
  setSendError(null);

  const trimmedName = contactName.trim();
  const trimmedEmail = contactEmail.trim();
  const trimmedMessage = contactMessage.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    setSendStatus('error');
    setSendError('Please fill out your name, email, and message.');
    return;
  }

  const emailOk = /.+@.+\..+/.test(trimmedEmail);
  if (!emailOk) {
    setSendStatus('error');
    setSendError('Please enter a valid email address.');
    return;
  }

  setIsSending(true);
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    console.log('Service ID:', serviceId);
    console.log('Template ID:', templateId);
    console.log('Public Key:', publicKey);

    await emailjs.send(
      serviceId,
      templateId,
      {
        name: trimmedName,
        email: trimmedEmail,        // User's email address
        message: trimmedMessage,
        time: new Date().toLocaleString()
      },
      publicKey
    );
    
    setSendStatus('success');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  } catch (err: any) {
    console.error('EmailJS Error Details:', err);
    setSendStatus('error');
    setSendError(err?.message || 'Failed to send your message. Please try again later.');
  } finally {
    setIsSending(false);
  }
};

  // const skills = [
  //   'Java', 'JavaScript', 'ReactJS', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'HTML/CSS','Git', 'GitHub', 'Amazon Web Services', 'SQL', 'Python', 'Postman', 'Linux', 'Azure', 'VS Code', 'Docker'
  // ];
  const skills = ['Java', 'JavaScript', 'TypeScript', 'ReactJS', 'Node.js', 'Express.js', 'Next.js', 'FastAPI', 'MongoDB', 'SQL', 'Tailwind CSS', 'HTML/CSS', 'Git/GitHub', 'Amazon Web Services', 'Linux', 'Docker', 'VS Code', 'Python', 'Postman', 'JWT', 'Razorpay API Integration', 'Email Services', 'Deployment & CI/CD', 'Software Testing'];


  const projects = [
    {
      title: 'Expense Tracker',
      description: 'Developed a responsive and accessible UI, increasing user interactions by 40% and reducing drop-off rate by 25% and helping users to manage and monitor their daily income and expenses. Built and integrated RESTful APIs for seamless communication between frontend and backend services.',
      tech: ['MERN', 'Ant Design', 'MongoDB', 'RESTful APIs'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: 'https://expense-tracker-system-ql75.onrender.com/',
      githubUrl: 'https://github.com/amanverma20'
    },
    {
      title: 'NutriSmart—AI-Driven Food Analysis',
      description: 'Developed NutriSmart, an AI-powered menu scanner using AWS Textract for OCR, Bedrock Titan for dish image generation, and real-time nutrition insights. Built a personalized recommendation engine aligned with user dietary goals, allergies, and health conditions.',
      tech: ['React', 'TypeScript', 'AWS Textract', 'AWS Bedrock'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: 'https://cute-beignet-6b220d.netlify.app/',
      githubUrl: 'https://github.com/amanverma20'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Deployed a React-based dashboard on AWS S3, using CloudFront for low-latency content delivery and high availability. Configured Route 53 with a custom domain and SSL encryption, ensuring secure and reliable access.',
      tech: ['AWS S3', 'CloudFront', 'Route 53', 'React'],
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: 'https://social-meadia-dashboard-1.onrender.com/',
      githubUrl: 'https://github.com/amanverma20'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science and Engineering', 
      institution: 'Lloyd Institute of Engineering and Technology',
      location: 'Greater Noida',
      period: '2021 - 2025',
      description: 'Comprehensive study of software development, algorithms, and system design. Focused on Data Structures, Full Stack Development, Azure AI/ML, Database Management, Data Science, Software Engineering, Operating System, and Computer Network.',
      achievements: ['CGPA: 8.0', 'AWS Cloud Practitioner Certified', '500+ DSA Problems Solved', '90+ hours Java Programming Training'],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'MetaGeeks Technologies',
      location: 'Link',
      period: 'Apr 2025 - Aug 2025',
      description: 'Developed a full-featured Inventory Management System using the MERN stack, tracking over 1,000+ products and improving inventory accuracy by 30%.',
      achievements: ['Integrated Razorpay for secure payments with 99.9% uptime and 20% faster checkout', 'Implemented JWT, Nodemailer, and FastAPI for secure user registration, reducing unauthorized access by 40%', 'Managed source code on GitHub, enabling efficient collaboration with 3+ contributors and streamlined version control'],
      technologies: ['MERN Stack', 'Razorpay', 'JWT', 'Nodemailer', 'FastAPI'],
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-purple-400 ${
                    activeSection === section ? 'text-purple-400' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="text-center z-10 px-6">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Aman Verma
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12">
              <span className="animate-typing">Software Developer</span>
            </div>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Computer Science and Engineering graduate with hands-on experience in Java and Data Structures & Algorithms. Skilled in MERN stack development, building scalable and secure full-stack web applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-purple-400 rounded-full font-semibold hover:bg-purple-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </button>
              <button 
                onClick={downloadResume}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full font-semibold hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </button>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <a 
              href="https://github.com/amanverma20" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-slate-800/50 rounded-full hover:bg-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/aman305verma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-slate-800/50 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:amanverma15032003@gmail.com"
              className="p-3 bg-slate-800/50 rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/25"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
        <button 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown size={32} className="text-purple-400" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <p className="text-lg text-gray-300 leading-relaxed">
                Computer Science and Engineering graduate with hands-on experience in Java and Data Structures & Algorithms. Skilled in MERN stack development, building scalable and secure full-stack web applications.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Hands-on experience with AWS, including EC2, S3, RDS, Lambda, IAM, and CloudFormation. Experienced with Docker, CloudWatch, and cloud infrastructure optimization.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full">
                  <Code className="text-purple-400" size={20} />
                  <span>Clean Code</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full">
                  <Palette className="text-pink-400" size={20} />
                  <span>UI/UX Design</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full">
                  <Zap className="text-yellow-400" size={20} />
                  <span>Performance</span>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-1">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="/aman.jpg" 
                      alt="Aman Verma - Software Developer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="group bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                  {skill}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                    <ExternalLink className="text-white" size={24} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-6">
              My professional journey and internship experiences
            </p>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Briefcase size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <h4 className="text-xl font-semibold text-purple-400 mb-2">
                          {exp.company}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400">
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-purple-400 mb-2">Key Achievements:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.achievements.map((achievement) => (
                          <span
                            key={achievement}
                            className="px-3 py-1 bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-300 rounded-full text-sm border border-green-500/20 hover:border-green-400/40 transition-colors duration-300"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-purple-400 mb-2">Technologies Used:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 rounded-full text-sm border border-purple-500/20 hover:border-purple-400/40 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative gradient line */}
                <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${exp.color} rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
          
          {/* Timeline connector */}
          <div className="relative mt-12">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-purple-400 to-transparent"></div>
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 px-6 py-3 rounded-full">
                <Briefcase className="text-purple-400" size={20} />
                <span className="text-gray-300 font-medium">Professional Growth Journey</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-6">
              My academic journey and continuous learning path
            </p>
          </div>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={edu.degree}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${edu.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <GraduationCap size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <h4 className="text-xl font-semibold text-purple-400 mb-2">
                          {edu.institution}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400">
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{edu.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 rounded-full text-sm border border-purple-500/20 hover:border-purple-400/40 transition-colors duration-300"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Decorative gradient line */}
                <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${edu.color} rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
          
          {/* Timeline connector */}
          <div className="relative mt-12">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-purple-400 to-transparent"></div>
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 px-6 py-3 rounded-full">
                <GraduationCap className="text-purple-400" size={20} />
                <span className="text-gray-300 font-medium">Continuous Learning Journey</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-6">
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-slide-in-left">
              <div className="flex items-center space-x-4 p-6 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all duration-300">
                <div className="p-3 bg-purple-600 rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-gray-400">amanverma15032003@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all duration-300">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">LinkedIn</h3>
                  <p className="text-gray-400">linkedin.com/in/aman305verma</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all duration-300">
                <div className="p-3 bg-gray-600 rounded-full">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">GitHub</h3>
                  <p className="text-gray-400">github.com/amanverma20</p>
                </div>
              </div>
            </div>
            <form className="space-y-6 animate-slide-in-right" onSubmit={handleContactSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:border-purple-400 focus:outline-none transition-colors duration-300"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:border-purple-400 focus:outline-none transition-colors duration-300"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:border-purple-400 focus:outline-none transition-colors duration-300 resize-none"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSending}
              >
                {isSending ? 'Sending…' : 'Send Message'}
              </button>
              {sendStatus === 'success' && (
                <div className="text-green-400 text-sm">Thanks! Your message has been sent.</div>
              )}
              {sendStatus === 'error' && (
                <div className="text-red-400 text-sm">{sendError || 'Something went wrong.'}</div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Aman Verma. Crafted with ❤️ and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;