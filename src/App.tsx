import { useState, useEffect, useRef } from 'react';
import { Terminal, Github, Linkedin, Mail, Phone } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: JSX.Element | string }>>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory([{
      command: '',
      output: (
        <div className="mb-4">
          <pre className="text-green-400 mb-2 text-sm">
{`
   ▄████████    ▄████████  ▄█  ███▄▄▄▄    ████████▄
  ███    ███   ███    ███ ███  ███▀▀▀██▄  ███   ▀███
  ███    ███   ███    ███ ███▌ ███   ███  ███    ███
  ███    ███  ▄███▄▄▄▄██▀ ███▌ ███   ███  ███    ███
▀███████████ ▀▀███▀▀▀▀▀   ███▌ ███   ███  ███    ███
  ███    ███ ▀███████████ ███  ███   ███  ███    ███
  ███    ███   ███    ███ ███  ███   ███  ███   ▄███
  ███    █▀    ███    ███ █▀    ▀█   █▀   ████████▀
`}
          </pre>
          <p className="text-gray-400 mb-4">Welcome to Amir H Sabri's Terminal Portfolio</p>
          <p className="text-gray-500 text-sm mb-2">Type <span className="text-yellow-400">'help'</span> to see available commands</p>
        </div>
      )
    }]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => JSX.Element | string> = {
    help: () => (
      <div className="text-gray-300">
        <p className="text-green-400 font-semibold mb-2">Available Commands:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
          <p><span className="text-yellow-400">about</span> - Display summary</p>
          <p><span className="text-yellow-400">experience</span> - Show work experience</p>
          <p><span className="text-yellow-400">education</span> - Show education</p>
          <p><span className="text-yellow-400">skills</span> - List technical skills</p>
          <p><span className="text-yellow-400">contact</span> - Show contact information</p>
          <p><span className="text-yellow-400">resume</span> - Download resume</p>
          <p><span className="text-yellow-400">github</span> - Open GitHub profile</p>
          <p><span className="text-yellow-400">linkedin</span> - Open LinkedIn profile</p>
          <p><span className="text-yellow-400">clear</span> - Clear terminal</p>
          <p><span className="text-yellow-400">help</span> - Show this help message</p>
        </div>
      </div>
    ),

    about: () => (
      <div className="text-gray-300">
        <p className="text-green-400 font-semibold mb-2">$ whoami</p>
        <div className="ml-4 space-y-2">
          <p className="text-blue-400 font-semibold">Amir H Sabri</p>
          <p className="text-gray-400">Back-End Engineer & AI Master's Student</p>
          <p className="text-gray-400">Username: <span className="text-cyan-400">assaabriiii</span></p>
          <p className="mt-3">
            As a passionate Back-End Engineer with a strong foundation in server-side
            technologies and a commitment to building efficient, scalable applications,
            I am eager to contribute my skills to dynamic teams. My experience in
            developing robust APIs and optimizing database performance aligns perfectly
            with modern development goals.
          </p>
        </div>
      </div>
    ),

    experience: () => (
      <div className="text-gray-300">
        <p className="text-green-400 font-semibold mb-3">$ cat experience.log</p>
        <div className="ml-4 space-y-4">
          <div className="border-l-2 border-blue-400 pl-4">
            <p className="text-blue-400 font-semibold">Back-End Engineer @ Fidar Dedenegar</p>
            <p className="text-gray-500 text-sm mb-2">January 2021 - Present | Tehran</p>
            <ul className="text-sm space-y-1 text-gray-400">
              <li>→ Engineered secure RESTful APIs with Django REST Framework</li>
              <li>→ Integrated WebSockets for real-time features</li>
              <li>→ Utilized Kafka & Redis for event streaming and caching</li>
              <li>→ Implemented Celery for async processing</li>
              <li>→ Worked with PostgreSQL, MySQL & Elasticsearch</li>
              <li>→ Deployed with Docker & Kubernetes</li>
            </ul>
          </div>

          <div className="border-l-2 border-purple-400 pl-4">
            <p className="text-purple-400 font-semibold">Back-End Engineer @ Ryca</p>
            <p className="text-gray-500 text-sm mb-2">June 2025 - September 2025 | Shahrood</p>
            <ul className="text-sm space-y-1 text-gray-400">
              <li>→ Built real-time city bus tracking system</li>
              <li>→ Django Channels for live location updates</li>
              <li>→ PostGIS & GeoDjango for geolocation tracking</li>
              <li>→ Optimized with Redis caching & Celery</li>
              <li>→ CI/CD pipelines with Docker</li>
            </ul>
          </div>
        </div>
      </div>
    ),

    education: () => (
      <div className="text-gray-300">
        <p className="text-green-400 font-semibold mb-3">$ cat education.txt</p>
        <div className="ml-4">
          <div className="border-l-2 border-cyan-400 pl-4">
            <p className="text-cyan-400 font-semibold">Bachelor of Computer Science</p>
            <p className="text-gray-400">Shahrood University of Technology</p>
            <p className="text-gray-500 text-sm">2025 | GPA: 17.92/20</p>
            <p className="text-gray-500 text-sm">Location: Shahrood, Iran</p>
          </div>
        </div>
      </div>
    ),

    skills: () => (
      <div className="text-gray-300">
        <p className="text-green-400 font-semibold mb-3">$ ls -la ./skills/</p>
        <div className="ml-4 space-y-2 font-mono text-sm">
          <p><span className="text-blue-400">drwxr-xr-x</span> languages/     → Python, Django, DRF</p>
          <p><span className="text-purple-400">drwxr-xr-x</span> databases/     → PostgreSQL, MySQL, Redis, Elasticsearch</p>
          <p><span className="text-green-400">drwxr-xr-x</span> brokers/       → Kafka, RabbitMQ, Celery</p>
          <p><span className="text-yellow-400">drwxr-xr-x</span> devops/        → Docker, Kubernetes, Git, CI/CD</p>
          <p><span className="text-cyan-400">drwxr-xr-x</span> systems/       → Unix, Linux, Microservices</p>
          <p><span className="text-pink-400">drwxr-xr-x</span> protocols/     → REST, WebSocket</p>
          <p><span className="text-orange-400">drwxr-xr-x</span> tools/         → Postman, Insomnia, Playwright</p>
        </div>
      </div>
    ),

    contact: () => (
      <div className="text-gray-300">
        <p className="text-green-400 font-semibold mb-3">$ cat contact.json</p>
        <div className="ml-4 font-mono text-sm">
          <pre className="text-gray-400">{`{
  "name": "Amir H Sabri",
  "username": "assaabriiii",
  "email": "amirsbry1942@gmail.com",
  "phone": "+98 901 377 0964",
  "location": "Iran",
  "links": {
    "github": "https://github.com/assaabriiii",
    "linkedin": "https://linkedin.com/in/amir-sabri-934622220"
  }
}`}</pre>
        </div>
      </div>
    ),

    resume: () => {
      window.open('/784991e8-aa18-42b3-ba75-bb69470bb517.pdf', '_blank');
      return (
        <div className="text-gray-300">
          <p className="text-green-400">✓ Opening resume PDF in new tab...</p>
        </div>
      );
    },

    github: () => {
      window.open('https://github.com/assaabriiii', '_blank');
      return (
        <div className="text-gray-300">
          <p className="text-green-400">✓ Opening GitHub profile...</p>
        </div>
      );
    },

    linkedin: () => {
      window.open('https://linkedin.com/in/amir-sabri-934622220', '_blank');
      return (
        <div className="text-gray-300">
          <p className="text-green-400">✓ Opening LinkedIn profile...</p>
        </div>
      );
    },

    clear: () => {
      setHistory([]);
      return '';
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;

    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    let output: JSX.Element | string;

    if (commands[trimmedCmd]) {
      output = commands[trimmedCmd]();
    } else {
      output = (
        <div className="text-red-400">
          <p>Command not found: {cmd}</p>
          <p className="text-gray-500 text-sm mt-1">Type 'help' for available commands</p>
        </div>
      );
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono p-4"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Terminal size={16} className="text-gray-400" />
              <span className="text-gray-400 text-sm">assaabriiii@portfolio:~</span>
            </div>
          </div>

          <div
            ref={terminalRef}
            className="p-6 h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
          >
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.command && (
                  <div className="flex gap-2 mb-2">
                    <span className="text-blue-400">guest@terminal:~$</span>
                    <span className="text-gray-300">{item.command}</span>
                  </div>
                )}
                <div className="mb-2">{item.output}</div>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <span className="text-blue-400">guest@terminal:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-gray-300"
                autoFocus
                spellCheck={false}
              />
            </form>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4 text-gray-500 text-sm">
          <a
            href="mailto:amirsbry1942@gmail.com"
            className="hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <Mail size={14} />
            Email
          </a>
          <a
            href="https://github.com/assaabriiii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/amir-sabri-934622220"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href="tel:+989013770964"
            className="hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <Phone size={14} />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
