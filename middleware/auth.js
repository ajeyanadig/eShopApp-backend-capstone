const jwt = require('jsonwebtoken');

module.exports= function(req,res,next){
  const token= req.headers['x-auth-token'];
  console.log('Token in auth middleware : '+token);
  if(!token){
    res.status(401).send("Please Login first to access this endpoint!")
  }
  try
  {
    let decodedValue= jwt.verify(token,"myPrivateKey");
    console.log('User authenticated by auth middleware and ');
    console.log(decodedValue)
    req.jwtencodedUserID=decodedValue._id;//this is user ID
    next();
  } catch(exception){
    res.status(401).send("Please Login first to access this endpoint!");
  }

  
}