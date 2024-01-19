import Image from 'next/image';
import React, {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';
import { useClickOutside } from '@/hooks/useClickOutside';


interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  isOpen?: boolean;
};

const CLOSE_IMAGE_SIZE = 20;

export default function Modal({onClose, children, isOpen}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useClickOutside(ref, onClose);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keyup', (e) => handleKeyUp(e as unknown as KeyboardEvent));
    return document.removeEventListener('keyup', (e) => handleKeyUp(e as unknown as KeyboardEvent));
  }, [handleKeyUp]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return createPortal(
    (<div className={styles.overlay}>
      <dialog className={styles.modal} ref={ref}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <Image
            alt=""
            height={CLOSE_IMAGE_SIZE}
            role="presentation"
            src="/images/icons/close.svg"
            width={CLOSE_IMAGE_SIZE}
          />
        </button>
        { children }
      </dialog>
    </div>),
    document.body
  );
}
