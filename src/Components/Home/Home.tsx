import React, { FC } from "react";
import WeviooNavbar from "../WeviooNavbar/WeviooNavbar";
import styles from "./Home.module.css";
import { showToast } from "../Toaster/toasterService";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.homeBg}>
      <WeviooNavbar></WeviooNavbar>
      <div className={styles.homeMsg}>
        {" "}
        <h3 className="white text-center pt-5">
          Welcome to Wevioo Canteen . bon Apetit!
        </h3>
        <div className={`d-flex flex-column ${styles.homeLogos}`} >
        <img className='weviooLogo' src={require('../../assets/logo_0.png')} alt="weviooLogo" />
        <img className="cantineLogo m-auto" src={require('../../assets/cantine.png')} alt="cantineLogo" />
        </div>
        <div className="wrapper">
  <div className="reseveDish clickable" onClick={()=>{showToast("test");navigate("/dishes")}}><span>Reserve a dish</span></div>
</div>
      </div>
  <ToastContainer></ToastContainer>

    </div>
  );
};

export default Home;
