import React from "react";
import { Image, Menu, Button } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../asset/React-icon.svg.png";
import "./style.css";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Menu stackable attached inverted>
      <Menu.Item name="home">
        <Link to="/">
          <Image size="mini" src={logo} alt="logo"></Image>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <h2>React Firebase CRUD With Upload Image</h2>
      </Menu.Item>
      <Menu.Item id="float">
        <Button size="mini" primary onClick={() => navigate("/add")}>
          Add User
        </Button>
      </Menu.Item>
    </Menu>
  );
};
