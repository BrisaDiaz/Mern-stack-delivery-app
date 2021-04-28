const express= require('express');
const app = express();
port = process.env.PORT || 7000;
const cors = require('cors');
 require('dotenv').config({path: '.env'});
const connectDB = require( './db.js');
const path = require('path');
const morgan = require('morgan');
const { createRoles,createAdmin} = require('./libs/initialSetUp');

connectDB()
createRoles()
createAdmin()



app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
// app.use(express.static(path.join(__dirname, 'public','react-app','build')));
const productsRouter = require('./routes/products.js');
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');

app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/api/auth',authRouter)
app.use('/api/products',productsRouter)
app.use('/api/users',usersRouter)





app.listen(port, () => {
  console.log(`server is listening from port ${port}`)
})
