const pool = require('../database/connectdb');
const jwt = require('jsonwebtoken');
const adminModel = require('../model/admin');
const blogModel = require('../model/blogs');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary'); //image upload
const msgModel = require('../model/message');
const Sequelize = require('sequelize');

//Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dll5kqstq',
    api_key: '538369545927589',
    api_secret: '-Yb0q6W0pLcrcqsGp78rmTBMpCM' // Click 'View API Keys' above to copy your API secret
});

class frontcontroller {

    static home = async (req, res) => {//home page
        try {
            const blogs = await blogModel.findAll({
                order: [['updatedAt', 'DESC']],
                limit: 6
            });
            res.render('index', { blogs });
        } catch (error) {
            console.log(error);
        }
    }

    static about = async (req, res) => { //about page
        try {
            res.render('about');
        } catch (error) {
            console.log(error);
        }
    }

    static contact = async (req, res) => { //contact page
        try {
            res.render('contact', { message: req.flash('msgSent') });
        } catch (error) {
            console.log(error);
        }
    }

    static login = async (req, res) => { //admin login page
        try {
            res.render('login', { message: req.flash('LoginError'), message2: req.flash('success') });
        } catch (error) {
            console.log(error);
        }
    }

    static bloglist = async (req, res) => { //blog list page
        try {
            const blogs = await blogModel.findAll({
                order: [['updatedAt', 'DESC']]
            });
            res.render('bloglist', { blogs });
        } catch (error) {
            console.log(error);
        }
    }

    static verifyLogin = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await adminModel.findOne({ where: { email } });

            if (!user) {
                console.log("User not found, redirecting...");
                req.flash('LoginError', 'Invalid email or password');
                return res.redirect('/login');
            }

            if (user.password === password) {
                const token = jwt.sign({ ID: user.id }, 'gaurav$');
                res.cookie('token', token);
                return res.redirect('/dashboard');
            } else {
                console.log("Password mismatch, redirecting...");
                req.flash('LoginError', 'Invalid email or password');
                return res.redirect('/login');
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };


    static logout = async (req, res) => {  //admin logout
        try {
            res.clearCookie('token');  // Remove the token from cookies
            req.flash("success", "You have been logged out!");
            res.redirect('/login');
        } catch (error) {
            console.log(error);
        }
    }

    static dashboard = async (req, res) => { //admin dashboard
        try {
            const allPossibleCategories = [
                "Technology", "Design", "Culture", "Business", "Politics",
                "Opinion", "Science", "Health", "Style", "Travel"
            ];

            const allBlogs = await blogModel.findAll({
                attributes: ['category', [Sequelize.fn('COUNT', Sequelize.col('category')), 'count']],
                group: ['category'],
                raw: true
            });

            // Convert DB result to a dictionary for easy lookup
            const countMap = Object.fromEntries(allBlogs.map(item => [item.category, item.count]));

            // Create chart data including zero-count categories
            const chartData = allPossibleCategories.map(cat => [cat, countMap[cat] || 0]);


            //console.log(allBlogs);
            const admin = req.admin;
            // console.log(admin);
            res.render('admin/dashboard', { admin, chartData: JSON.stringify(chartData) });
        } catch (error) {
            console.log(error);
        }
    }

    static adminBlogList = async (req, res) => { //admin blog list
        try {
            const admin = req.admin;
            const blogs = await blogModel.findAll();
            res.render('admin/admin-blog-list', { message: req.flash('success'), blogs, admin });
        } catch (error) {
            console.log(error);
        }
    }

    static addBlog = async (req, res) => { //admin add blog
        try {
            const admin = req.admin;
            res.render('admin/blog-form', { admin });
        } catch (error) {
            console.log(error);
        }
    }

    static contactForm = async (req, res) => { //contact form submission
        try {

            req.flash('contactSuccess', 'Your message has been sent successfully');
            res.redirect('/contact');
        } catch (error) {
            console.log(error);
        }
    }

    static messageView = async (req, res) => { //admin message view
        try {
            const admin = req.admin;
            const viewMsg = await msgModel.findAll();
            res.render('admin/message', { admin, viewMsg, message: req.flash('msgDelete') });
        } catch (error) {
            console.log(error);
        }
    }

    static msgInsert = async (req, res) => {
        try {
            const { id, name, email, phone, message } = req.body;
            await msgModel.create({
                name: name,
                email: email,
                phone: phone,
                message: message
            });
            req.flash('msgSent', "Your message has been sent");
            res.redirect('/contact');
        } catch (error) {
            console.log(error);
        }
    }

    static msgDelete = async (req, res) => {
        try {
            const id = req.params.id;
            await msgModel.destroy({ where: { id } });
            req.flash('msgDelete', "Meesage has been deleted")
            res.redirect('/messageView');
        } catch (error) {
            console.log(error);
        }
    }

    static pages = async (req, res) => {
        try {
            const blogPages = await blogModel.findAll({
                order: [['updatedAt', 'DESC']]
            });
            // console.log(blogPages);
            const admin = req.admin;
            res.render('admin/pages', { admin, blogPages });
        } catch (error) {
            console.log(error);
        }
    }

    static readBlog = async (req, res) => { //admin message detail }
        try {
            const id = req.params.id;
            const blogscategory = await blogModel.findAll({ where: { id } });
            const blogs = await blogModel.findOne({ where: { id } });
            const recentblogs = await blogModel.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
            //console.log(blogs);
            res.render('detail', { blogs, recentblogs, blogscategory });
        } catch (error) {
            console.log(error);
        }
    }

    static addPost = async (req, res) => { //admin add post
        try {
            const { title, category, description } = req.body;
            const image = req.files.image;
            //console.log(title, category, description, image);
            const uploadImage = await cloudinary.uploader.upload(image.tempFilePath, { //image upload using cloudinary
                folder: 'blog'
            });
            await blogModel.create({
                title: title,
                category: category,
                description: description,
                img_public_id: uploadImage.public_id,
                img_url: uploadImage.secure_url
            });

            req.flash('success', 'Post added successfully');
            res.redirect('/adminBlogList');

        } catch (error) {
            console.log(error);
        }
    }

    static deletePost = async (req, res) => { //admin delete post
        try {
            const id = req.params.id;
            const blog = await blogModel.findOne({ where: { id } });
            //console.log(blog);
            if (blog) {
                await cloudinary.uploader.destroy(blog.img_public_id); //delete image from cloudinary
                await blogModel.destroy({ where: { id } });
                req.flash('success', 'Post deleted successfully');
                res.redirect('/adminBlogList');
            } else {
                res.redirect('/adminBlogList');
            }
        } catch (error) {
            console.log(error);
        }
    }

    static blogsByCategory = async (req, res) => { //admin blog by category
        try {
            const category = req.params.category;
            const admin = req.admin;
            const blogs = await blogModel.findAll({ where: { category } });
            //console.log(blogs);
            res.render('blogsByCategory', { blogs, category, admin });
        } catch (error) {
            console.log(error);
        }
    }


    static editBlog = async (req, res) => { //admin edit blog
        try {
            const id = req.params.id;
            const admin = req.admin;
            const blog = await blogModel.findOne({ where: { id } });
            res.render('admin/editBlog', { blog, admin });
        } catch (error) {
            console.log(error);
        }
    }

    static updateBlog = async (req, res) => { //admin save edit blog  
        try {
            const id = req.params.id;
            const { title, category, description } = req.body;
            const image = req.files && req.files.image;

            const blog = await blogModel.findOne({ where: { id } });
            if (image) {
                await cloudinary.uploader.destroy(blog.img_public_id); //delete old image from cloudinary
                const uploadImage = await cloudinary.uploader.upload(image.tempFilePath, { //image upload using cloudinary
                    folder: 'blog'
                });
                await blogModel.update({
                    title: title,
                    category: category,
                    description: description,
                    img_public_id: uploadImage.public_id,
                    img_url: uploadImage.secure_url
                }, { where: { id } });
            } else {
                await blogModel.update({
                    title: title,
                    category: category,
                    description: description
                }, { where: { id } });
            }
            req.flash('success', 'Post updated successfully');
            res.redirect('/adminBlogList');
        } catch (error) {
            console.log(error);
        }
    }

    static viewPage = async (req, res) => {
        try {
            const admin = req.admin;
            const id = req.params.id;
            const page = await blogModel.findOne({ where: { id } });
            res.render('admin/viewPage', { admin, page });
        } catch (error) {
            console.log(error);
        }
    }

    static categories = async (req, res) => {
        try {
            const admin = req.admin;
            res.render('admin/categories', { admin });
        } catch (error) {
            console.log(error);
        }
    }

    static viewCategory = async (req, res) => {
        try {
            const category = req.params.category;
            const blogs = await blogModel.findAll({ where: { category } });
            const admin = req.admin;
    
            res.render('admin/viewCategory', {
                admin,
                blogs,
                currentCategory: category  // <-- pass this!
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    static categoryBlogPage = async (req,res) =>{
        try {
            const admin = req.admin;
            const id = req.params.id
            const blogs = await blogModel.findOne({ where : {id}});
            //console.log(blogs);
            res.render('admin/category-blog',{admin, blogs});
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = frontcontroller; 