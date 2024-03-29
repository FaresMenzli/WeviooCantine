import { FunctionComponent } from "react";
import { ReactComponent as AnimatedSVG } from './LogoWeviooAnim.svg';
import styles from "./WeviooSpinner.module.css"

interface Props {
    
}
 
const WeviooSpinner : FunctionComponent<Props> = () => {
    return (<div className={`${styles.spinner} d-flex justify-content-center align-items-center `}><AnimatedSVG className="weviooSpinner"></AnimatedSVG></div>
     );
}
 
export default WeviooSpinner;