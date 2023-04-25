import { Link } from 'react-router-dom'
import { useState } from 'react';

function Navbar() {

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='bg-white text-black px-4 py-4 md:px-20 md:py-4'>
      <div className='max-w-7xl mx-auto flex justify-between'>
        <Link to='/' className='text-3xl transition-all hover:text-gray-600'>
          <h1>React Crud</h1>
        </Link>
        <button className='md:hidden' onClick={handleMenuClick}>
          {showMenu ? ( 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <ul className={`${showMenu ? '' : 'hidden'} md:flex gap-2`}>
          <li>
            <Link to="/" className='text-xl font-bold mx-6 my-2'>Home</Link>
          </li>
          <li>
            <Link to="/new" className='text-xl font-bold mx-3 my-2'>Criar nova tarefa</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
