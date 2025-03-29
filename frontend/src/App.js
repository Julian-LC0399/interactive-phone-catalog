import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadForm from './components/LeadForm/LeadForm';
import Chatbot from './components/Chatbot/Chatbot';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PhoneList from './components/PhoneList/PhoneList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<PhoneList />} />
            <Route path="/lead-form" element={<LeadForm />} />
          </Routes>
        </main>
        <Chatbot /> {/* Aparece en todas las páginas */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;