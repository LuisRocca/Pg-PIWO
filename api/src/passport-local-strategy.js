const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const { User } = require('./db.js');
var bcrypt = require('bcryptjs'); 

const comparePassword=(passwordEncripted,passwordReceived)=>{
  return bcrypt.compareSync(passwordReceived,passwordEncripted)
}

passport.use("local",new LocalStrategy(
    {
        usernameField:"username",
        passwordField:"password",
        passReqToCallback: true,
    },
    async function(req,username, password, done) { 
      try{
        await User.findOne({where :{ username }}).then((userFinded)=>{
            const userTest=userFinded
          if(!userFinded) {
              return done(null, false)
          }
          if(!comparePassword(userFinded.password,password)) {
              return done(null,false)
          } 
          return done(null,userFinded)
        })
      }catch(err){
        return done(err,userFinded)
      }
      }
  ));

passport.serializeUser((user,done)=>{
    const sUser=user
    return done(null,user.id)
})   
passport.deserializeUser(async(id,done)=>{
    return await User.findByPk(id).then(userFinded=>done(null,userFinded))
})