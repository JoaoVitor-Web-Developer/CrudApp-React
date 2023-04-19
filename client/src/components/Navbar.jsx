import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <h1>React Crud</h1>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/new">Criar nova tarefa</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar