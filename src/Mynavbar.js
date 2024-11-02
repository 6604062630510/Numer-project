
import { Link } from 'react-router-dom';
import './Mynavbar.css';

function Mynavbar() {
  return (
    <div className="Navbar">
      <header className="Navbar-header">
        <nav>
          <ul className="Navli">
            <li><Link to="/">Home</Link></li>

 
          </ul>
        </nav>        
      </header>
    </div>
  );
}

export default Mynavbar;
