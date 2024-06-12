const {
  addPlayer,
  editPlayer,
  getAllPlayers,
  deletePlayer,
} = require("../controllers/playerController");
const router = require("express").Router();

const { verifyToken } = require("../middlewares/auth");

router.post("/addplayer", verifyToken, addPlayer);
router.put("/editplayer/:id", verifyToken, editPlayer);
router.get("/playerslist", verifyToken, getAllPlayers);
router.delete("/deleteplayer/:id", verifyToken, deletePlayer);

module.exports = router;
