import styles from './Todo.module.scss';
import {format} from 'date-fns';
import {ITodoProps} from '../../types';
import React from 'react';


const Todo: React.FC<ITodoProps> = ({name, description, date, completed, remove, done}) => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'dd.MM.yyyy');

  return (
    <div className={styles['todo-active-task']}>
      <h5>{name}
        <p>{description}</p>
      </h5>
      <div className={styles['todo-active-task-bottom']}>
        <p>{date ? date : formattedDate}</p>
        <div>
          <button onClick={remove} className={styles['delete-btn']}>Delete</button>
          {!completed ? <button onClick={done} className={styles['done-btn']}>Done</button> : null}
        </div>
      </div>
    </div>
  );
};

export default Todo;