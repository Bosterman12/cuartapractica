import { Router } from "express";
import passport from "passport";
//import { createUser } from "../controllers/users.controller.js";
import { findOneUser, findAllUsers, createOneUser, updateOneUser, deleteOneUser } from "../controllers/users.controller.js";
import { upload, uploadProfile, uploadDocument} from "../controllers/multer.controller.js";
import multer from "multer";
import appyPolicy, { applyPolicy } from '../middleware/role.middleware.js'

const userRouter = Router()

userRouter.get('/register', async (req, res) =>{
    res.render('sessions/register')
})

userRouter.post('/register', passport.authenticate('register',{
  failureRedirect: '../api/errorSignup',
}), createOneUser)

userRouter.get(
    '/githubregister',
    passport.authenticate('githubSignup', { scope: ['user:email'] })
  )

 userRouter.get('/github', 
  passport.authenticate('githubSignup', { failureRedirect: '/session/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('../api/product');
  })

  userRouter.get(
    '/googleSignup',
    passport.authenticate('googleStrategy', { scope: ['profile'] })
  ) 

  userRouter.get('/google', 
  passport.authenticate('googleStrategy', { failureRedirect: '/session/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('../api/product');
  })

userRouter.get('/',applyPolicy(['admin']), findAllUsers)
userRouter.get('/:id', findOneUser)
//userRouter.post('/register', createOneUser)

userRouter.post('/documents/uploadProduct', upload.single('product'), (req, res) => {
  console.log(req.body)
  console.log(req.file.fieldname)
  res.send("imagen subida")
  const typeFile = req.file.fieldname
    console.log(typeFile)
})

userRouter.post('/documents/uploadDocument', uploadDocument.single('document'), (req, res) => {
  console.log(req.body)
  console.log(req.file.fieldname)
  res.send("documento subido")
  const typeFile = req.file.fieldname
    console.log(typeFile)
})

userRouter.post('/documents/uploadProfile', uploadProfile.single('profile'), (req, res) => {
  console.log(req.body)
  console.log(req.file.fieldname)
  res.send("perfil subido")
  const typeFile = req.file.fieldname
    console.log(typeFile)
})

userRouter.post('/premium/:uid', appyPolicy(['admin']), updateOneUser)
userRouter.delete('/delete/:id', appyPolicy(['admin']), deleteOneUser)

export default userRouter