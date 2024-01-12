'use client';

import { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';

import clsx from 'clsx';
import styles from './Pagination.module.css';


interface PaginationProps {
  /**
   * Current page, 1-based.
   */
  current: number;
  /**
   * Total number of pages.
   */
  length: number;
  /**
   * Navigation handler.
   */
  onClick: (page: number) => void;
  /**
   * Number of pages to show on each side of the current page.
   */
  span?: number;
};


const ICON_SIZE = 16;

export default function Pagination({
  current,
  onClick,
  length,
  span = 2,
}: PaginationProps) {

  const next = () => {
    if (current !== length) {
      onClick(current + 1);
    }
  };

  const previous = () => {
    if (current !== 1) {
      onClick(current - 1);
    }
  };

  const goTo = (page: number) => {
    if (page !== current) {
      onClick(page);
    }
  };

  let start = current > length - span - 1 ? -(span * 2 + 1) : current - span - 1;
  if (start < 0 && current <= span + 1) {
    start = 0;
  }
  const end = current <= span + 1 ? (span * 2 + 1) : current + span;
  const list = Array.from({ length: length }, (_, i) => i + 1).slice(start, end);

  return (
    <nav className={styles.pagination}>
      <PaginationButton onClick={() => goTo(1)} disabled={current === 1} aria-label="First page">
        <Image
          src="/images/icons/first.svg"
          alt=""
          role="presentation"
          width={ICON_SIZE}
          height={ICON_SIZE} />
      </PaginationButton>

      <PaginationButton onClick={previous} disabled={current === 1} aria-label="Previous page">
        <Image
          src="/images/icons/previous.svg"
          alt=""
          role="presentation"
          width={ICON_SIZE}
          height={ICON_SIZE} />
      </PaginationButton>
      {
        (current - span) > 1
          && <PaginationButton disabled={true}>&hellip;</PaginationButton>
      }
      {
        list.map((page) => <PaginationButton
          className={clsx(page === current && styles.current)}
          disabled={page === current}
          key={page}
          aria-label={`Go to page number ${page}`}
          onClick={() => goTo(page)}>{page}</PaginationButton>
        )
      }
      {
        (current + span) < length
          && <PaginationButton disabled={true}>&hellip;</PaginationButton>
      }
      <PaginationButton onClick={next} disabled={current === length} aria-label="Next page">
        <Image
          src="/images/icons/next.svg"
          alt=""
          role="presentation"
          width={ICON_SIZE}
          height={ICON_SIZE} />
      </PaginationButton>

      <PaginationButton onClick={() => goTo(length)} disabled={current === length} aria-label="Last page">
        <Image
          src="/images/icons/last.svg"
          alt=""
          role="presentation"
          width={ICON_SIZE}
          height={ICON_SIZE} />
      </PaginationButton>
    </nav>
  );
}


function PaginationButton(props: ComponentPropsWithoutRef<'button'>) {
  if (props.disabled) {
    return (
      <span className={clsx(styles.button, styles.disabled, props.className)}>
        {props.children}
      </span>
    );
  } else {
    return (
      <button className={clsx(styles.button, props.className)} onClick={props.onClick} aria-label={props['aria-label']}>
        {props.children}
      </button>
    );
  }
}
