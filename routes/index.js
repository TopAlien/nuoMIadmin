var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../library/db.js');


// @ get /library 动作库
// @search ?data=1&title='胸部' 返回应数据
// @access public
//表-library class字段说明
//1 - 胸部
//2 - 背部
//3 - 肩部
//4 - 手臂
//5 - 颈部
//6 - 腹部
//7 - 腰部
//8 - 臀部
//9 - 腿部
//10 - 全身
router.get('/library', (req, res)=>{
	const classId = req.query.data; //要查的种类

	const selectClass = "select * from `librarys` where class = '"+ classId +"'";
	db.query(selectClass,[],(result, fields)=>{
		if(result.length > 0){
			res.json(result);
		}else{
			res.json('没有此种类');
		}
	})
});

// @route POST /login
// @desc 登录
// @access public
router.post('/login', (req, res)=>{
	const email = req.body.email;
	const pass = req.body.pass;

	//查找用户
	const selectUser = "select * from `user` where email = '"+ email +"' and pass='"+ pass +"'";
	db.query(selectUser,[],(result, fields)=>{
		if(result && result.length > 0){
			//签名 jwt.sign('规则','加密名字','过期时间','箭头函数')
			const { name, email, avatar, city, sex, birth, identity } = result[0];
			// rule 会返回给token
			const rule = {
					name,
					email,
					avatar,
					city,
					sex,
					birth,
					identity
			}; //规则

			jwt.sign(rule, 'secret', { expiresIn: '10000h' }, (err,token)=>{
				if(err){
					console.log(err);
				}else{
					res.json({success:'ok',token: "Bearer " + token});
				}
			});
		}else{
			res.json('请确认后重新登录!!!');
		}
	});
})

// @route POST /register
// @desc 注册
// @access public
router.post('/register', (req, res)=>{
	const name = req.body.name;
	const email = req.body.email;
	const pass = req.body.pass;
	const repass = req.body.repass;
	console.log(name,email,pass,repass);
	if(pass !== repass){
		res.send('两次密码不一致	!!!');
	}else{
		//查找邮箱是否注册过
		const selectUser = "select email from `user` where email = '"+ email +"'";
		db.query(selectUser,[],(result, fields)=>{
			if(result && result.length > 0){
				res.json('此邮箱已注册!!!');
			}else{
				//注册一个用户
				const insertEmail = "insert into `user` (`name`,`email`,`pass`) values('"+ name +"', '"+ email +"', '"+ pass +"')";
				db.query(insertEmail, [], (result, fields)=>{
					res.json({name,email,pass}); // 返回注册信息
				});
			}
		});
	}
})

//@route GET /current
//@desc验证 token  登录后才能获取的信息 
//@access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=>{
	//验证token
	const {id, name ,email , identity} = req.user[0];
	res.json({
		id,
		name,
		email,
		identity //身份
	});
})

module.exports = router;
