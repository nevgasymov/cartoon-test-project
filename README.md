# Rick & Morty Explorer

Character list for the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) with search,
filters, pagination and a character page.

## Run

Node 24.

```bash
npm ci
npm run dev
```

## Scripts

- `npm run test` - unit tests
- `npm run test:e2e` - Playwright, uses the real API
- `npm run lint`, `npm run typecheck`
- `npm run codegen` - regenerate types after changing a query

## Decisions

- **No GraphQL client.** Everything is fetched in server components, so Apollo or urql would mostly
  duplicate what Next already does with its cache. A small `fetch` wrapper plus `"use cache"` is
  enough, and none of it ends up in the client bundle.
- **GET instead of POST.** The API accepts queries over GET, which makes responses cacheable by URL,
  both in the Next data cache and in any CDN in front of it.
- **Generated types from a saved schema.** `schema.graphql` is checked in, so codegen and builds
  don't depend on the API being up. `npm run schema:pull` refreshes it. Each component declares the
  fields it needs as a fragment right next to where they're rendered.
- **Filters live in the URL.** nuqs keeps the filters and the page in the query string, so any view
  can be shared and survives a reload. Typing is debounced and replaces the history entry, while
  picking a status or gender pushes one, so Back undoes the last choice rather than every keystroke.
- **Pagination with links.** Plain links instead of buttons: they work without JS, can be opened in
  a new tab and give each page its own URL.
- **shadcn/ui on Base UI.** I only pulled in the primitives I actually use (button, input,
  skeleton). The selects are native `<select>` elements, which behave better on mobile and are
  accessible out of the box.
- **Tests.** Unit tests focus on the parts that are easy to get wrong: search param parsing, mapping
  API responses and pagination links. The network is mocked with MSW. E2E tests run against the real
  API, and every page goes through an axe check.
