import React from "react";
import styled from "styled-components";

const Error: React.FC = () => {
  return (
    <Text>
      Ошибка аутентификации, использование доступно только через telegram web
      app
    </Text>
  );
};

const Text = styled.h2`
  margin: 15%;
  text-align: center;
  color: #008484;
`;

export default Error;
