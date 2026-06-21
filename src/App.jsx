import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <ThemeProvider>
      <div className="fixed inset-0 overflow-hidden bg-black" style={{ userSelect: 'none' }}>
        {!booted ? (
          <BootScreen onComplete={() => setBooted(true)} />
        ) : (
          <Desktop />
        )}
      </div>
    </ThemeProvider>
  );
}