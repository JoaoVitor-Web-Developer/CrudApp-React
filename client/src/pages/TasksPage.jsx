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

  const tasksPerPage = 6;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

  function renderMain() {
    if(tasks.length === 0) return <h1>Nenhuma tarefa adicionada</h1>
    return currentTasks.map((task) => <TasksCard task={task} key={task.id} />)
  }
  
  return (
    <div>
      <h1>Tarefas</h1>
    {renderMain()}
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}>
          Página anterior
      </button>

      <button
        disabled={currentTasks.length < tasksPerPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Próxima página
      </button>
    </div>
    </div>
  )
}

export default TasksPage