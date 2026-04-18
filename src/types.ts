import React from 'react';

export interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'system';
  content: string | React.ReactNode;
  prompt?: string;
}

export interface CommandDefinition {
  description: string;
  action: (args: string[]) => string | React.ReactNode | Promise<string | React.ReactNode>;
}

export interface CommandRegistry {
  [key: string]: CommandDefinition;
}
