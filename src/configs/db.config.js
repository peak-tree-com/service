const mongoose = require('mongoose');
const DB ='mongodb+srv://Peak-Tree-com:PeakTree1234!@cluster0.rh6mn0a.mongodb.net/';

mongoose.connect(DB).then(()=>{
    console.log("Database Connected Successfully");
}).catch((error)=>{
    console.log(`Failed to Connect${error}`);
})
