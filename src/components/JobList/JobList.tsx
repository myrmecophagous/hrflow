'use client';

import { ErrorBoundary } from 'react-error-boundary';
import {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Card from '@/components/Card/Card';
import CardDetails from '@/components/CardDetails/CardDetails';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import SearchBar from '@/components/SearchBar/SearchBar';
import styles from './JobList.module.scss';
import { Position } from '@/components/Card/Card';
import { SelectOption } from '@/components/Select/Select';
import { getDistance } from '@/utils/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';


export interface Job {
  created_at: string;
  id: number;
  languages?: {
    name: string;
  }[];
  location?: {
    text: string;
  };
  name: string;
  sections?: {
    name: string;
    description: null;
    title: "";
  }[];
  skills?: {
    name: string;
  }[];
  summary?: string;
  tags?: {
    name: string;
    value: string;
  }[];
  tasks?: {
    name: string;
    value: null;
  }[];
  ref?: RefObject<HTMLDivElement>;
};

interface JobListProps {
  categories: string[];
  jobs: Job[];
};

const CARDS_PER_PAGE = 10;

export default function JobList({jobs, categories}: JobListProps) {
  // Search Bar & Local Storage
  const [filter, setFilter, resetFilter] = useLocalStorage<string>('filter', '');
  const [category, setCategory, resetCategory] = useLocalStorage<string>('category', '');
  const categoryOptions = categories.map((category) => ({
    label: category,
    value: category,
  } as SelectOption));
  const [sort, setSort, resetSort] = useLocalStorage<string>('sort', '');
  const handleSort = (field: string) => {
    setSort(field);
    setIsCustomSort(false);
  };
  const [sortOrder, setSortOrder, resetSortOrder] = useLocalStorage<number>('sortOrder', 1);
  const reset = () => {
    resetCategory();
    resetFilter();
    resetPage();
    resetSort();
    resetSortOrder();
  };
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Pagination
  const [page, setPage, resetPage] = useLocalStorage<number>('page', 1);

  // Drag & Drop
  const [isCustomSort, setIsCustomSort] = useState<boolean>(false);
  const [targetCardIndex, setTargetCardIndex] = useState<number>(-1);
  const [draggedCardIndex, setDraggedCardIndex] = useState<number>(-1);

  const byField = useCallback((left: Job, right: Job) => {
    if (isCustomSort) {
      return 0;
    }
    let a;
    let b;
    if (sort === 'category') {
      a = left.tags?.find((tag) => tag.name === 'category')?.value.toLowerCase() || '';
      b = right.tags?.find((tag) => tag.name === 'category')?.value.toLowerCase() || '';
    } else {
      a = left[sort as keyof Job]?.toString().toLowerCase() || '';
      b = right[sort as keyof Job]?.toString().toLowerCase() || '';
    }
    if (a < b) {
      return 1 * sortOrder;
    } else if (a > b) {
      return -1 * sortOrder;
    } else {
      return 0;
    }
  }, [sortOrder, sort, isCustomSort]);

  useEffect(() => {
    const tmp = jobs.filter((job) => job.name.toLowerCase().includes(filter.toLowerCase()))
    .filter((job) => {
      const cat = job.tags && job.tags.find(tag => tag.name === 'category');
      return cat?.value === category || category === '';
    }).map((job) => {
      job.ref = createRef<HTMLDivElement>();
      return job;
    }).sort(byField) || [];

    setFilteredJobs(tmp);
  }, [jobs, filter, category, isCustomSort, sortOrder, byField]);

  const handleDrop = (id: number, pos: Position) => {
    if (draggedCardIndex === -1 || draggedCardIndex === targetCardIndex || targetCardIndex === -1) {
      return;
    }
    setIsCustomSort(true); // this will cause the array to re-render
    setFilteredJobs(tmp => {
      const tmp2 = tmp.toSpliced(draggedCardIndex, 1);
      tmp2.splice(targetCardIndex, 0, tmp[draggedCardIndex]);
      return tmp2;
    });
    setDraggedCardIndex(-1);
    setTargetCardIndex(-1);
  };

  const handleHover = (id: number, pos: Position) => {
    let closestCardIndex = -1;
    let min = Infinity;
    filteredJobs.forEach((job, i) => {
      if (job?.ref?.current) {
        const {x, y, height} = job.ref.current.getBoundingClientRect();
        const distance = getDistance(pos, {x, y: y + height / 2});
        if (distance < min) {
          min = distance;
          closestCardIndex = i;
        }
      }
    });
    if (closestCardIndex !== -1 && closestCardIndex !== id) {
      setTargetCardIndex(closestCardIndex);
    } else {
      setTargetCardIndex(-1);
    }
  };

  const handleDragStart = (id: number) => {
    const i = filteredJobs.findIndex((job) => job.id === id);
    setDraggedCardIndex(i);
  };

  // Modal
  const [activeCardId, setActiveCardId] = useState<number>(-1);
  const openCard = (job: Job) => {
    setActiveCardId((id) => (id === job.id ? -1 : job.id));
  };

  const activeJob = jobs.find((job) => job?.id === activeCardId);

  const closeCard = useCallback(() => {
    activeJob?.ref?.current?.focus();
    setActiveCardId(-1);
  }, [activeJob]);

  return (<>
    {
      activeJob &&
        <Modal onClose={closeCard}>
          <CardDetails job={activeJob} />
        </Modal>
    }

    <SearchBar
      categories={categoryOptions}
      filter={filter}
      handleCategory={setCategory}
      handleReset={reset}
      handleSearch={setFilter}
      handleSort={handleSort}
      handleSortOrder={setSortOrder}
      selectedCategory={category}
      selectedSort={sort}
      selectedSortOrder={sortOrder}
    />

    <div className={styles.container}>
      {
        jobs && filteredJobs.length > 0 &&
          filteredJobs.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)
          .map((job, i) => <Card
            key={job.id}
            {...job}
            hover={i === targetCardIndex}
            onDragEnd={handleDrop}
            onDragOver={handleHover}
            onDragStart={handleDragStart}
            onOpen={() => openCard(job)}
            ref={job.ref}
          />)
      }
      {
        jobs && jobs.length > 0 && filteredJobs.length === 0 &&
          <div className={styles.message} role='alert' tabIndex={0}>None of the jobs satisfies selected criteria</div>
      }
      {
        (!jobs || jobs.length === 0) &&
          <div className={styles.message} role='alert' tabIndex={0}>No jobs found</div>
      }
    </div>

    {
      (jobs && filteredJobs.length > CARDS_PER_PAGE)
      ?
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Pagination current={page} length={Math.ceil(jobs.length / CARDS_PER_PAGE)} onClick={setPage} />
        </ErrorBoundary>
      :
        <div></div>
    }
  </>);
}
