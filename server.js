const express= require('express');
const app = express();

const cors = require('cors');
 require('dotenv').config({path: '.env'});
const connectDB = require( './db.js');
const path = require('path');
const morgan = require('morgan');
const { createRoles,createAdmin} = require('./libs/initialSetUp');

connectDB()
createRoles()
createAdmin()



app.use(express.urlencoded({extended: false})); 
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


const port = process.env.PORT || 7000;
const productsRouter = require('./routes/products.js');
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');
const contactRouter = require('./routes/contact.js');

if ( process.env.NODE_ENV === 'production'){
  
  app.use(express.static(path.join(__dirname, 'frontend','build'))); 

  app.get( ' * ' , (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend','build','index.html'))
  } )

}else{
app.use(express.static(path.join(__dirname, 'frontend')));
}

app.use('/api/auth',authRouter)
app.use('/api/products',productsRouter)
app.use('/api/users',usersRouter)
app.use('/api/contact',contactRouter)





app.listen(port, () => {
  console.log(`server is listening from port ${port}`)
})
