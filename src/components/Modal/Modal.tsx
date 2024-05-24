import React from 'react';
import styles from './Modal.module.scss';

interface IModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({show, onClose, children}) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <button className={styles['modal-close']} onClick={onClose}>
          &times;
        </button>
        <div className={styles['modal-content']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;