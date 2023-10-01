# blog-analytics

A Node.js and Express.js application that fetches and analyzes blog data from a third-party API. This tool allows you to retrieve statistics about the blogs and perform searches. Additionally, it includes a caching mechanism to improve performance.

## Configuration

Before running the application, you need to configure your environment variables. Create a `.env` file in the root of your project and define the following variables:

```plaintext
PORT=YOUR_PORT_No
BLOG_API=YOUR_BLOG_API_URL
BLOG_API_HEADER_VALUE=YOUR_BLOG_API_HEADER_VALUE
```

Replace the placeholders with the appropriate values for your setup.

## Routes

The following routes are available:

- `/api/blog-stats`: Get statistics about the fetched blog data.
- `/api/blog-search`: Search for blogs based on a query parameter.
- `/api/blog-stats-cached`: Get cached statistics about the fetched blog data.
- `/api/blog-search-cached`: Search for blogs based on a query parameter with caching.

## Caching

The application includes caching using Lodash memoization. Cached data is stored in memory and will be used for a configured expiration period (5 minutes by default) before making a new API request. This caching mechanism helps reduce the load on the third-party API and improve response times.

---
