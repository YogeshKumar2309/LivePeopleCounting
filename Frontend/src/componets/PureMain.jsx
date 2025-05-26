import styles from './PureMain.module.css';

const PureMain = ({children}) => {
  return <div className={styles.myContainer}>
{children}
  </div>;
};

export default PureMain;
