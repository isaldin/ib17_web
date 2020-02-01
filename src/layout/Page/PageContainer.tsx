import React from 'react';

import NavBar from '../NavBar';
import Footer from '../Footer';

import { Container, Content } from './Style';

interface PropsType {
  children: React.ReactNode;
}

const Page: React.FC<PropsType> = (props: PropsType) => (
  <Container>
    <NavBar />
    <Content>{props.children}</Content>
    <Footer />
  </Container>
);

export default Page;
