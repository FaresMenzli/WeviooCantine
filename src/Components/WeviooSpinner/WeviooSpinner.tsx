import { FunctionComponent } from "react";
import { ReactComponent as AnimatedSVG } from './LogoWeviooAnim.svg';
import styles from "./WeviooSpinner.module.css"

interface Props {
    chart?:boolean
}
 
const WeviooSpinner : FunctionComponent<Props> = (props) => {
    return (<div className={`${props.chart?'h-100 ':' '}${styles.spinner} d-flex justify-content-center align-items-center`}><AnimatedSVG className={"weviooSpinner "+(props.chart ? styles.chartSpinner  : '')}></AnimatedSVG></div>
     );
}
 
export default WeviooSpinner;