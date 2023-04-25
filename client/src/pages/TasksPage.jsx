import { useEffect, useState } from 'react'
import TasksCard from '../components/TasksCard'
import { useTasks } from '../context/TaskProvider'

function TasksPage() {
  const { tasks, loadTasks } = useTasks();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [doneFilter, setDoneFilter] = useState(null);

  useEffect(() => {
    loadTasks();
    setCurrentPage(1);
  }, []);

  const tasksPerPage = 9;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) && (doneFilter === null || task.done === doneFilter)
  );
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);


  function renderMain() {
    if (filteredTasks.length === 0)
      return <h1 className='flex justify-center'>Nenhuma tarefa encontrada</h1>;
    return currentTasks.map((task) => <TasksCard task={task} key={task.id} />)
  }



  return (
    <div>
      <h1 className='text-5xl text-center m-6'>Tarefas</h1>

      <input
        type="text"
        placeholder='Pesquisa por sua tarefa'
        onChange={(event) => {
          const value = event.target.value;
          if (value.length >= 3) {
            setSearchTerm(value);
            setCurrentPage(1);
          } else {
            setSearchTerm('');
            setCurrentPage(1);
          }
        }}
        className='text-black'
      />

      <select className='text-black' value={doneFilter} onChange={(event) => setDoneFilter(event.target.value)}>
        <option value={null}>Todos</option>
        <option value={0}>Não concluídas</option>
        <option value={1}>Concluídas</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderMain()}
      </div>

      <div className='flex justify-center m-4 space-x-6'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className='bg-green-500 px-2 py-1 rounded-sm text-2xl'
        >
          ←
        </button>

        <button
          disabled={filteredTasks.length <= indexOfLastTask}
          onClick={() => setCurrentPage(currentPage + 1)}
          className='bg-green-500 px-2 py-1 rounded-sm text-2xl'
        >
          →
        </button>
      </div>
    </div>
  )
}

export default TasksPage;