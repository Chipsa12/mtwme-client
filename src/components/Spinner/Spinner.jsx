import {TailSpin} from 'react-loader-spinner';
import { useSelector } from 'react-redux';

import styles from './Spinner.module.css';

const Spinner = () => {

    const loader = useSelector(state => state.app.loader);

    return (
        <div className={!loader ? styles.container : styles.visible}>
            <div className={styles.spinner}>
                <TailSpin color="#00BFFF" height={100} width={100} />
            </div>
        </div>
    )
}

export default Spinner;