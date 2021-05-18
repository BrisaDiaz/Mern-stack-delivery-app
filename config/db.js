const mongoose = require('mongoose')

const connectDB = async () => {
  try {
let conn;

    if(process.env.NODE_ENV === 'production'){

     conn = await mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
    });
      
    }else{

     conn = await mongoose.connect(process.env.MONGODB_DEVELOPMENT_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,

    });

    }


    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;