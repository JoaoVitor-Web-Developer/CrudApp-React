import { useEffect, useState } from 'react'
import TasksCard from '../components/TasksCard'
import { useTasks } from '../context/TaskProvider'

function TasksPage() {
  const { tasks, loadTasks } = useTasks();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadTasks();
    setCurrentPage(1);
  }, [])

  const tasksPerPage = 9;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

  function renderMain() {
    if (tasks.length === 0) return <h1 className='flex justify-center'>Nenhuma tarefa adicionada</h1>
    return currentTasks.map((task) => <TasksCard task={task} key={task.id} />)
  }

  return (
    <div>
      <h1 className='text-5xl text-center m-6'>Tarefas</h1>
      <div className="grid grid-cols-3 gap-6">
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
          disabled={currentTasks.length < tasksPerPage}
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