const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck } = require("../middlewares/auth");

// route controllers
const {
  create,
  read,
  update,
  remove,
  listAll,
  list,
} = require("../controllers/match");
const { validateMatch } = require("../middlewares/joi");

// routes
router.post("/:u_id/match", authCheck, validateMatch, create);
router.get("/:u_id/match/:id", read);
router.get("/:u_id/matches/:count", listAll);
// router.get("/matchs/total", matchsCount);

// router.get("/matchs/:count", listAll);
// router.put("/match/:slug", authCheck, update);
// router.delete("/match/:slug", authCheck, remove);

// router.post("/matchs", list);

// // ratings
// router.put("/match/star/:matchId", authCheck, matchStar);

// // related
// router.get("/match/related/:matchId", listRelated);

// search
// router.post("/search/filters", searchFilters);

module.exports = router;
