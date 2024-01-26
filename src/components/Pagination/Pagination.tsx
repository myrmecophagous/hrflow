'use client';

import { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import styles from './Pagination.module.scss';
import { getPaginationList } from '@/utils/utils';


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

  const list = getPaginationList(current, length, span);

  return (
    <nav className={styles.pagination} data-cy="pagination">
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
          aria-label={page === current ? 'Current page' : `Go to page number ${page}`}
          aria-current={page === current ? 'page' : undefined}
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
  if (props['aria-current'] === 'page') {
    return (
      <button className={clsx(styles.button, styles.disabled, props.className)} aria-label={props['aria-label']} aria-current={props['aria-current']} disabled={true}>
        {props.children}
      </button>
    );
  } else if (props.disabled) {
    return (
      <span className={clsx(styles.button, styles.disabled, props.className)} aria-label={props['aria-label']} aria-hidden={true}>
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
