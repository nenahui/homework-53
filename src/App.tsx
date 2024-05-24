import './App.css';
import Todo from './components/Todo/Todo';
import styles from './components/Todo/Todo.module.scss';
import Modal from './components/Modal/Modal';
import {useState} from 'react';
import {ITodoProps} from './types';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<ITodoProps[]>([
    {name: 'HTML | CSS', description: 'Изучить базу HTML и CSS', completed: true, id: Math.random().toString()},
    {name: 'JavaScript', description: 'Изучить базу JavaScript', completed: true, id: Math.random().toString()},
    {name: 'React', description: 'Изучить базу React', completed: false, id: Math.random().toString()},
    {name: 'NextJS', description: 'Изучить базу NextJS', completed: false, id: Math.random().toString()},
    {name: 'Google', description: 'Устроиться в компанию Google', completed: false, id: Math.random().toString()}
  ]);

  const handleModal = () => setShowModal(prevState => !prevState);

  const removeTask = (id: string) => {
    setTasks((prevState) => {
      return prevState.filter((task) => task.id !== id);
    });
  };

  const tasksCopy = [...tasks];
  const activeTasks = tasksCopy.filter(task => !task.completed);
  const doneTasks = tasksCopy.filter(task => task.completed);

  const activeTasksList = activeTasks.map(task => (
    <Todo
      key={task.id}
      remove={() => removeTask(task.id)}
      id={task.id}
      name={task.name}
      completed={task.completed}
      description={task.description}
    />
  ));

  const doneTasksList = doneTasks.map(task => (
    <Todo
      key={task.id}
      remove={() => removeTask(task.id)}
      id={task.id}
      name={task.name}
      completed={task.completed}
      description={task.description}
    />
  ));

  return (
    <div className={'App'}>
      <div className={styles['container']}>
        <div className={styles['todo-active']}>
          <div className={styles['todo-active-top']}>
            <h2>To do - ({activeTasksList.length})</h2>
            <button onClick={handleModal}>Новая задача</button>
          </div>
          <div className={styles['todo-active-bottom']}>
            {activeTasksList.length > 0 ? activeTasksList : <p>Нет активных задач!</p>}
          </div>
        </div>
        <Modal show={showModal} onClose={handleModal}>
          <h2>Новая задача</h2>
          <form>
            <div>
              <label>Название:
                <input type="text" name={'input-title'}/>
              </label>
              <label>Описание:
                <input type="text" name={'input-description'}/>
              </label>
              <button type={'submit'}>Создать новую задачу</button>
            </div>
          </form>
        </Modal>
      </div>

      <div className={styles['container']}>
        <div className={styles['todo-active']}>
          <div className={styles['todo-active-top']}>
            <h2>Completed - ({doneTasksList.length})</h2>
          </div>
          <div className={styles['todo-active-bottom']}>
            {doneTasksList.length > 0 ? doneTasksList : <p>Нет завершенных задач!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
