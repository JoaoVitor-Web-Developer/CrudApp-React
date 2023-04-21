import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-white text-black flex justify-between px-20 py-6'>
      <Link to='/' className='text-3xl transition-all hover:text-gray-600'>
        <h1>React Crud</h1>
      </Link>
      <ul className='flex gap-2'>
        <li>
          <Link to="/" className='text-xl font-bold mx-6 my-2'>Home</Link>
        </li>
        <li>
          <Link to="/new" className='text-xl font-bold mx-3 my-2'>Criar nova tarefa</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar