import React from 'react';

import NavBar from '@app/components/NavBar';
import Footer from '@app/components/Footer';

import styles from './styles.scss';

interface PropsType {
  children: React.ReactNode;
}

const PageContainer = (props: PropsType): React.FunctionComponentElement<PropsType> => (
  <div className={styles.pageContainer}>
    <NavBar />

    <div className={styles.pageContent}>{props.children}</div>
    <Footer />
  </div>
);

export default PageContainer;
