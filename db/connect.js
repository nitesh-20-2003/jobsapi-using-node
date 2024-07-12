const mongoose=require('mongoose');
const ConnectDb=(url)=>
    {
    return mongoose.connect(url,{
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}
module.exports=ConnectDb;