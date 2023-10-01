const axios = require('axios');

const BLOG_API_URL = process.env.BLOG_API;
const BLOG_API_HEADERS = {
    'x-hasura-admin-secret' : process.env.BLOG_API_HEADER_VALUE
};

let cache = {
    data: null,
    timestamp: 0,
    expiration: 5 * 60 * 1000 // 5 minutes
};

async function fetchWithCache(req, res, next) {
    const currentTime = new Date().getTime();

    if (cache.data && (currentTime - cache.timestamp < cache.expiration)) {
        req.blogData = cache.data;
        return next();
    }

    try {
        const response = await axios.get(BLOG_API_URL, { headers: BLOG_API_HEADERS });
        req.blogData = response.data.blogs;

        cache.data = response.data.blogs;
        cache.timestamp = currentTime;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from the blog API.' });
    }
}

module.exports = fetchWithCache;