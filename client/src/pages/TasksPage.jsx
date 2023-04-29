import { useEffect, useState } from 'react';
import TasksCard from '../components/TasksCard';
import { useTasks } from '../context/TaskProvider';

function TasksPage() {
  const { tasks, loadTasks } = useTasks();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [doneFilter, setDoneFilter] = useState(null);

  useEffect(() => {
    loadTasks();
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setSelectedFilter(doneFilter === null ? 'all' : doneFilter === 0 ? 'notDone' : 'done');
  }, [doneFilter]);


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

  function renderPageNumbers() {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-2 py-1 rounded-md text-lg transition-all hover:bg-gray-200 ${currentPage === i ? 'bg-gray-200' : 'bg-white'
            }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  }


  return (
    <div>
      <h1 className='text-5xl text-center m-6'>Tarefas</h1>

      <label className='flex'>Pesquisa por sua tarefa abaixo:</label>
      <div className='flex flex-wrap md:items-center md:justify-between'>
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
          className='bg-white w-80 h-9 rounded-xl pl-4 mb-4 mt-3 text-black'
        />

        <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-end w-full sm:w-auto'>
          <select className='bg-white text-black w-full sm:w-36 text-center rounded-md p-1 my-2 sm:my-0 mx-4' value={selectedFilter} onChange={(event) => {
            setSelectedFilter(event.target.value);
            setDoneFilter(event.target.value === 'all' ? null : event.target.value === 'notDone' ? 0 : 1);
          }}>
            <option value='all'>Todos</option>
            <option value='notDone'>Não concluídas</option>
            <option value='done'>Concluídas</option>
          </select>

          <button className='bg-cyan-600 px-2 py-1 rounded-md w-full sm:w-auto mb-6 sm:mb-0 transition-all hover:scale-95' onClick={() => setDoneFilter(null)}>Limpar Filtro</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderMain()}
      </div>

      <div className='flex justify-center m-4 space-x-6'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className='bg-green-500 px-2 py-1 w-12 h-11 rounded-sm text-2xl transition-all hover:bg-green-600 hover:scale-105 cursor-pointer'
        >
          ←
        </button>

        <span className='text-white font-medium text-lg mx-auto my-auto'>{currentPage}</span>

        <button
          disabled={filteredTasks.length <= indexOfLastTask}
          onClick={() => setCurrentPage(currentPage + 1)}
          className='bg-green-500 px-2 py-1 w-12 h-11 rounded-sm text-2xl transition-all hover:bg-green-600 hover:scale-105 cursor-pointer'
        >
          →
        </button>
      </div>
    </div>
  )
}

export default TasksPage;