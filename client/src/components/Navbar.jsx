import { Link } from 'react-router-dom'
import { useState } from 'react';

function Navbar() {

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='bg-white text-black px-4 py-4 md:px-20 md:py-4'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Link to='/' className='text-3xl transition-all hover:text-gray-600'>
          <h1>React Crud</h1>
        </Link>
        <button className='md:hidden text-black transition-all hover:text-gray-600 focus:outline-none' onClick={handleMenuClick}>
          {showMenu ? ( 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-16 transition-all hover:fill-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <ul className={`${showMenu ? '' : 'hidden'} md:flex gap-2 justify-end`}>
          <li>
            <Link to="/" className='text-xl font-bold mx-10 my-2 transition-all hover:text-gray-600'>Home</Link>
          </li>
          <li>
            <Link to="/new" className='text-xl font-bold mx-2 my-2 transition-all hover:text-gray-600'>Nova tarefa</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
