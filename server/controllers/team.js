const League = require("../models/league");
const Team = require("../models/team");

exports.create = async (req, res) => {
    const { values } = req.body;
    try {
        const newTeam = await new Team(values).save();
        res.json(newTeam);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.list = async (req, res) => {
    const { l_id } = req.params;
    try {
        const teamsFound = await Team.find({ league: l_id }).sort({ createdAt: -1 }).exec();
        if (teamsFound) {
            res.json(teamsFound);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("No teams found");
    }
};

exports.getCount = async (req, res) => {
    const { l_id } = req.params;
    try {
        const teams = await Team.find({ league: l_id }).sort({ createdAt: -1 }).exec();
        if (teams.length) {
            res.json(teams.length);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("No teams found");
    }
};

exports.listPerPage = async (req, res) => {
    const { l_id } = req.params;
    // sort: createdAt/updatedAt, order: desc/asc
    const { sort, order, page, perPage } = req.body;
    const currentPage = page || 1;

    try {
        const teams = await Team.find({ league: l_id })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec();
        res.json(teams);
    } catch (error) {
        console.log(error);
        res.status(404).send("No teams found");
    }
};

exports.read = async (req, res) => {
    const { id } = req.params;
    const foundTeam = await Team.findById(id).exec();
    if (foundTeam) {
        res.json(foundTeam);
    } else {
        res.status(404).send("Team not found");
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTeam = await Team.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).exec();
        if (updatedTeam)
            res.json(updatedTeam);
        else
            res.status(400).send("Team not found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Team update failed");
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    const foundTeam = await Team.findByIdAndDelete(id).exec();
    if (foundTeam)
        res.json(foundTeam)
    else
        res.status(400).send("Could not find the team, delete failed");
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

exports.listTeamplayers = async (req, res) => {
    const { t_id } = req.params;
    try {
        const foundTeam = await Team.findById(t_id).populate('players').sort({ createdAt: -1 }).exec();
        if (foundTeam && foundTeam.players) {
            res.json(foundTeam.players)
        } else {
            res.status(404).send("No players found");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("No players found");
    }
};
