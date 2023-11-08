import React from 'react';
import Calendar from './Calender';
import './NavBar.css';
import { useUserRole } from '../hooks/UseUserRole';

function NavBar({ handleLogout }) {
  const position = useUserRole(); // Invoked the function to get the role

  return (
    <nav aria-label="log out">
      <div className="aot-head">
        <Calendar />
        <div className="logout-container">
          <a
            className="logout fancy-logout-button"
            id="LogoutAction"
            onClick={handleLogout}
            href="/"
          >
            Logout
          </a>
        </div>
      </div>
      <div>
        {position === 'manager' ? 'EmoTime' : 'EmoTime'}
      </div>      
    </nav>
  );
}

export default NavBar;