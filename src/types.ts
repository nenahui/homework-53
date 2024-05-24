export interface ITodoProps {
  id: string;
  name: string;
  description: string;
  date?: string;
  completed: boolean;
  remove?: () => void;
  done?: () => void;
}