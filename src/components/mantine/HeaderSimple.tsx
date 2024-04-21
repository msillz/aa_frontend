import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import logo from '../../assets/round-logo-medium.png' 
import { Logout } from '../../login';


const links = [
  { link: '/dashboard', label: 'Dashboard', tab: 0},
  { link: '/peer_builder', label: 'Peer Builder', tab: 1 },
  { link: '/data_explorer', label: 'Data Explorer', tab: 2 },
];

export function HeaderSimple({logoutCallback, tabCallback, currentTab}) {
  
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={currentTab === link.tab || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        tabCallback(link.tab);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="xxl" className={classes.inner}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem"}}>
          <img  style={{ height: "2rem"}} src={logo}></img>
          <h4>First National Bank of Monterey</h4>
        </div>
        <Group gap={5} visibleFrom="xs">
          {items}
          <Logout callback={logoutCallback}></Logout>
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
