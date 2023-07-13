const { Router } = require('express');
const { GetAll, PostBlog, UpdateBlog, DeleteBlog, GetOne, GetAllMessage, PostMessage, DeleteMessage, PopularBlog, Search } = require('../controller/Controller');
const { Login, isAuth } = require('../controller/Admin.controller');
const router = Router()

router.post('/login',Login);
router.get('/blogs',isAuth,GetAll);
router.post('/post/blogs',isAuth,PostBlog);
router.put('/put/blogs',isAuth,UpdateBlog);
router.delete('/delete/:id',isAuth,DeleteBlog);
router.get('/blogs/:id',isAuth,GetOne);
router.get('/messages',isAuth,GetAllMessage);
router.post('/post/messages',isAuth,PostMessage);
router.delete('/messages/:id',isAuth,DeleteMessage);
router.get('/popular',PopularBlog);
router.get('/search/:name',Search)

module.exports = router;