module.exports = (mongoose) => {
  const User = mongoose.model("user",mongoose.Schema(
    {
      id:Number,
      email:{type:String, required:true, unique:true},
      first_name:{type:String, required:true},
      last_name:String,
      password:String,
      contactNumber:String,
      role:{
        type:String,
        enum:['user','admin'],
        default:'user'
      },
      created:Date, 
      updated:Date,
      user_name:String
    })
    );
  return User;
  };