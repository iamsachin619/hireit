const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
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

module.exports = upload
