import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  let navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/clientA")}>Continue as client-A</button>
      <button onClick={() => navigate("/clientB")}>Continue as client-B</button>
    </div>
  );
};

export default LandingPage;
