import React from 'react';
import { CommandRegistry } from '../types';

export const COMMANDS: CommandRegistry = {
  help: {
    description: 'List all available commands',
    action: () => {
      const list = Object.keys(COMMANDS).sort().map(cmd => {
        return `<span class="text-green-400 font-bold">${cmd}</span> - ${COMMANDS[cmd].description}`;
      }).join('\n');
      return list;
    }
  },
  whoami: {
    description: 'Display current user information',
    action: () => 'bl4ck30x@kali (Wahiduddin Samani) - Full-Stack Developer • Security Researcher • Production Infrastructure'
  },
  pwd: {
    description: 'Print working directory',
    action: () => '/home/bl4ck30x/portfolio'
  },
  projects: {
    description: 'List major projects',
    action: () => {
      return `
<span class="text-blue-400 font-bold">VaultGuard</span> - Security detection and secret scanning tool
<span class="text-blue-400 font-bold">GitTracker</span> - Repository analytics and monitoring tool
<span class="text-gray-400">Multiple private tools and internal systems...</span>
      `.trim();
    }
  },
  techstack: {
    description: 'Display technical stack',
    action: () => {
      return `
<span class="text-green-400 font-bold">Languages:</span> TypeScript, JavaScript, Python, Go, Rust, Dart, Kotlin
<span class="text-green-400 font-bold">Frameworks:</span> React, Next.js, NestJS, Express.js
<span class="text-green-400 font-bold">Databases:</span> PostgreSQL, MongoDB, ClickHouse
<span class="text-green-400 font-bold">Tools:</span> Docker, Git, Tauri, Flutter, Shell
      `.trim();
    }
  },
  contact: {
    description: 'Display contact information',
    action: () => {
      return `
<span class="text-blue-400 font-bold">Email:</span> samaniwahiduddin382@gmail.com
<span class="text-blue-400 font-bold">LinkedIn:</span> https://linkedin.com/in/samani-wahiduddin
<span class="text-blue-400 font-bold">GitHub:</span> https://github.com/w1hi4
      `.trim();
    }
  },
  about: {
    description: 'Information about Wahiduddin',
    action: () => 'Wahiduddin Samani is a Full-Stack Developer specializing in real-time systems, security-focused applications, and scalable backend architecture. Based in Mumbai, India.'
  },
  clear: {
    description: 'Clear the terminal screen',
    action: () => '' // Handled in the terminal component
  }
};
