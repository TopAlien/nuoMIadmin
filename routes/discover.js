var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../library/db.js');
/*
方案:
【1】对于不需要在多终端同步购物车数据，以及购物车数据不太重要的情况下，可以选择把购物车的数据全部缓存在用户本地终端
用户在换一个终端设备，或者清除本进程缓存时，购物车里的数据都会丢失。
购物车。根据用户登录和未登录态两种情况来做
1.未登录时，可以采取cookie方式保存，因为存在客户端，可以缓解服务器压力。
当用户登录账号后，从cookie取数据保存到mysql里面。
2，用户登录了，保存购物车数据到mysql中
后面可能还会根据用户的购物车记录或者购买记录等等用户行为做一些商品推荐等推送
产品：采用hash表存储，productID，price。。。等等
购物车：采用集合存储，因为集合的唯一性，保证一个orderId对应多个商品
用户ID、商品ID、商品规格ID、商品数量。
用is_valid来识别物品是否已经结算（默认值为未结算） 或者结算后直接删除（就不再需要is_valid字段识别了
用户与商品对应关系表保存衍生信息（购物数量，价格，状态

/*
	一个用户  ---  一个购物车 ---- 多个商品
	用户表：id,uname,pwd等等
	商品表：id,goodname,price等
	购物车表：id,uid,uid为对应用户id
	购物车商品关系表:gid,cid分别为商品id,购物车id
 */

// router.get('/getLike',(req, res)=>{
// 		const selectClass = "select * from `likeShop`";
// 		db.query(selectClass,[],(result, fields)=>{
// 				if(result.length > 0){
// 					res.json(result);
// 				}else{
// 					res.json('没有此种类');
// 				}
// 		})
// })

/**
 *@GET discover/shop
 *0 全部数据
 */
 router.get('/getShop',(req, res)=>{
 		const  gid = req.query.gid;
		const text  = req.query.text;
		let selectClass = "";
		if(gid == 0){
			selectClass = "select * from `shop`";
		}else{
			selectClass = "select * from `shop` where id = '"+ gid +"' and text = '" + text +"'";
		}
		db.query(selectClass,[],(result, fields)=>{
				if(result.length > 0){
					res.json(result);
				}else{
					res.json('没有此种类');
				}
		})
 })

/*
 	GET /discover/allCourse
表-courses class 字段说明
1 - 为你推荐
2 - 大家都在练
3 - 最新上架
4 - 健身
5 - 跑步
6 - 瑜伽
 */
router.get('/allCourse',(req, res)=>{
		const  courseId = req.query.course;
		const title  = req.query.title;
		let selectClass = "";
		if(courseId == 0){
			selectClass = "select * from `courses`";
		}else{
			selectClass = "select * from `courses` where class = '"+ courseId +"'";
		}
		db.query(selectClass,[],(result, fields)=>{
				if(result.length > 0){
					res.json(result);
				}else{
					res.json('没有此种类');
				}
		})
})
module.exports = router;
