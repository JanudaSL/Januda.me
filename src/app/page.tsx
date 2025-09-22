import Header from './components/Header';
import Intro from './components/intro'; 
import About from './components/About';
import Skill from './components/Skill';
import Offer from './components/Offer';
import Exp from './components/Exp';
import Recomnd from './components/Recomnd';
import Hire from './components/Hire';
import Other from './components/Other';

export default function HomePage() {
  return (
    <>
      <Header />
      <Intro />
      <About />
      <Skill />
      <Offer />
      <Exp />
      <Recomnd />
      <Hire />
      <Other />
    </>
  );
}