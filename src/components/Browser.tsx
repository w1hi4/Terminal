import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Users, MapPin, Link as LinkIcon, Mail, Search, ArrowLeft, ArrowRight, RotateCcw, Home, Plus, MoreHorizontal, Folder, Lock, Globe, AlertCircle } from 'lucide-react';

const Browser: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('https://github.com/w1hi4');
  const [displayUrl, setDisplayUrl] = useState('https://github.com/w1hi4');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'home' | 'github' | 'iframe'>('github');
  const [iframeError, setIframeError] = useState(false);

  const fetchGitHubData = async (username: string) => {
    setLoading(true);
    setIframeError(false);
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('User not found');
      const userData = await userRes.json();
      setUserData(userData);

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      const reposData = await reposRes.json();
      setRepos(reposData);
      setView('github');
      const newUrl = `https://github.com/${username}`;
      setUrl(newUrl);
      setDisplayUrl(newUrl);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setView('home');
      setDisplayUrl('w1hi4://error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData('w1hi4');
  }, []);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    const target = searchQuery.trim();
    if (!target) return;

    if (target.startsWith('http://') || target.startsWith('https://')) {
      setLoading(true);
      setView('iframe');
      setUrl(target);
      setDisplayUrl(target);
      setIframeError(false);
      // Simulate network delay for "realism"
      setTimeout(() => setLoading(false), 800);
    } else if (target.includes('.') && !target.includes(' ')) {
      const formattedUrl = `https://${target}`;
      setLoading(true);
      setView('iframe');
      setUrl(formattedUrl);
      setDisplayUrl(formattedUrl);
      setIframeError(false);
      setTimeout(() => setLoading(false), 800);
    } else {
      fetchGitHubData(target);
    }
  };

  const goHome = () => {
    setView('home');
    setDisplayUrl('w1hi4://home');
    setSearchQuery('');
  };

  return (
    <div className="h-full w-full bg-[#0d1117] flex flex-col text-[#c9d1d9] font-sans overflow-hidden">
      {/* Browser Toolbar */}
      <div className="bg-[#161b22] p-2 border-b border-white/10 flex items-center gap-3">
        <div className="flex gap-2 ml-2">
          <ArrowLeft onClick={goHome} className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" />
          <ArrowRight className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" />
          <RotateCcw 
            onClick={() => view === 'github' ? fetchGitHubData(userData?.login || 'w1hi4') : setUrl(url + '')} 
            className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" 
          />
          <Home 
            onClick={goHome}
            className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" 
          />
        </div>
        <form onSubmit={handleNavigate} className="flex-1 bg-[#0d1117] border border-white/10 rounded-full px-4 py-1 flex items-center gap-2 text-xs text-white/60">
          <Lock className={`w-3 h-3 ${displayUrl.startsWith('https') ? 'text-green-500' : 'text-white/20'}`} />
          <input 
            type="text"
            className="bg-transparent border-none outline-none flex-1 text-white/80"
            value={searchQuery || displayUrl}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </form>
        <div className="flex gap-2 mr-2">
          <Plus className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" />
          <MoreHorizontal className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#0d1117]">
        {loading && (
          <div className="absolute inset-0 z-50 bg-[#0d1117] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-xs text-white/40 font-mono uppercase tracking-[0.3em]">Resolving Host...</p>
          </div>
        )}

        {view === 'home' ? (
          <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0d1117] to-[#010409]">
            <div className="mb-12 text-center">
              <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">w1hi4 Search</h1>
              <p className="text-white/40 uppercase tracking-[0.5em] text-[10px]">The Gateway to the Web</p>
            </div>
            <form onSubmit={handleNavigate} className="w-full max-w-2xl relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text"
                placeholder="Search GitHub or enter URL (e.g. wikipedia.org)..."
                className="w-full bg-[#161b22] border border-white/10 rounded-full py-4 pl-16 pr-6 text-white outline-none focus:border-blue-500/50 focus:bg-[#1c2128] transition-all shadow-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <div className="mt-12 flex gap-4">
              <button onClick={() => fetchGitHubData('w1hi4')} className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-all">My Profile</button>
              <button onClick={() => { setSearchQuery('wikipedia.org'); }} className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-all">Try Wikipedia</button>
            </div>
          </div>
        ) : view === 'iframe' ? (
          <div className="h-full w-full flex flex-col">
            <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <p className="text-[10px] text-yellow-500/80 leading-tight">
                <b>Security Note:</b> Some websites (Google, YouTube, etc.) block being loaded in windows. If the screen is blank, the site has "X-Frame-Options" enabled.
              </p>
            </div>
            <iframe 
              src={url} 
              className="flex-1 w-full bg-white"
              title="Web Content"
              onLoad={() => setLoading(false)}
              onError={() => setIframeError(true)}
            />
            {iframeError && (
              <div className="absolute inset-0 bg-[#0d1117] flex flex-col items-center justify-center p-8 text-center">
                <Globe className="w-16 h-16 text-white/10 mb-6" />
                <h2 className="text-xl font-bold text-white mb-2">Connection Refused</h2>
                <p className="text-sm text-white/40 max-w-md">
                  This website refused to connect because it forbids being loaded inside an iframe for security reasons.
                </p>
                <button onClick={goHome} className="mt-8 px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-bold transition-all">
                  Return to Home
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-4 md:p-8 scrollbar-hide">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="relative group">
                  <div className="w-full aspect-square rounded-full border border-white/10 overflow-hidden bg-[#161b22]">
                    <img 
                      src={userData?.avatar_url || "https://github.com/w1hi4.png"} 
                      alt="w1hi4" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-white leading-tight">{userData?.name || "Wahiduddin Samani"}</h1>
                  <p className="text-xl text-white/60 font-light">{userData?.login || "w1hi4"}</p>
                </div>

                <p className="text-sm leading-relaxed">
                  {userData?.bio || "Full-Stack Developer • Security Researcher • Production Infrastructure"}
                </p>

                <button className="w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] border border-white/10 rounded-md text-sm font-semibold transition-colors">
                  Follow
                </button>

                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                    <Users className="w-4 h-4" />
                    <span className="font-bold text-white">{userData?.followers || "0"}</span> followers
                  </div>
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                    <span className="font-bold text-white">{userData?.following || "0"}</span> following
                  </div>
                </div>

                <div className="space-y-2 text-sm text-white/80">
                  {userData?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/40" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData?.blog && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-white/40" />
                      <a href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{userData.blog}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-white/40" />
                    <span>samaniwahiduddin382@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-8">
                {/* Tabs */}
                <div className="flex items-center gap-6 border-b border-white/10 text-sm pb-3">
                  <div className="flex items-center gap-2 border-b-2 border-[#f78166] pb-3 -mb-3 text-white font-semibold cursor-pointer">
                    <Github className="w-4 h-4" /> Overview
                  </div>
                  <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <Folder className="w-4 h-4" /> Repositories <span className="bg-[#21262d] px-2 rounded-full text-xs">{userData?.public_repos || "0"}</span>
                  </div>
                </div>

                {/* Repos */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold">Popular Repositories</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repos.map((repo, i) => (
                      <div key={i} className="p-4 bg-[#0d1117] border border-white/10 rounded-md hover:border-white/30 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-blue-400 font-bold">
                            <Folder className="w-4 h-4" />
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">{repo.name}</a>
                          </div>
                          <span className="text-[10px] border border-white/10 px-2 rounded-full text-white/40 uppercase">{repo.visibility || "Public"}</span>
                        </div>
                        <p className="text-xs text-white/60 mb-4 line-clamp-2">{repo.description || "No description provided."}</p>
                        <div className="flex items-center gap-4 text-[10px] text-white/40">
                          {repo.language && (
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                              {repo.language}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" /> {repo.stargazers_count}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" /> {repo.forks_count}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browser;
