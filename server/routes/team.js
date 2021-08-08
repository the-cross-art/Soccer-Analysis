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
    getCount,
    listPerPage,
    list,
    listTeamplayers
} = require("../controllers/team");

// routes
router.post("/team/new", authCheck, create);
router.get("/:l_id/teams", list);
router.get("/:l_id/teams/count", getCount);
router.post("/:l_id/teams", listPerPage);
router.get("/team/:id", read);
router.put("/team/:id", authCheck, update);
router.delete("/team/:id", authCheck, remove);
router.get("/team/:t_id/players", listTeamplayers);

module.exports = router;