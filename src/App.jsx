import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Desktop from './components/Desktop';

export default function App() {
  return (
    <ThemeProvider>
      <div className="fixed inset-0 overflow-hidden bg-black">
        <Desktop />
      </div>
    </ThemeProvider>
  );
}
