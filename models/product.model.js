module.exports = (mongoose) => {
  const Product = mongoose.model("product",mongoose.Schema(
    {
      availableItems:Number,
      category:String,
      createdAt:Date,
      description:String,
      imageURL:String,
      manufacturer:String,
      name:String,
      price: mongoose.Types.Decimal128,
      updatedAt:Date
    })
    );
  return Product;
  };