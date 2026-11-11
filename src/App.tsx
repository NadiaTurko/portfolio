import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import GitHubActivity from "./components/github/GitHubActivity";
import Qualification from "./components/qualification/Qualification";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import ScrollUp from "./components/scrollup/ScrollUp";
import ScrollProgress from "./components/common/ScrollProgress";
import CodeRain from "./components/common/CodeRain";
import PointerEffects from "./components/common/PointerEffects";

const App = () => {
  return (
    <>
      <CodeRain />
      <PointerEffects />
      <ScrollProgress />
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Projects />
        <GitHubActivity />
        <Qualification />
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
};

export default App;
