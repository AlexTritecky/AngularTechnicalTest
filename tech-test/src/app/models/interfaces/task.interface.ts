export interface Task {
  id: number;
  label: string;
  description: string;
  category: string;
  done: boolean;
  status?: TaskStatus;
}

export enum TaskStatus {
  Done = "Done",
  InProgress = "In Progress",
}
