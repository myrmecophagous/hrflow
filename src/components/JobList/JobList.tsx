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
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import SearchBar from '@/components/SearchBar/SearchBar';
import styles from './JobList.module.css';
import { Position } from '@/components/Card/Card';
import { SelectOption } from '@/components/Select/Select';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getDistance } from '@/utils/utils';


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
    resetFilter();
    resetCategory();
    resetSort();
    resetPage();
    resetSortOrder();
  };
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Pagination
  const [page, setPage, resetPage] = useLocalStorage<number>('page', 1);

  // Drag & Drop
  const [isCustomSort, setIsCustomSort] = useState<boolean>(false);
  const [activeCardId, setActiveCardId] = useState<number>(-1);

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
    let min = Infinity;
    let closestCardIndex = -1;
    filteredJobs.forEach((job, i) => {
      if (job.ref?.current) {
        const {x, y, width, height} = job.ref.current.getBoundingClientRect();
        const distance = getDistance(pos, {x: x + width / 2, y: y + height / 2});
        if (distance < min) {
          min = distance;
          closestCardIndex = i;
        }
      }
    });
    const moveCardIndex = filteredJobs.findIndex((job) => job.id === id);
    if (moveCardIndex === closestCardIndex) {
      return;
    }
    setIsCustomSort(true); // this will cause the array to re-render
    setFilteredJobs(tmp => {
      const tmp2 = [...tmp];
      [tmp2[moveCardIndex], tmp2[closestCardIndex]] = [tmp2[closestCardIndex], tmp2[moveCardIndex]];
      return tmp2;
    });
  };

  // Modal
  const openCard = (job: Job) => {
    setActiveCardId((id) => (id === job.id ? -1 : job.id));
  };

  const closeCard = useCallback(() => setActiveCardId(-1), []);

  const activeJob = jobs.find((job) => job?.id === activeCardId);

  return (<>
    {
      activeJob &&
        <Modal job={activeJob} onClose={closeCard} />
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
          .map((job) => <Card
            key={job.id}
            {...job}
            ref={job.ref}
            onOpen={() => openCard(job)}
            onDragEnd={handleDrop}
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