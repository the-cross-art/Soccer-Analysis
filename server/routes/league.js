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
    getCount,
    listPerPage,
    listTeams,
} = require("../controllers/league");

// routes
router.post("/league/new", authCheck, create);
router.get("/:u_id/leagues", list);
router.get("/:u_id/leagues/count", getCount);
router.post("/:u_id/leagues", listPerPage);
router.get("/league/:id", read);
router.put("/league/:id", authCheck, update);
router.delete("/league/:id", authCheck, remove);
router.get("/league/:id/teams", authCheck, listTeams);

module.exports = router;
