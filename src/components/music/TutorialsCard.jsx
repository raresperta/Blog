import SectionHeader from "./SectionHeader";

function TutorialsCard({ tutorials }) {
  return (
    <div className="music-card">

      <SectionHeader
        title="📚 Ce învăț"
      />

      <div className="tutorial-list">

        {tutorials.map((tutorial) => (
          <div
            className="tutorial-item"
            key={tutorial.id}
          >

            <img
              src={tutorial.image}
              alt=""
            />

            <div>
              <h4>{tutorial.title}</h4>
              <p>{tutorial.creator}</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TutorialsCard;