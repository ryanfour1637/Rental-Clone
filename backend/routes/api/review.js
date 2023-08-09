const express = require("express");
const { Op } = require("sequelize");
const { Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
   reviewAvg,
   reviewAvgObj,
   validateNewSpot,
   addPreview,
} = require("./helpersApi");

const router = express.Router();

router.get('/current', async (req, res) => {
    
});

module.exports = router;
