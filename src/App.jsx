import './App.css';
import Header from './componentes/Header';
import Estadisticas from './componentes/Estadisticas';
import Botones from './componentes/Botones';
import Footer from './componentes/Footer';
import Contact from './Pages/Contact';

function App() {
  return (
    <div className="nutrick-app">
      <Header />

      <main className="main-content">
        <section className="top-nav">
          <Botones />
        </section>

        <Contact />

        <section className="stats-section">
          <Estadisticas />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
