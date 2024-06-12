const PlayerModel = require("../models/playerModel");

// addplayer
module.exports.addPlayer = async (req, res, next) => {
  try {
    let { name, age, team, role, imageUrl } = req.body;
    const nameCheck = await PlayerModel.findOne({ name });
    if (nameCheck) {
      return res.json({ msg: "Player already exists", status: false });
    }
    let defaultImageUrl =
      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    if (!imageUrl) {
      imageUrl = defaultImageUrl;
    }
    const newPlayer = await PlayerModel.create({
      name,
      age,
      team,
      role,
      imageUrl,
    });

    return res.json({ msg: "Player added Successfully", status: true });
  } catch (ex) {
    next(ex);
  }
};

// getallplayers
module.exports.getAllPlayers = async (req, res, next) => {
  try {
    const playersList = await PlayerModel.find();
    return res.json({ playersList, status: true });
  } catch (ex) {
    next(ex);
  }
};

// edit player
module.exports.editPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, team, role, imageUrl } = req.body;

    const updatedPlayer = await PlayerModel.findByIdAndUpdate(
      id,
      { name, age, team, role, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedPlayer) {
      return res.json({ msg: "User not found" });
    }
    return res.json({ msg: "User Details edited successfully", status: true });
  } catch (ex) {
    next(ex);
  }
};

// delete player
module.exports.deletePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await PlayerModel.findByIdAndDelete(id);

    if (!player) {
      return res.json({ msg: "Player not found", status: false });
    }
    return res.json({ msg: "Player deleted successfully", status: true });
  } catch (ex) {
    next(ex);
  }
};
