import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import logo from '../../assets/round-logo-medium.png' 


const links = [
  { link: '/dashboard', label: 'Dashboard' },
  { link: '/peer_builder', label: 'Peer Builder' },
  { link: '/data_explorer', label: 'Data Explorer' },
];

export function HeaderSimple() {
  
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem"}}>
          <img  style={{ height: "2rem"}} src={logo}></img>
          <h4>First National Bank of Monterey</h4>
        </div>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
