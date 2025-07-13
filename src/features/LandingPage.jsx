import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome</h1>
      <div className="button-group">
        <button onClick={() => navigate("/clientA")} className="landing-button">
          Continue as Client-A
        </button>
        <button onClick={() => navigate("/clientB")} className="landing-button">
          Continue as Client-B
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
