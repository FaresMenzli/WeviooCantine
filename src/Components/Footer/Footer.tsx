import { FC, useEffect, useState } from "react";
import styles from "./Footer.module.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

 
const Footer: FC = () => {
    const { user } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        user?setLoggedIn(true):setLoggedIn(false)
      }, [user])
      
    const navigate = useNavigate();
    return ( <>
    {loggedIn?<></>:
    <div className={`${styles.footerwrapper} d-flex align-items-center  justify-content-center `}>
        <div>
    you are not logged in , please <b className="clickable" onClick={()=>navigate("/login")}>log in</b></div>
    </div> 
    }
    </>
    
    
    );
}
 
export default Footer;