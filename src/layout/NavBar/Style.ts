import styled from 'styled-components';

import { ThemeProps } from '@app/layout/Theme';

type NavBarContainerProps = ThemeProps;
const NavBarContainer = styled.div`
  height: ${(props: NavBarContainerProps) => props.theme.navbarHeight}px;
  display: flex;
  background-color: goldenrod;
  color: white;
  justify-content: center;
  width: 100%;
  position: fixed;
`;

const NavBarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
`;

interface ItemProps {
  active?: boolean;
}
const Item = styled.div`
  background-color: gray;
  font-weight: ${(props: ItemProps) => (props.active ? 'bold' : 'normal')};
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const Logo = styled.img`
  height: 58px;
  width: 78px;
`;

export { NavBarContainer, NavBarContent, Item, Title, Logo };
