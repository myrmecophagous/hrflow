import Image from 'next/image';
import Link from 'next/link';

import styles from './Footer.module.scss';


const ICON_SIZE = 24;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>HrFlow.ai coding challenge, 2024</div>
      <div className={styles.media}>
        <Link href="https://www.linkedin.com/in/akhanovegor/" aria-label="Developer's LinkedIn profile">
          <Image src="/images/icons/linkedin.svg" alt="" role="presentation" width={ICON_SIZE} height={ICON_SIZE} />
        </Link>
      </div>
    </footer>
  );
}
