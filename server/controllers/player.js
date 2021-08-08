const League = require("../models/league");
const Player = require("../models/player");
const Team = require("../models/team");

exports.create = async (req, res) => {
    const { values, teamId } = req.body;
    try {
        const newPlayer = await new Player(values).save();
        const foundTeam = await Team.findById(teamId)
        foundTeam.players.push(newPlayer)
        await foundTeam.save()
        res.json(newPlayer);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.list = async (req, res) => {
    const { u_id } = req.params;
    try {
        const playersFound = await Player.find({ user: u_id }).sort({ createdAt: -1 }).exec();
        if (playersFound) {
            res.json(playersFound);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("No players found");
    }
};

exports.read = async (req, res) => {
    const { id } = req.params;
    const foundPlayer = await Player.findById(id).exec();
    if (foundPlayer) {
        res.json(foundPlayer);
    } else {
        res.status(404).send("Player not found");
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).exec();
        if (updatedPlayer)
            res.json(updatedPlayer);
        else
            res.status(400).send("Player not found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Player update failed");
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    const deletedPlayer = await Player.findByIdAndDelete(id).exec();
    if (deletedPlayer)
        res.json(deletedPlayer)
    else
        res.status(400).send("Could not find the player, delete failed");
};

exports.addTeams = async (req, res) => {
    const { id } = req.params;
    const { values, teamId } = req.body;
    try {
        const foundPlayer = await Player.findById(id).exec();
        const foundTeam = await Team.findById(teamId)

        if (foundPlayer) {
            if (foundTeam.players.indexOf(foundPlayer._id) == -1) {
                foundPlayer.leagues_teams.push(values);
                await foundPlayer.save();
                foundTeam.players.push(foundPlayer)
                await foundTeam.save()
                res.json(foundPlayer);
            }
            else {
                res.status(400).send("Already added");
            }
        }
        else
            res.status(400).send("Player not found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Team update failed");
    }
};
