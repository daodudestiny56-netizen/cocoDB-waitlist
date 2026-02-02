import { Hero } from './components/Hero';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="bg-background min-h-screen text-white selection:bg-primary/30">
      <Hero />
      <Footer />
    </main>
  );
}

export default App;
