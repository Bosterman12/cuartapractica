/*const applyPolicy = (roles) =>{
    return (req,res,next) =>{
        if(roles[0].toUpperCase()==="PUBLIC") return next();
        if(!req.user) return res.status(401).send({status:"error",error:"Not authenticated"})
        if(!roles.includes(req.user.role.toUpperCase())) return res.status(403).send({status:"error",error:"Not authorized"})
        next();
    }
}*/
export const applyPolicy = (role) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ Error: 'You must be logged in' })
      }
  
      if (role.includes(req.user.role)) {
        return next()
      } else {
        //return res.status(401).json({ Error: 'unauthorized' })
        res.render('adminStop', {
                  
          email: user.email,
          role: user.role,
         
         })
      }
    }
  }

export default applyPolicy