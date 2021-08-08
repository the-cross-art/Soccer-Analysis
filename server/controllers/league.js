const League = require("../models/league");
const Team = require("../models/team");

exports.create = async (req, res) => {
    const { values, user } = req.body;
    const { league_name, image } = values;
    try {
        const newLeague = await new League({ league_name, user, image }).save();
        res.json(newLeague);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.list = async (req, res) => {
    const { u_id } = req.params;
    try {
        const leagues = await League.find({ user: u_id }).sort({ createdAt: -1 }).exec();
        if (leagues) {
            res.json(leagues);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("No leagues found");
    }
};

exports.getCount = async (req, res) => {
    const { u_id } = req.params;
    try {
        const leagues = await League.find({ user: u_id }).sort({ createdAt: -1 }).exec();
        if (leagues.length) {
            res.json(leagues.length);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("No leagues found");
    }
};

exports.listPerPage = async (req, res) => {
    const { u_id } = req.params;
    // sort: createdAt/updatedAt, order: desc/asc, limit: 3..
    const { sort, order, page, perPage } = req.body;
    const currentPage = page || 1;
  
    try {
      const leagues = await League.find({user:u_id})
        .skip((currentPage - 1) * perPage)
        .sort([[sort, order]])
        .limit(perPage)
        .exec();
  
      res.json(leagues);
    } catch (error) {
      console.log(error);
      res.status(404).send("No leagues found");
    }
  };

exports.read = async (req, res) => {
    const { id } = req.params;
    const league = await League.findById(id).exec();
    if (league) {
        res.json(league);
    } else {
        res.status(404).send("League not found");
    }
};

exports.update = async (req, res) => {
    console.log()
    const { id } = req.params;
    try {
        const updatedLeague = await League.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).exec();
        if (updatedLeague)
            res.json(updatedLeague);
        else
            res.status(400).send("League not found");
    } catch (error) {
        console.log(error);
        res.status(400).send("League update failed");
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    const foundTeams = await Team.find({ league: id }).exec();
    if (foundTeams && foundTeams.length > 0)
        res.status(400).send("Cannot delete because active teams are available in this league");
    else {
        const removedLeague = await League.findByIdAndDelete(id).exec();
        if (removedLeague)
            res.json(removedLeague)
        else
            res.status(400).send("Could not find the league, delete failed");
    }
};

exports.listTeams = async (req, res) => {
    try {
        const { id } = req.params;
        const teams = await Team.find({ league: id }).exec();
        if (teams)
            res.json(teams);
        else
            res.status(400).send("No teams found in this leage");
    } catch (error) {
        res.status(400).send("Error finding teams");
    }
};
