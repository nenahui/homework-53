import styles from './Todo.module.scss';
import { format } from 'date-fns';
import {ITodoProps} from '../../types';


const Todo: React.FC<ITodoProps> = ({name, description, completed}) => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'dd.MM.yyyy');

  if (completed || !completed) {
    return (
      <div className={styles['todo-active-task']}>
        <h5>{name}
          <p>{description}</p>
        </h5>
        <div className={styles['todo-active-task-bottom']}>
          <p>{formattedDate}</p>
          <button>Done</button>
        </div>
      </div>
    );
  }
};

export default Todo;