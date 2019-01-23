const express =require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose =require ('mongoose');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const userRoutes= require("./routes/user");
try {
    mongoose.connect('mongodb://localhost/db2', {useNewUrlParser: true}, ()=>{
    
    console.log('Database Connected');
    });
} catch(err) {
    console.log('MongoDB Connection Failed');
}
mongoose.set('useCreateIndex', true)

app.use("/user",userRoutes);
app.use((req,res,next)=> {
    const error = new error("not found");
    error.status = 404;
    next(error);
    
});
app.use((error,req,res,next) => {
    res.status(error.status||500);
    res.json({
        error:{
            message:error
        }
    });
});
module.exports = app;
