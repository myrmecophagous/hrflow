import Image from 'next/image';
import React, {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Modal.module.scss';
import { useClickOutside } from '@/hooks/useClickOutside';
import { usePressEscape } from '@/hooks/usePressEscape';


interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  isOpen?: boolean;
};

const CLOSE_IMAGE_SIZE = 20;
const ANIMATION_DURATION = .2; // s

export default function Modal({onClose, children, isOpen}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    const timeoutId = setTimeout(() => {
      onClose();
      clearTimeout(timeoutId);
    }, ANIMATION_DURATION * 1000);
  }, [onClose]);
  useClickOutside(modalRef, close);
  usePressEscape(close);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, [modalRef]);

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };
  const modalVariants = {
    initial: { opacity: 0, transform: 'scale(.9)' },
    animate: { opacity: 1, transform: 'scale(1)' },
  };

  return createPortal(
    <AnimatePresence>
      { open && <>
        <motion.div
          animate="animate"
          className={styles.overlay}
          exit="initial"
          initial="initial"
          key="overlay"
          transition={{ duration : ANIMATION_DURATION }}
          variants={overlayVariants}
        />
        <motion.dialog
          animate="animate"
          className={styles.modal}
          exit="initial"
          initial="initial"
          key="modal"
          ref={modalRef}
          transition={{ duration : ANIMATION_DURATION }}
          variants={modalVariants}
          data-cy="card-dialog"
        >
          <button className={styles.close} onClick={close} aria-label="Close">
            <Image
              alt=""
              height={CLOSE_IMAGE_SIZE}
              role="presentation"
              src="/images/icons/close.svg"
              width={CLOSE_IMAGE_SIZE}
            />
          </button>
          { children }
        </motion.dialog>
      </>}
    </AnimatePresence>,
    document.body
  );
}
