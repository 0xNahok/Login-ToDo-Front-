export interface Todo {
    _id: string;
    title: string;
    status: number;  // 0 is new, 1 in progress, 2 Done
    userID: string;

  }
