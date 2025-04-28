const express = require('express'); //express import
const app = express(); //express initialization
const port = 4000; //port number
const web = require('./routes/web'); //web route import
const route = require('./routes/web'); 
const flash = require('connect-flash'); //flash message import
const session = require('express-session'); //session import
app.set('view engine', 'ejs'); //view engine setup to view ejs files
app.use(express.static('public')); //static file path css/images
const sequelize = require('./database/connectdb'); //database connection
sequelize.sync().then(() => { //database connection
    console.log('database connected successfully');
}).catch((error) => {
    console.log(error);
});
//{ db tables creation
const admin = require('./model/admin'); //admin model import
const blog = require('./model/blogs'); //blog model import
const msgModel =  require('./model/message');
//}
app.use(express.urlencoded({extended:true})); //to get form data
const cookieParser = require('cookie-parser'); //cookie parser import
app.use(cookieParser()); //cookie parser initialization

const fileUpload =  require('express-fileupload')//file upload import
app.use(fileUpload({
    useTempFiles: true
  }));

app.use(session({ //session initialization
    secret:'secret',
    resave:false,
    maxAge: 60000,
    saveUninitialized:true
}));

app.use(flash()); //flash message initialization






//route loader
app.use('/', web); //web route

//server creation
app.listen(port, () =>{
    console.log(`Server is started on http://localhost:${port}`);
})