const ensureAuthenticated = require('../Middlewares/Auth');

const router=require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:"10,000",
        },
        {
            name:"TV",
            price:"20,000",
        }
    ])
})
module.exports=router;