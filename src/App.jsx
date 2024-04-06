// App.jsx
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css'
import { DataProvider } from './DataContext';
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from "./Books";
import Author from "./Author";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <Dashboard />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/Author" element={<Author />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
