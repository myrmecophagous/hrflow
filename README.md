# Job viewer

The framework of choice for this project is [Next.js 14](https://nextjs.org/).
As of javuary 2024, it implements most of the React 18 features, including server components and server actionss.


## Checklist

- [x] Retrieve the list of jobs from the API
- [x] Implement the search bar
- [x] Implement filtering by title / category
  * category filter is simple select, not multiselect
- [x] Implement sorting by a selected field
  * Sorting order can be selected in a separate dropdown
  * Only the fields specified in the project description are included
- [x] Enable Drag&Drop
- [x] Add Error and Suspence boundaries
- [x] Implement pagination

- [x] Mobile first with `grid` and `flexbox`
- [x] Accessibility check with Axe DevTools and Lighthouse


## Install

The following environment variables should be set before running the application:
- `API_KEY`
- `BOARD_KEY`
- `ENDPOINT`

Intall and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Snapshot and visual regression tests with Storybook

[Storybook](https://storybook.js.org/) is a tool for building components and pages in isolation.

run `npm run storybook` to start the Storybook server, it opens a new tab automatically.

To obtain test coverage, run `npm run test`.
