import styles from './DashboardComponent.module.css';

/* eslint-disable-next-line */
export interface DashboardComponentProps {}

export function DashboardComponent(props: DashboardComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DashboardComponent!</h1>
    </div>
  );
}

export default DashboardComponent;
