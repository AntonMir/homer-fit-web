import React from "react";
import { ITraining } from "../interfaces/training.interface";
import { CustomButton } from "../UI/CustomButton";
import { useNavigate } from "react-router-dom";

interface IMainMenu {
  trainingsList: ITraining[] | undefined;
}

const MainMenuPage: React.FC<IMainMenu> = (props) => {
  const { trainingsList } = props;
  const navigate = useNavigate();

  const handleClick = (_id: string) => {
    navigate(`/training-history/${_id}`);
  };

  return (
    <>
      {trainingsList &&
        trainingsList.map((training: ITraining) => {
          return (
            <CustomButton
              key={training._id}
              onClick={() => handleClick(training._id)}
            >
              {training.name}
            </CustomButton>
          );
        })}
    </>
  );
};

export default MainMenuPage;
