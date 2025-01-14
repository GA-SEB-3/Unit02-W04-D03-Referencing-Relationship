const router = require("express").Router()

const Listing = require("../models/listing")

router.get("/omar",(req,res)=>{
    res.send("Hello from listing routes")
})

router.get("/",async(req,res)=>{
    try{
        const listings = await Listing.find().populate("owner")

        console.log(listings)
    
        res.render("listing/index.ejs",{listings:listings})
    }
    catch(error){console.log(error)}
})

router.get("/new",(req,res)=>{
    res.render("listing/new.ejs")
})

router.post("/",async(req,res)=>{
    req.body.owner = req.session.user._id
    console.log(req.body)

    const createdListing = await Listing.create(req.body)
    res.redirect("/listings")
})

router.get("/:listingId",async(req,res)=>{
    const foundListing = await Listing.findById(req.params.listingId).populate("owner")

    const userhasFavorited = foundListing.favoritedByUser.some((user)=>{
       user.equals(req.session.user._id) 
    })
    console.log(foundListing)
    res.render("listing/show.ejs",{listing:foundListing,
        userhasFavorited:userhasFavorited
    })
})

router.post("/:listingId/favorited-by/:userId",async(req,res)=>{
    const updatedListing = await Listing.findByIdAndUpdate(req.params.listingId,{$push:{favoritedByUser:req.params.userId}})

    res.redirect(`/listings/${req.params.listingId}`)

})

module.exports = router