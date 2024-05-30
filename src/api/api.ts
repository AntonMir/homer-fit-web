import axios, { AxiosInstance } from "axios";
import { IResponse } from "./interfaces/base.interface";
import { ITraining } from "../interfaces/training.interface";
import { ITableData } from "./interfaces/table-data.interface";
import { IExercise } from "../interfaces/exercise.interface";

export default class Api {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
    });
  }

  async getTrainingsList(
    userTgId: number,
    limit = 10,
    page = 1
  ): Promise<IResponse<ITableData<ITraining[]>> | null> {
    try {
      const res = await this.axiosInstance.get<
        IResponse<ITableData<ITraining[]>>
      >(`/api/trainings`, {
        params: {
          limit,
          page,
          telegram_id: userTgId,
        },
      });
      return res.data;
    } catch (error) {
      console.error(`Api > getTrainingsList: `, error);
      return null;
    }
  }

  async getTrainingHistory(
    trainingId: string
  ): Promise<IResponse<ITableData<ITraining[]>> | null> {
    try {
      const res = await this.axiosInstance.get<
        IResponse<ITableData<ITraining[]>>
      >(`/api/trainings/history/${trainingId}`);
      return res.data;
    } catch (error) {
      console.error(`Api > getTrainingsList: `, error);
      return null;
    }
  }

  async getTrainingExercises(
    trainingId: string
  ): Promise<IResponse<IExercise[]> | null> {
    try {
      const res = await this.axiosInstance.get<IResponse<IExercise[]>>(
        `/api/trainings/exercises/${trainingId}`
      );
      return res.data;
    } catch (error) {
      console.error(`Api > getTrainingsList: `, error);
      return null;
    }
  }
}
