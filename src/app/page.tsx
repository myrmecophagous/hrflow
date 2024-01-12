import { Suspense } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Skeleton from '@/components/Skeleton/Skeleton';
import Wrapper from '@/components/Wrapper/Wrapper';
import styles from './page.module.css';


export default async function Home() {

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<Skeleton />}>
          <Wrapper />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
