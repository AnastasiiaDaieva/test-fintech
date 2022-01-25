import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
