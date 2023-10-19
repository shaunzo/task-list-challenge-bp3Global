export type TaskStatus = 'incomplete' | 'complete'

export class Task {
  id: number;
  description: string;
  status: TaskStatus;
}

