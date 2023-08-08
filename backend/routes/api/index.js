const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

//this is where routes will be added.
router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/spots", spotsRouter);

router.post("/test", (req, res) => {
   res.json({ requestBody: req.body });
});

module.exports = router;
