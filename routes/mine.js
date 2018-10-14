var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var path = require('path');
var fs = require('fs');
var db = require('../library/db.js');

//修改用户信息 mine/personal/name privent
router.post('/personal/name',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
	const { name ,email } = req.user[0];
	const { userName } = req.body;
	const upDateName = "update `user` set name='"+ userName +"' where email='"+ email +"'";
	db.query(upDateName,[],(files,fields)=>{
			const selectUser = "select * from `user` where email = '"+ email +"' ";
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
					res.json('修改失败!!!');
				}
			});
	})
})

//性别 mine/personal/sex
router.post('/personal/sex',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
	const { name ,email } = req.user[0];
	const { userSex } = req.body;
	const upDateSex = "update `user` set sex='"+ userSex +"' where email='"+ email +"'";
	db.query(upDateSex,[],(files,fields)=>{
			const selectUser = "select * from `user` where email = '"+ email +"' ";
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
					res.json('修改失败!!!');
				}
			});
	})
})

// 出生 mine/personal/birth
router.post('/personal/birth',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
	const { name ,email } = req.user[0];
	const { userBirth } = req.body;
	const upDateBirth = "update `user` set birth='"+ userBirth +"' where email='"+ email +"'";
	db.query(upDateBirth,[],(files,fields)=>{
			const selectUser = "select * from `user` where email = '"+ email +"' ";
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
					res.json('修改失败!!!');
				}
			});
	})
})

//城市 mine/personal/city
router.post('/personal/city',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
	const { name ,email } = req.user[0];
	const { userCity } = req.body;
	const upDateCity = "update `user` set city='"+ userCity +"' where  email='"+ email +"'";
	db.query(upDateCity,[],(files,fields)=>{
			const selectUser = "select * from `user` where email = '"+ email +"' ";
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
					res.json('修改失败!!!');
				}
			});
	})
})

// 	/mine/upload
//	上传头像 privent 验证
router.post('/upload',passport.authenticate('jwt', {session: false}),(req, res, next)=>{
	// 头像上传
	const { name ,email } = req.user[0];

	const ext = path.parse(req.files[0].originalname).ext;
	const oldPath = req.files[0].path;
	const newPath = req.files[0].path + ext;
	const sqlName = req.files[0].filename + ext;
	fs.rename(oldPath,newPath,(err)=>{
		if(err){
			console.log(err);
		}else{ 
			//更行头像 ---
			const upDatePic = "update `user` set avatar='"+ sqlName +"' where name ='"+ name +"' and email='"+ email +"'";
			db.query(upDatePic,[],(result, fields)=>{
				// //更新token
				const selectUser = "select * from `user` where email = '"+ email +"' and name ='"+ name +"'";
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
						res.json('修改失败!!!');
					}
				});
			});
		}
	});
});
module.exports = router;











