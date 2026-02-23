'use client';

import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const close = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [router, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [close]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
