import "../../styles/movie/soundtrack.css";
function Soundtrack() {
  return (
    <div className="fj-card fj-soundtrack">
      <div className="fj-section-title">
        <h3>SOUNDTRACK</h3>
        <span>mood, atmosphere</span>
      </div>

      <div className="fj-tracks">
        <div className="fj-track">
          <div>
            <p>night drive</p>
            <span>8 tracks</span>
          </div>

          <time>32:14</time>
        </div>

        <div className="fj-track">
          <div>
            <p>melancholy ending</p>
            <span>12 tracks</span>
          </div>

          <time>45:21</time>
        </div>

        <div className="fj-track">
          <div>
            <p>empty city</p>
            <span>9 tracks</span>
          </div>

          <time>27:09</time>
        </div>
      </div>
    </div>
  );
}

export default Soundtrack;