const express= require('express');
const bodyParser= require('body-parser');
const app= express();
const cors= require('cors');  
const PORT = 8000; 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var corsOptions={
  origin:"http://localhost:3000"
}
app.use(cors(corsOptions));


const db= require('./models');
db.mongoose.connect(db.url,{
      useNewUrlParser:true,
      useUnifiedTopology:true
}).then(()=>{
  console.log('Connected to Database')
}).catch((err)=>{
  console.log('Cant connect to Database and error : '+err)
  process.exit();
});

app.get('/',(req,res)=>{
  res.send('Index Path response coded in index.js, server is up and running');
  res.end();
})



//all user signup,login,logout APIs '/api'
require('./routes/index.js')(app);




app.listen(PORT,()=>{
  console.log('server running at PORT '+PORT);
})
