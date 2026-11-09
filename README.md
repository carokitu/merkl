# Merkl tokens

A small Next.js app that lists [Merkl](https://api.merkl.xyz) tokens and opens one token on its own page. The browser talks to this app. This app talks to Merkl.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` is the list. Filters live in the URL: `search`, `chainId`, and `verified=true`. `page` is optional and starts at 0.
- `/tokens/[id]` is one token. The id is Merkl's own id, not the symbol.

The chain filter takes a chain id (`1` for Ethereum), not a name.

## API

| Method | Path | |
|---|---|---|
| `GET` | `/api/tokens` | The list. Same query params as the page. |
| `GET` | `/api/tokens/[id]` | One token. |

A bad filter is `400`. If Merkl does not answer, the response is `502`.

The pages and the routes call the same functions. The page does not fetch its own HTTP route.

## Cache

`lib/merkl-api.ts` is the only door to Merkl. The list, the token, and the chain names go through `merklFetch`, which is cached with `"use cache"` and `cacheLife("minutes")`. The cache key is the full URL, so a different filter is a different entry. A failed call is not kept.
