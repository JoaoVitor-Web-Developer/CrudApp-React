import React from 'react'

const Modal = ({ closeModal, deleteTask, task }) => {
    return (
        <div className='text-black fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-white w-1/2 rounded-md p-6'>
                <button className='absolute top-2 right-2 text-red-500' onClick={() => closeModal(false)}>X</button>
                <div className='text-2xl'>
                    <h1>Deseja realmente deletar esta tarefa?</h1>
                </div>
                <div className='my-4'>
                    <p>Sua tarefa sera removida permanentemente!</p>
                </div>
                <div className='flex justify-end'>
                    <button className='bg-red-500 text-white px-4 py-2 rounded-md mr-2 transition-all hover:bg-red-600 hover:scale-105' onClick={() => deleteTask(task.id)}>Sim</button>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md transition-all hover:bg-blue-600 hover:scale-105' onClick={() => closeModal(false)}>Não</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
