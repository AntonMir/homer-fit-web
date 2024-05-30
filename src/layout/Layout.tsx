import { Outlet } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Layout: React.FC = () => {
  return (
    <>
      <Background>
        <Outlet />
      </Background>
    </>
  );
};

const Background = styled.div``;

export default Layout;
