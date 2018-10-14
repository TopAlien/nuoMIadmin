var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var db = require('../library/db.js');

var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
		opts.secretOrKey = 'secret';
	
//验证passport
module.exports = passport =>{
	passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
		   const email = jwt_payload.email; //查询
		   const name = jwt_payload.name;
		   const selectEmail = "select * from `user` where email='"+ email +"' and name='"+ name +"'";
		   db.query(selectEmail,[],(user, fileds)=>{
				if(user && user.length > 0){
					done(null, user); // req.user 取值
				}else{
					done(null, false)
				}
		   })
	}));
}