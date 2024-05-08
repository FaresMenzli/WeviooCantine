import { FC } from "react";
import "./Unauthorized.css"
import WeviooNavbar from "../WeviooNavbar/WeviooNavbar";

interface UnauthorizedProps {
    
}
 
const Unauthorized: FC<UnauthorizedProps> = () => {
    return (   <div className="unauthorizedBg">
    <WeviooNavbar></WeviooNavbar>
    
    <div className="unauthorized-container">
    <div className="content">
      <h1>Oops! You're unauthorized to access this page</h1>
      <p>Please return to <a>home Page</a>.</p>
    </div>
  </div> 
  </div>);
}
 
export default Unauthorized;