import './App.css';
import { NotesProvider } from './context/NotesContext';
import NoteApp from './components/NoteApp';

function App() {
  return (
    <NotesProvider>
      <NoteApp />
    </NotesProvider>
  );
}

export default App;
