module.exports = (mongoose) => {
  const Order = mongoose.model("order",mongoose.Schema(
    {
      user:String,
      product:String,
      address:String,
      quantity:Number,
      amount:Number,
      
      orderDate:Date
    })
    );
  return Order;
  };