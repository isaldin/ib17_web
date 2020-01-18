import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';

import styles from './styles.scss';

interface StateType {
  activeItem: string;
}

class NavBar extends Component<{}, StateType> {
  state = {
    activeItem: 'top',
  };

  handleItemClick = (
    _event: React.MouseEvent<HTMLAnchorElement>,
    { name }: { name?: string },
  ): void => this.setState({ activeItem: name || '' });

  render(): JSX.Element {
    const { activeItem } = this.state;

    return (
      <>
        <Menu inverted fixed="top" className={styles.navbar}>
          <Container>
            <Menu.Item header>16ый независимый бутл хх.ру</Menu.Item>

            <Menu.Item name="top" active={activeItem === 'top'} onClick={this.handleItemClick}>
              Топ 100 участников
            </Menu.Item>
          </Container>
        </Menu>
      </>
    );
  }
}

export default NavBar;
