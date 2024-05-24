import './App.css';
import Todo from './components/Todo/Todo';
import styles from './components/Todo/Todo.module.scss';
import Modal from './components/Modal/Modal';
import {useState} from 'react';
import {ITodoProps} from './types';
import {nanoid} from 'nanoid';


function App() {
  const [tasks, setTasks] = useState<ITodoProps[]>([
    {
      name: 'HTML | CSS',
      description: 'Изучить базу HTML и CSS',
      date: '14.11.2023',
      completed: true,
      id: nanoid().toString()
    },
    {
      name: 'JavaScript',
      description: 'Изучить базу JavaScript',
      date: '13.02.2024',
      completed: true,
      id: nanoid().toString()
    },
    {name: 'React', description: 'Изучить базу React', date: '07.05.2024', completed: false, id: nanoid().toString()},
    {name: 'NextJS', description: 'Изучить базу NextJS', date: '14.04.2025', completed: false, id: nanoid().toString()},
    {
      name: 'Google',
      description: 'Устроиться в компанию Google',
      date: '15.10.2026',
      completed: false,
      id: nanoid().toString()
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal(prevState => !prevState);

  const removeTask = (id: string) => {
    setTasks((prevState) => {
      return prevState.filter((task) => task.id !== id);
    });
  };

  const doneTask = (id: string) => {
    setTasks((prevState) => {
      return (prevState).map(task => {
        if (task.id === id) {
          return {...task, completed: true};
        }
        return task;
      });
    });
  };

  const createTask = (newTask: ITodoProps) => {
    setTasks((prevState) => {
      return [...prevState, newTask];
    });
  };

  const tasksCopy = [...tasks];
  const activeTasks = tasksCopy.filter(task => !task.completed);
  const doneTasks = tasksCopy.filter(task => task.completed);

  const activeTasksList = activeTasks.map(task => (
    <Todo
      key={task.id}
      remove={() => removeTask(task.id)}
      done={() => doneTask(task.id)}
      date={task.date}
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
      done={() => doneTask(task.id)}
      date={task.date}
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
            <h2>Активные задачи - ({activeTasksList.length})</h2>
            <button onClick={handleModal}>Новая задача</button>
          </div>
          <div className={styles['todo-active-bottom']}>
            {activeTasksList.length > 0 ? activeTasksList : <p>Нет активных задач!</p>}
          </div>
        </div>
        <Modal onSubmit={createTask} show={showModal} onClose={handleModal}/>
      </div>

      <div className={styles['container']}>
        <div className={styles['todo-active']}>
          <div className={styles['todo-active-top']}>
            <h2>Завершенные задачи - ({doneTasksList.length})</h2>
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
