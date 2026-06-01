import "../styles/movie/filmJournal.css";

import Sidebar from "../components/movie/Sidebar";
import Hero from "../components/movie/Hero";
import VisualBoard from "../components/movie/VisualBoard";
import SneakPeeks from "../components/movie/SneakPeeks";
import Frames from "../components/movie/Frames";
import IdeaVault from "../components/movie/IdeaVault";
import Soundtrack from "../components/movie/Soundtrack";
import Projects from "../components/movie/Projects";

function FilmJournal() {
  return (
    <div className="film-journal-page">
      <div className="fj-grain"></div>

      <div className="fj-layout">
        <Sidebar />

        <main className="fj-main-content">
          <Hero />

          <section className="fj-content-grid">
            <Projects />

            <VisualBoard />

            <SneakPeeks />

            <Frames />

            <div className="fj-right-column">
              <IdeaVault />
              <Soundtrack />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FilmJournal;
