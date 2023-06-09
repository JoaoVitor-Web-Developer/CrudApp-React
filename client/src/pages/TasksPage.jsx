import { useEffect, useState } from 'react';
import TasksCard from '../components/TasksCard';
import { useTasks } from '../context/TaskProvider';
import dataImg from '../image/dataImg.svg';


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
      return (
        <>
          <h1 className='flex justify-center'>Nenhuma tarefa encontrada</h1>
          <img src={dataImg} alt='Nenhuma tarefa encontrada' className='flex w-32 h-32 mb-8 mx-auto sm:justify-center' />
        </>
      );
    return currentTasks.map((task) => <TasksCard task={task} key={task.id} />)
  };

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
          className='bg-white w-80 h-9 rounded-xl pl-4 pr-10 mb-4 mt-3 text-black'
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 absolute right-3 top-3 pointer-events-none"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 18a9 9 0 100-18A9 9 0 009 18zm0-1.8a7.2 7.2 0 110-14.4 7.2 7.2 0 010 14.4zm4.95-6.3l3.6 3.6a.9.9 0 01-1.27 1.27l-3.6-3.6a5.6 5.6 0 111.27-1.27z"
            clipRule="evenodd"
          />
        </svg>


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