import { FC, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./RedirectCounterComponent.module.css"
interface RedirectCounterComponentProps {
  /*   options:any  ={
        redirect?:string,
        TimeBeforeRedirect?:tring,
        message?:string    } */
    
}
 
const RedirectCounterComponent: FC<RedirectCounterComponentProps> = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate =useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
 setTimeout(()=> setIsOpen(true),200)
   
  }, []);
  useEffect(() => {
   
      const countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
        console.log(countdown)
      }, 1000); 
      if(countdown===0){
       navigate("/login")
      }
      return () => {
        clearInterval(countdownInterval);
      };
    
     }, [countdown])
    return ( 
    <div className={styles.redirectCounterWrapper} >
              <div  className={`${styles.redirectCounterContent} ${isOpen ? styles.open : ''}`}>you will be redirect to Login in {countdown}</div>
              </div>
     );
}
 
export default RedirectCounterComponent;