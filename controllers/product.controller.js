const db= require('../models');
const Product = db.product;
const jwt=require('jsonwebtoken');
const User= db.users;


exports.getProducts=(req,res)=>{
  let reqQueryObj= req.query;
  let reqKeys= Object.keys(reqQueryObj);
  let filterObj={};
  let sortObj={};
  
  if(reqQueryObj.category){
    filterObj.category=reqQueryObj.category;
    
  }
  if(reqQueryObj.name){
    // filterObj.name=reqQueryObj.name;
    filterObj.name={ $regex: new RegExp(reqQueryObj.name), $options: "i" };    
    
  }
  if(reqQueryObj.sortBy){
    if(reqQueryObj.direction){
      if(reqQueryObj.direction==='ASC'){
        let sortBy= reqQueryObj.sortBy;
        sortObj[sortBy]=1;
      }
      else{
        let sortBy= reqQueryObj.sortBy;
        sortObj[sortBy]=-1;
      }
    }

    console.log(sortObj)
    Product.find(filterObj,null,{sort:sortObj})
    .then(data=>{
      res.send(data);
    })
    .catch(err=>{
      console.log(err)
      res.status(500).send(err)
    })
    return;
  }
  console.log(filterObj)
  Product.find(filterObj)
    .then(data=>{
      res.send(data);
    })
    .catch(err=>{
      console.log(err)
      res.status(500).send(err)
    })


}

exports.getCategories=(req,res)=>{
  Product.find()
  .then(data=>{
    let categoryArr= data.map(ele=>{
      return ele.category;
    })
    res.send(categoryArr)
  })
  .catch(err=>{
    console.log(err)
  })
}

exports.getProduct=(req,res)=>{
  let id= req.params.id;
  Product.find({_id:id})
  .then(data=>{
    
    res.send(data)
  })
  .catch(err=>{
    console.log(err)
  })
}

// available_items:Number,
// category:String,
// created:Date,
// description:String,
// image_url:String,
// manufacturer:String,
// name:String,
// price: mongoose.Types.Decimal128,
// updated:Date
exports.saveProduct=(req,res)=>{
  let user_id= req.jwtencodedUserID;
  console.log(user_id)
  User.findOne({_id:user_id})
  .then(user=>{
    
    if(user.role=='admin')
    {
      //CODE TO DO, RN SKIP THIS CAUSE NO ADMIN ACCOUNTS ARE SET UP and AUTH MIDDLEWARE IS NOT ADDED
          let newdate= new Date();
          dateToInsert= newdate.toISOString();
          let newproduct = new Product({
            name:req.body.name,
            category:req.body.category,
            availableItems:req.body.availableItems,
            createdAt:dateToInsert,
            updatedAt:dateToInsert,    
            description:req.body.description,
            imageURL:req.body.imageUrl,
            manufacturer:req.body.manufacturer,
            price: req.body.price,

          })
          newproduct.save()
          .then(data=>{
            res.send(data);
          })
          .catch(err=>{
            res.status(500).send(err);
          })

    }
    else{
      res.status(403).send('You are not authorized to access this endpoint!')
    }
  })
  
}
exports.getProduct=(req,res)=>{
  let id= req.params.id;
  Product.find({_id:id})
  .then(data=>{
    
    res.send(data)
  })
  .catch(err=>{
    console.log(err)
  })
}

// available_items:Number,
// category:String,
// created:Date,
// description:String,
// image_url:String,
// manufacturer:String,
// name:String,
// price: mongoose.Types.Decimal128,
// updated:Date
exports.updateProduct=(req,res)=>{
  let prodID= req.params.id;
  let user_id= req.jwtencodedUserID;
  let bodyData= req.body;
  console.log(user_id)
  User.findOne({_id:user_id})
  .then(user=>{
    
    if(user.role=='admin')
    {
      //CODE TO DO, RN SKIP THIS CAUSE NO ADMIN ACCOUNTS ARE SET UP and AUTH MIDDLEWARE IS NOT ADDED
          let newdate= new Date();
          dateToInsert= newdate.toISOString();
          Product.findOneAndUpdate({_id:prodID},
            {
              name:req.body.name,
              category:req.body.category,
              availableItems:req.body.availableItems,  
              description:req.body.description,
              imageURL:req.body.imageUrl,
              manufacturer:req.body.manufacturer,
              price: req.body.price,

            },
            {new:true})
          .then(data=>{
            if(data===undefined){
        
              res.send("No Product found for ID - "+prodID)
              return;
            }
            console.log("Data updated")
            console.log(data);
            res.send(data)
          })
          .catch(err=>{
            console.log(err);
            res.status(500).send(err);
          })

    }
    else{
      res.status(403).send('You are not authorized to access this endpoint!')
    }
  })
  
}

exports.deleteProduct=(req,res)=>{
  let prodID= req.params.id;
  let user_id= req.jwtencodedUserID;
  let bodyData= req.body;
  console.log(user_id)
  User.findOne({_id:user_id})
  .then(user=>{
    
    if(user.role=='admin')
    {
      //CODE TO DO, RN SKIP THIS CAUSE NO ADMIN ACCOUNTS ARE SET UP and AUTH MIDDLEWARE IS NOT ADDED
          let newdate= new Date();
          dateToInsert= newdate.toISOString();
          Product.findOneAndDelete({_id:prodID})
          .then(data=>{
            if(data===undefined){
        
              res.send("No Product found for ID - "+prodID)
              return;
            }
            console.log("Data deleted")
            console.log(data);
            res.send(data)
          })
          .catch(err=>{
            console.log(err);
            res.status(500).send(err);
          })

    }
    else{
      res.status(403).send('You are not authorized to access this endpoint!')
    }
  })
  
}