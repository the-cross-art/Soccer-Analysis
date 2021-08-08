const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
    create,
    read,
    update,
    remove,
    list,
    addTeams
} = require("../controllers/player");

// routes
router.post("/player/new", authCheck, create);
router.get("/:u_id/players", list);
router.get("/player/:id", read);
router.put("/player/:id", authCheck, update);
router.delete("/player/:id", authCheck, remove);
router.put("/player/:id/team", authCheck, addTeams);

module.exports = router;