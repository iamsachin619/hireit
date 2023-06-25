var express = require('express')
const bookroutes = require('./routes/book')
const userroutes =  require('./routes/user')
const staffroutes = require('./routes/staff')
const adminroutes =  require('./routes/admin')
const candidateRoutes = require('./routes/candidate')
const dotenv = require('dotenv')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
dotenv.config()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express()
// app.use(cors({origin: 'http://localhost:3000',credentials: true}))
app.use(cors({origin: 'https://hireit-3b536.web.app',credentials: true, }))
app.use(cookieParser())
app.use(express.json());
app.use('/uploads', express.static('uploads')); // to access the uploads folder
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log({file})
        let uniqueName = uuidv4();
        console.log({uniqueName})
        let fileName = uniqueName + '.' + file.mimetype.split('/')[1]
        req.imgName = fileName
        cb(null, fileName)
  	}
})

const upload = multer({ storage: storage })
app.post('/test',upload.single('imgFile'), (req,res)=>{

    console.log(req.imgName)
    res.cookie('user','sachin' ).send('true')
    
})

app.get('/signOut', (req,res)=>{
    res.clearCookie('access_token')
    res.send('signed Out').status(200)
})

app.use('/book', bookroutes)    
app.use('/user', userroutes)
app.use('/staff',staffroutes)
app.use('/admin', adminroutes)
app.use('/candidate', candidateRoutes)

app.listen(8000,() => {console.log("server started on port 8000")})