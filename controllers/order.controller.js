const db= require('../models');
const Product= db.product;
const Address= db.address;
const User= db.users;
const Order= db.order;

//In all honesty, Mongoose should've been taught using exec() fn so that async await could be used to chain functions
//and what not. based on the limited scope of what was taught, i made this API with those resources only
//to whoever going through this API : I am calling find methods inside then then function of those methods
//behaving like promises and making a sort function call inside function call thing, which could've also
//turned into a callback hell in case I tried a callback approach. If possible, during the review, PLEASE
//reach out to me a with the solution that you have for this project in case there's a better structure
//like using actual promises with mongoose promises and chaining their outputs efficiently and cleanly
//Any help would be appreciated !!

module.exports.saveOrder=(req,res)=>{
  let productIsValid=false,addressIsValid=false,orderIsValid=false;
  let productID=req.body.productID;
  let addressID=req.body.addressID;
  let quantity=req.body.quantity;
  let userID=req.jwtencodedUserID;
  let productData;
  let dataToSend={};
  console.log(req.body);
  Product.find({_id:productID})
  .then(data=>{
    if(data.length>0){
      productIsValid=true;
      let availableItems=data[0].availableItems;
      if(availableItems<quantity){
        res.status(404).json({message:`Product with ID - ${productID} is currently out of stock`});
        return;

      }
      else{
        let calculatedAmount=data[0].price*quantity;
        dataToSend.amount=calculatedAmount;


        orderIsValid=true;
        dataToSend.product=data[0];


        User.findOne({_id:userID}).then(user=>{
          if(user!==null){
            dataToSend.user=user;
            Address.find({_id:addressID})
            .then(address=>{
              if(address.length>0){
                addressIsValid=true;


                address[0]._doc.user=user;
                dataToSend.shippingAddress=address[0];

                let newdate= new Date();
                dateToInsert= newdate.toISOString();
                dataToSend.orderDate= dateToInsert;

                let order= new Order({
                  product:productID,
                  address:addressID,
                  quantity:quantity,
                  user:userID,
                  amount:calculatedAmount,
                  orderDate:dateToInsert
                })
                order.save()
                .then(orderData=>{
                  dataToSend.id=orderData._id;
                  res.send(dataToSend);
                }).catch(err=>{console.log(err)})
              }
              else{
                res.status(404).json({message:`No Address found for ID - ${addressID}!`})
              }
          
              
            }).catch(err=>{console.log(err)})

          }
        })


      }

    }
    else{
      res.status(404).json({message:`No Product found for ID - ${productID}!`})
    }



  }).catch(err=>{console.log(err);})


  // Address.find({_id:addressID})
  // .then(data=>{
  //   if(data.length>0){
  //     addressIsValid=true;
      
  //     dataToSend.shippingAddress=data[0];
  //   }
  //   else{
  //     res.status(404).json({message:`No Address found for ID - ${addressID}!`})
  //   }

    
  // }).catch(err=>{console.log(err)})
  




}