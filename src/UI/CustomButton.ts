import { Button } from "antd";
import styled from "styled-components";

export const CustomButton = styled(Button)`
  color: var(--tg-theme-button-text-color);
  border-color: var(--tg-theme-button-color);
  border-width: 4px;
  border-radius: 10px;
  background-color: var(--tg-theme-bg-color);
  width: 100%;
  height: 10vh;
  margin-bottom: 10px;
`;
