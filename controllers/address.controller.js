const db= require('../models');
const User= db.users;
const Address= db.address;
// name:String,
// city:String,
// state:String,
// street:String, 
// contactNumber:String,       
// landmark:String,
// zipcode:String,
// user_id:String

exports.addone=(req,res)=>{
  console.log('I am reaching here');
  let user_id= req.jwtencodedUserID;

  User.findOne({_id:user_id})
  .then(user=>{
    if(user!==0){
      // console.log(user);
      let newAddress= new Address({
        name:req.body.name,
        city:req.body.city,
        state:req.body.state,
        street:req.body.street, 
        contactNumber:req.body.contactNumber,       
        landmark:req.body.landmark,
        zipcode:req.body.zipcode,
        user_id:user_id
      })
      newAddress.save()
      .then(data=>{
        data._doc.user=user;
        res.send(data)
      })
      .catch(e=>{
        console.log('error saving address')
      })
      
    }
    else{
      res.status(401).send("Please Login first to access this endpoint!");
    }
  })
  .catch(e=>{console.log(e)})
  
}