'use server';

import { env } from "process";
import { readFile } from 'fs/promises';

import type { Job } from '@/components/JobList/JobList';


export async function getJobs(): Promise<Job[]> {
  if (env.NODE_ENV !== 'production') {
    return readFile('./src/data/jobs.json', 'utf8').then((data) => {
      return JSON.parse(data);
    }).catch((err) => {
      console.error(err);
      return [];
    });
  }

  let result: Job[] = [];

  const endpoint = env.ENDPOINT;
  if (!endpoint) {
    console.error('ENDPOINT_URI not set');
    return result;
  }

  const api_key = env.API_KEY;
  if (!api_key) {
    console.error('API_KEY not set');
    return result;
  }
  const headers = new Headers();
  if (api_key) {
    headers.append('X-API-KEY', api_key);
  }
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const board_key = env.BOARD_KEY;
  if (!board_key) {
    console.error('BOARD_KEY not set');
    return result;
  }
  const searchParams = new URLSearchParams({
    board_keys: `["${board_key}"]`,
    page: '1',
    limit: '30',
    order_by: 'desc'
  });

  const url = new URL(endpoint);
  url.search = searchParams.toString();

  const response = await fetch(url, {
    method: 'GET',
    headers: headers
  });

  if (response.status !== 200) {
    console.error(response.status);
    console.error(response.statusText);
    return result;
  }

  try {
    let tmp = await response.json();
    return tmp.data.jobs.map((job: any) => {
      delete job.key; // interferes with React's `key` prop
      return job;
    });
  } catch (err) {
    console.error(err);
  }

  return result;
}

export async function getCatogories() {
  return readFile('./src/data/categories.json', 'utf8').then((data) => {
    return JSON.parse(data);
  }).catch((err) => {
    console.error(err);
    return [];
  });
}
