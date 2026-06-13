import { type State } from "./state";

export type Project = {
  id: number;
  title: string;
  client: string;
  description: string;
  status: State;
  startDate: string;
  manager: string;
  teamSize: number;
};
