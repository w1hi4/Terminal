import React from 'react';

const PortfolioText: React.FC = () => {
  return (
    <div className="h-full w-full bg-[#0d1117] text-[#c9d1d9] p-4 sm:p-8 font-sans overflow-y-auto selection:bg-blue-500/30">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-10">
        <header className="text-center space-y-6">
          <img 
            src="https://readme-typing-svg.herokuapp.com?lines=Full-Stack+Developer;Security+Researcher;Production+Infrastructure&center=true&width=650&height=55&color=58a6ff" 
            alt="Typing SVG" 
            className="mx-auto max-w-full h-auto"
          />
          
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com/w1hi4" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/GitHub-w1hi4-181717?style=for-the-badge&logo=github" alt="GitHub" />
            </a>
            <img src="https://komarev.com/ghpvc/?username=w1hi4&label=Visitors&color=0e75b6&style=for-the-badge" alt="Visitors" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <img src="https://img.shields.io/badge/Location-Mumbai%2C%20India-FF6B6B?style=for-the-badge" alt="Location" />
            <img src="https://img.shields.io/badge/Timezone-UTC%2B05:30-4ECDC4?style=for-the-badge" alt="Timezone" />
            <a href="https://linkedin.com/in/samani-wahiduddin" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn" />
            </a>
          </div>
        </header>

        <hr className="border-white/10" />

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-2xl">🧠</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">About Me</h2>
          </div>
          
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 space-y-4 shadow-xl">
            <p className="text-lg leading-relaxed">
              <strong className="text-blue-400">Wahiduddin Samani</strong> — Full-Stack Developer specializing in real-time systems, security-focused applications, and scalable backend architecture.
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '📡', text: 'Real-time systems (WebSockets, tracking platforms)' },
                { icon: '🔐', text: 'Security engineering & detection systems' },
                { icon: '🤖', text: 'Automation pipelines and large-scale data processing' },
                { icon: '🖥️', text: 'Cross-platform development (Web • Mobile • Desktop)' },
                { icon: '⚙️', text: 'Backend architecture and distributed services' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 p-3 bg-[#0d1117] rounded-lg border border-white/5 hover:border-blue-500/30 transition-all hover:scale-[1.02]">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-white/80">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#161b22] border border-white/10 rounded-xl space-y-2 hover:border-blue-500/30 transition-all shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">🔐</span>
                <h3 className="font-bold text-white">VaultGuard</h3>
              </div>
              <p className="text-sm text-white/60">Security detection and secret scanning tool designed for modern development workflows.</p>
            </div>
            <div className="p-6 bg-[#161b22] border border-white/10 rounded-xl space-y-2 hover:border-blue-500/30 transition-all shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">📊</span>
                <h3 className="font-bold text-white">GitTracker</h3>
              </div>
              <p className="text-sm text-white/60">Comprehensive repository analytics and monitoring tool for tracking development activity.</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/40 italic font-mono">⚡ Multiple private tools and internal systems...</p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">GitHub Activity</h2>
          </div>
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 flex justify-center shadow-lg">
            <img 
              src="https://streak-stats.demolab.com?user=w1hi4&theme=tokyonight&hide_border=true" 
              alt="GitHub Streak" 
              className="max-w-full rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-2xl">🔥</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Contribution Graph</h2>
          </div>
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 flex justify-center shadow-lg">
            <img 
              src="https://github-readme-activity-graph.vercel.app/graph?username=w1hi4&theme=tokyo-night&hide_border=true" 
              alt="Contribution Graph"
              className="max-w-full rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-2xl">⚙️</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Tech Stack</h2>
          </div>
          
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 space-y-8 shadow-lg">
            <div className="flex flex-wrap justify-center p-2 bg-[#0d1117] rounded-lg border border-white/5">
              <img src="https://skillicons.dev/icons?i=ts,js,nodejs,react,nextjs,nestjs,postgres,mongodb,python,go,rust,dart,flutter,kotlin,docker,git&perline=8" alt="Tech StackIcons" className="max-w-full" referrerPolicy="no-referrer" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Express.js', color: '000000', logo: 'express' },
                { name: 'ClickHouse', color: 'FFCC00', logo: 'clickhouse', logoColor: 'black' },
                { name: 'Tauri', color: '24C8DB', logo: 'tauri' },
                { name: 'Shell', color: '121011', logo: 'gnu-bash' }
              ].map((badge, i) => (
                <img 
                  key={i} 
                  src={`https://img.shields.io/badge/${badge.name}-${badge.color}?style=for-the-badge&logo=${badge.logo}&logoColor=${badge.logoColor || 'white'}`} 
                  alt={badge.name} 
                  className="hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            
            <p className="text-center text-xs text-white/40 uppercase tracking-[0.4em] font-bold">
              MERN Stack • Real-time Systems • Distributed Systems • Cross-Platform Apps
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-2xl">🐍</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Contribution Snake</h2>
          </div>
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 flex justify-center shadow-lg">
            <img 
              src="https://raw.githubusercontent.com/w1hi4/w1hi4/output/github-contribution-grid-snake.svg" 
              alt="Contribution Snake"
              className="max-w-full rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-2xl">📬</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Contact</h2>
          </div>
          
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Direct Email</p>
                <a href="mailto:samaniwahiduddin382@gmail.com" className="text-base sm:text-lg text-blue-400 hover:text-blue-300 transition-colors font-medium break-all">samaniwahiduddin382@gmail.com</a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Professional Network</p>
                <a href="https://linkedin.com/in/samani-wahiduddin" target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg text-blue-400 hover:text-blue-300 transition-colors font-medium break-all">linkedin.com/in/samani-wahiduddin</a>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-12 pb-12 text-center border-t border-white/10">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] font-bold">
            Built for real-world systems • Focused on performance, scalability, and reliability
          </p>
          <p className="text-[10px] text-white/10 uppercase tracking-[0.3em] mt-4">
            © 2026 bl4ck30x OS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioText;
