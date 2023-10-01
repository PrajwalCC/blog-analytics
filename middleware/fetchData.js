const axios = require('axios');


const BLOG_API_URL = process.env.BLOG_API;
const BLOG_API_HEADERS = {
    'x-hasura-admin-secret' : process.env.BLOG_API_HEADER_VALUE
};

async function fetchData(req, res, next) {
    try {
        const response = await axios.get(BLOG_API_URL, { headers: BLOG_API_HEADERS });
        req.blogData = response.data.blogs;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from the blog API.' });
    }
}

module.exports = fetchData;