import styles from './ErrorMessage.module.scss';


interface ErrorMessageProps {
  error: Error;
  resetErrorBoundary?: () => void;
};

export default function ErrorMessage({error}: ErrorMessageProps) {
  return (
    <div className={styles.error} role="alert">{error.message}</div>
  );
}
