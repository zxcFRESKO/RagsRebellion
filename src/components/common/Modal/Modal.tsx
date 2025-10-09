import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFeatherIcons } from '../../../hooks/useFeatherIcons';
import { classNames } from '../../../utils/helpers';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true
}) => {
  useFeatherIcons();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent): void => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={classNames(styles.modal, styles[`modal-${size}`])}>
        
        {/* Header */}
        {(title || onClose) && (
          <div className={styles.modalHeader}>
            {title && <h2 className={styles.modalTitle}>{title}</h2>}
            {onClose && (
              <button 
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                <i data-feather="x" className={styles.closeIcon}></i>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={styles.modalContent}>
          {children}
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;