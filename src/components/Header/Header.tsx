import Image from "next/image";

import styles from "./Header.module.css";


export default function Header() {
  return (
    <header className={styles.header}>
      <Image src="/images/logo.svg" alt="" role="presentation" width={32} height={32} />
      Job viewer demo
    </header>
  );
}
