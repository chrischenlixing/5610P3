import React, { useState } from 'react';
import Calendar from './MyCalender';
import './NavBar.css';
import { useUserRole } from '../hooks/UseUserRole';
import { Modal } from 'react-bootstrap';

function NavBar({ handleLogout }) {
  const position = useUserRole();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav aria-label="log out">
      <div className="aot-head">
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
      <button onClick={openModal}>Open Calendar</button>

<Modal show={isModalOpen} onHide={closeModal}>
  <Modal.Header closeButton>
    <Modal.Title>Calendar</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Content for your modal */}
    <Calendar />
  </Modal.Body>
  <Modal.Footer>
    <button onClick={closeModal}>Close</button>
  </Modal.Footer>
</Modal>
</nav>
  );
}

export default NavBar;