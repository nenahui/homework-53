import styles from './Modal.module.scss';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {ITodoProps} from '../../types';
import {nanoid} from 'nanoid';

interface IModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (todo: ITodoProps) => void;
}

const Modal: React.FC<IModalProps> = ({show, onClose, onSubmit}) => {
  const [taskData, setTaskData] = useState<ITodoProps>({
    name: '',
    description: '',
    id: '',
    completed: false,
  });

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setTaskData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const todo: ITodoProps = {
      id: nanoid().toString(),
      name: taskData.name,
      description: taskData.description,
      completed: taskData.completed,
    };
    
    onClose();

    onSubmit(todo);
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <button className={styles['modal-close']} onClick={onClose}>
          &times;
        </button>
        <div className={styles['modal-content']}>
          <h2>Новая задача</h2>
          <form onSubmit={onFormSubmit}>
            <div>
              <label>Название:
                <input type="text" name={'name'} onChange={onFieldChange}/>
              </label>
              <label>Описание:
                <input type="text" name={'description'} onChange={onFieldChange}/>
              </label>
              <button type={'submit'}>Создать новую задачу</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;