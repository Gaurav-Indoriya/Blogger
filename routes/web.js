const express = require('express');
const route = express.Router();
const frontcontroller = require('../controllers/frontcontroller');
const checkAuth = require('../middleware/auth'); //importing authentication middleware
const admin = require('../middleware/admin');

route.get('/',admin, frontcontroller.home);
route.get('/about',admin, frontcontroller.about);
route.get('/contact',admin, frontcontroller.contact);
route.get('/login',admin, frontcontroller.login);
route.get('/bloglist',admin, frontcontroller.bloglist);
route.post('/verifyLogin', frontcontroller.verifyLogin);
route.post('/contactForm', frontcontroller.contactForm);
route.get('/logout',checkAuth,frontcontroller.logout);
route.get('/dashboard',checkAuth,frontcontroller.dashboard);
route.get('/adminBlogList',checkAuth,frontcontroller.adminBlogList);
route.get('/addBlog',checkAuth, frontcontroller.addBlog);
route.get('/messageView',checkAuth,frontcontroller.messageView);
route.post('/msgInsert',frontcontroller.msgInsert);
route.post('/msgDelete/:id',frontcontroller.msgDelete);
route.get('/readBlog/:id',frontcontroller.readBlog);
route.post('/addPost',checkAuth, frontcontroller.addPost);
route.get('/deletePost/:id',checkAuth, frontcontroller.deletePost);
route.get('/blogsByCategory/:category', frontcontroller.blogsByCategory);
route.get('/editBlog/:id',checkAuth, frontcontroller.editBlog);
route.post('/updateBlog/:id',checkAuth, frontcontroller.updateBlog);
route.get('/categories',checkAuth,frontcontroller.categories);
route.get('/pages',checkAuth,frontcontroller.pages);
route.get('/viewPage/:id',checkAuth,frontcontroller.viewPage);
route.get('/viewCategory/:category',checkAuth,frontcontroller.viewCategory);
route.get('/categoryBlogPage/:id',checkAuth,frontcontroller.categoryBlogPage)
module.exports = route; 