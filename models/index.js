const mongoose= require('mongoose');
const dbUrl="mongodb://localhost:27017/eShopApplication";
const db={};
db.mongoose=mongoose;
db.url=dbUrl;
db.users=require('./user.model')(mongoose);
db.address= require('./address.model')(mongoose);
db.order=require('./order.model')(mongoose);
db.product=require('./product.model')(mongoose);
module.exports=db;