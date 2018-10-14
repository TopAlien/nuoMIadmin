const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: '12345678',//12345678
    database: 'nuoMi',
    port: 3306
}
exports.query = (sql, params , callback) => {
    const connection = mysql.createConnection(config);
    connection.connect((err)=>{if(err){console.log('连接数据库失败')}});
    connection.query(sql, params ,(err, result, fields)=>{
        if(err){
            console.log('数据操作失败');
        }
        callback&&callback(result, fields);
        connection.end((err)=>{if(err){console.log('关闭数据库失败')}});
    });
}