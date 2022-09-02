module.exports = (mongoose) => {
  const AddresSchema= new mongoose.Schema({
    name:String,
    city:String,
    state:String,
    street:String, 
    contactNumber:String,       
    landmark:String,
    zipcode:String,
    user_id:String
  })
  let Address= mongoose.model('address',AddresSchema);
  return Address;
};