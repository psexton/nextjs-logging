This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running Locally

### Dev Build

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
docker compose build
docker compose up
```

## Testing Logging

Open [http://localhost:3000/api/log-test](http://localhost:3000/api/log-test) to exercise logging from both the middleware (Edge) and backend (Node).