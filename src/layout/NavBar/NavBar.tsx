import React from 'react';

import gifLogo from './assets/logo.gif';
import { Item, Logo, NavBarContainer, NavBarContent, Title } from './Style';

const NavBar: React.FC = () => (
  <NavBarContainer>
    <NavBarContent>
      <Logo src={gifLogo} />
      <Title>16ый независимый бутл хх.ру</Title>
      <Item>Топ 100 участников</Item>
    </NavBarContent>
  </NavBarContainer>
);

export default NavBar;
