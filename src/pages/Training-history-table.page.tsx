import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../api/api";
import { ITrainingHistory } from "../interfaces/training-history.interface";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { convertDate } from "../utils/date";
import { IExercise } from "../interfaces/exercise.interface";

const TrainingHistoryPage: React.FC = () => {
  const { trainingId } = useParams<{ trainingId: string }>();
  const [trainingHistory, setTrainingHistory] = useState<ITrainingHistory[]>();
  const [trainingExercises, setTrainingExercises] = useState<IExercise[]>();

  const api = new Api();

  useEffect(() => {
    trainingId &&
      api.getTrainingHistory(trainingId).then((data) => {
        setTrainingHistory(data?.message.data);
        api.getTrainingExercises(trainingId).then((data) => {
          setTrainingExercises(data?.message);
        });
      });
  }, [trainingId]);

  const columns: ColumnsType<ITrainingHistory> = [
    // DATE
    {
      title: "Дата",
      key: "date",
      width: 1,
      align: "center",
      render: (value, record, index) => {
        const date = record.date && convertDate(record.date);

        return {
          children: (
            <span key={index}>
              <div>
                {date?.day}.{date?.month}
              </div>
              <div>{date?.year}</div>
            </span>
          ),
          key: index,
        };
      },
    },
    {
      title: "Упражнение",
      width: 1,
      render: (value, record, index) => {
        return {
          ket: index,
          children: (
            <span key={index}>
              {trainingExercises?.map((ex, index) => {
                return ex._id === record.exerciseId ? (
                  <div key={index}>{ex.name}</div>
                ) : (
                  " "
                );
              })}
            </span>
          ),
        };
      },
    },
    {
      title: "Повторения",
      width: 1,
      render: (value, record, index) => {
        return {
          key: index,
          children: (
            <span key={index}>
              {record.approachList?.map((approach, index) => {
                return (
                  <div key={index}>
                    {approach.approachNumber}-{approach.numberOfReps}-
                    {approach.weight}
                  </div>
                );
              })}
            </span>
          ),
        };
      },
    },
  ];

  return (
    <>
      <Table dataSource={trainingHistory} columns={columns} />
    </>
  );
};

export default TrainingHistoryPage;
