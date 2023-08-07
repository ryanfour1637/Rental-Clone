const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

//this is where routes will be added.
router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.post("/test", (req, res) => {
   res.json({ requestBody: req.body });
});

module.exports = router;
