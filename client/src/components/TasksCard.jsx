import { useTasks } from '../context/TaskProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

function TasksCard({ task }) {
    const { deleteTask, toggleTaskDone } = useTasks();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const handleDone = async () => {
        await toggleTaskDone(task.id);
    }

    return (
        <div style={{ backgroundColor: task.done ? '' : '#F44242' }}
            className='bg-green-900 rounded-md p-6'>
            <header className='flex justify-between'>
                <h2 className='text-xl font-bold p-1'>{task.title}</h2>
                <button onClick={() => handleDone(task.done)}>
                    <span>{task.done == 1 ? "✅" : "❌"}</span>
                </button>
            </header>
            <p className='text-sm p-2'>{task.description}</p>
            <span className='bg-gray-300 px-2 rounded-md text-black text-sm font-semibold'>Criado em: {new Date(task.createAt).toLocaleString('pt-br')}</span>
            <div className='flex gap-x-1 justify-end'>
                <button className='bg-red-700 px-2 py-1 my-2 rounded-md transition-all hover:scale-105 hover:bg-red-800' onClick={() => { setOpenModal(true); }} >Deletar</button>
                <button className='bg-green-500 px-2 py-1 my-2 rounded-md transition-all hover:scale-105 hover:bg-green-600' onClick={() => navigate(`/edit/${task.id}`)}>Editar</button>
                {openModal && <Modal closeModal={setOpenModal} deleteTask={deleteTask} task={task} />}
            </div>
        </div>
    );
}

export default TasksCard;