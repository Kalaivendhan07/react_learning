import { useState } from 'react';
import Dropdown from './Dropdown';
import Modal from './Modal';
import './style.css';

export default function ModalDropdown() {
  const [showModal, setShowModal] = useState(false);
  const [lastAction, setLastAction] = useState('none');

  const items = [
    { label: 'Edit', onClick: () => setLastAction('Edit') },
    { label: 'Duplicate', onClick: () => setLastAction('Duplicate') },
    { label: 'Delete', onClick: () => setShowModal(true) },
  ];

  return (
    <div>
      <div className="clip-box">
        <p>This box has overflow hidden, but the menu still shows because it uses a portal.</p>
        <Dropdown label="Actions" items={items} />
      </div>
      <p>Last action: {lastAction}</p>

      {showModal && (
        <Modal title="Delete this deal?" onClose={() => setShowModal(false)}>
          <p>This cannot be undone.</p>
          <input placeholder="Type DELETE to confirm" />
          <div className="modal-actions">
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button
              className="danger"
              onClick={() => {
                setLastAction('Deleted');
                setShowModal(false);
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
