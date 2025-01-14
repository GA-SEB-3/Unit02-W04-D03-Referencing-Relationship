const router = require("express").Router()

const Listing = require("../models/listing")

router.get("/omar",(req,res)=>{
    res.send("Hello from listing routes")
})

module.exports = router