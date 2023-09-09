import multer from "multer";


    
   
     const storage = multer.diskStorage(   
        {
    destination: (req, file, cb) => {
        cb(null, 'src/public/img/product')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})


export const upload = (multer({storage:storage}))

const storageProfile = multer.diskStorage(   
    {
destination: (req, file, cb) => {
    cb(null, 'src/public/img/profiles')
},
filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
}
})


export const uploadProfile = (multer({storage:storageProfile}))

const storageDocument = multer.diskStorage(   
    {
destination: (req, file, cb) => {
    cb(null, 'src/public/img/documents')
},
filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
}
})


export const uploadDocument = (multer({storage:storageDocument}))