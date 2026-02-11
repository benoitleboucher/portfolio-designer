import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Accomplishments from './components/Accomplishments';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll behavior for the entire app
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optional: Custom cursor effect (desktop only)
    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        }
      }
    };

    // Optional: Add custom cursor element
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.className =
      'pointer-events-none fixed w-8 h-8 border-2 border-accent/50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out z-50 hidden md:block';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', handleMouseMove);

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"]'
    );

    const handleMouseEnter = () => {
      if (cursor) cursor.classList.add('scale-150');
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.classList.remove('scale-150');
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (cursor && document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-deep-black text-white overflow-x-hidden custom-scrollbar">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Accomplishments />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Background Pattern (Optional) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
