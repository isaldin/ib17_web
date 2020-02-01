import styled from 'styled-components';

import { ThemeProps } from '@app/layout/Theme';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

type ContentProps = ThemeProps;
const Content = styled.div`
  margin-top: ${(props: ContentProps) => props.theme.navbarHeight + 20}px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export { Container, Content };
