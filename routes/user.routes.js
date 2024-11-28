const express = require("express");


const router = express.Router();

router.post("/", ()=>{
});
router.post('/verify-email', ()=>{});
router.post('/resend-verification', ()=>{});
router.get("/", ()=>{});
router.get("/:id", ()=>{});
router.delete("/:id", ()=>{});
router.put("/:id", ()=>{});
router.post("/login", ()=>{});



module.exports = router;