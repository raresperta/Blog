import { useNavigate } from "react-router-dom";
import "../../styles/music/tutorialsCard.css";
function TutorialsCard({ tutorials }) {
  const navigate = useNavigate();

  return (
    <div className="music-card"onClick={() => navigate("/music/learning")}>
      <div className="card-header">
        <h3>📚 Ce învăț</h3>

        <span >
          Vezi toate
        </span>
      </div>

      <div className="tutorial-list">
        {tutorials.map((tutorial) => (
          <div className="tutorial-item" key={tutorial.id}>
            <img src={tutorial.coverImage} alt="" />

            <div className="tutorial-meta">
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