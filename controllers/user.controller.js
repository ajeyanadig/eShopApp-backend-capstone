const bcrypt= require('bcrypt');
const db= require('../models');
const jwt = require('jsonwebtoken');
const User= db.users;

exports.signup=(req,res)=>{
  if(!req.body.email||!req.body.password){
    res.status(400).send("Email OR Password isn't provided sir/madame");
    return;
  }
  User.findOne({email:req.body.email},(err,user)=>{
    console.log(user);
    if(user===null){
      console.log('No existing user with same email :: valid signup :: mongoose\'s save function will now be executed');
      const salt= bcrypt.genSaltSync(10);// use sync method to wait till this salt is generated, or the control may go ahead with undefined salt VAL:10 is fast and recommended
      const hashedPass= bcrypt.hashSync(req.body.password,salt)
      let date= new Date();
      let dateToInsert= date.toISOString();

      let user= new User({
        first_name:req.body.firstName,
        last_name:req.body.lastName,
        email:req.body.email,
        contactNumber:req.body.contactNumber,
        password:hashedPass,
        created:dateToInsert,
        updated:dateToInsert
      });
      user.save()
        .then((data)=>{res.send(data)})
        .catch(e=>res.status(500).send('cant enter new user in signup '+e))
    }
    else{
      console.log('User already exists, invalid signup, go to login page');
      res.status(400).send('Try any other email, this email is already registered!');
      return;
    }
  })
}
exports.login=(req,res)=>{
  console.log(req.body);
  if(!req.body.email||!req.body.password){
    res.status(400).send("Email OR Password isn't provided sir/madame");
    return;
  }
  User.findOne({email:req.body.email}/* projection param ,"_id firstName email password"*/,(err,user)=>{
    if(err){
      res.status(500).send('Error fetching user data from DB at login')
      return;
    }
    if(user===null){
        res.status(400).send({
          message:"This email has not been registered!"
        });
    }
    else{
      
        if(bcrypt.compareSync(req.body.password,user.password)){ //CHECK ENCRYPTED PWD - args(firstNormalString,secondEncryptedPWD from DB  )
          const token= jwt.sign({_id:user._id},"myPrivateKey");
          console.log('JWT :: '+token)
          console.log('Login Successful')
          res.header('x-auth-token',token)
          user.token=token
          res.send({
            email:user.email,
            name:user.first_name+' '+user.last_name,
            isAuthenticated:true
          });
  
        }
        else{
          res.status(401).send({
            message:"Password incorrect"
          });
        }
    }
  })
  
 
}
exports.logout=(req,res)=>{
  res.send('Logout Reached')
}