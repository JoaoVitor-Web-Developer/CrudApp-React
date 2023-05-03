import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImg from '../image/not-found.svg'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <img src={notFoundImg} alt='Página não encontrada' className='w-96 h-72 mb-8' />
      <h1 className='text-3xl font-bold text-red-600 mb-4'>Página não encontrada</h1>
      <p className='text-lg text-gray-600 text-center mb-8'>Desculpe, a página que você está procurando não foi encontrada.</p>
      <Link to='/' className='bg-blue-600 text-white px-4 py-2 rounded-md transition-all hover:scale-105 hover:bg-blue-700'>Voltar para a página inicial</Link>
    </div>
  )
}
