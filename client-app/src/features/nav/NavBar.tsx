import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateActivity: () => void;
}

export const NavBar: React.FC<IProps> = ({ openCreateActivity }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={openCreateActivity} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
