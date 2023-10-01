const _ = require('lodash');

function analyzeData(req, res, next) {
    try {
        const blogs = req.blogData;
      
        const totalBlogs = blogs.length;
        const longestTitleBlog = _.maxBy(blogs, blog => (blog.title ? blog.title.length : 0));
        const privacyBlogsCount = _.filter(blogs, blog => blog.title && blog.title.toLowerCase().includes('privacy')).length;
        const uniqueTitles = _.uniq(blogs.map(blog => blog.title || '')).filter(title => title);
        req.analytics = {
          totalBlogs,
          longestTitle: longestTitleBlog.title,
          privacyBlogsCount,
          uniqueTitles
        };
      
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error in Analysing data of blogs.' });
    }
}

module.exports = analyzeData;