const auth=require('../middleware/auth');

module.exports= app =>{
  const router = require('express').Router();
  const user= require('../controllers/user.controller');
  const address= require('../controllers/address.controller');
  const product= require('../controllers/product.controller');
  const order= require('../controllers/order.controller');

  //Sign up, Login, Logout
  router.post('/users',user.signup);
  router.post('/auth',user.login);
  router.post('/logout',user.logout);

  router.post('/addresses',auth,address.addone);

  router.get('/products', product.getProducts);
  router.get('/products/categories', product.getCategories);
  router.get('/products/:id', product.getProduct);
  router.post('/products/',auth, product.saveProduct);
  router.put('/products/:id',auth, product.updateProduct);
  router.delete('/products/:id',auth, product.deleteProduct);

  router.post('/orders',auth,order.saveOrder);


    
  


  app.use('/api', router);
}