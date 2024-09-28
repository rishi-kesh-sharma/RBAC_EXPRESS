const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");
const { verifyToken } = require("../middlewares/authMIddleware.js");
const { authorizeRoles } = require("../middlewares/roleMiddleware.js");
// router.post("/user", createUser);

// user
router.get("/all", verifyToken, authorizeRoles("admin", "user"), getAllUsers);
router.get("/", authorizeRoles("admin", "user"), getUser);
router.put("/", authorizeRoles("admin", "user"), updateUser);
router.delete("/", authorizeRoles("admin", "user"), deleteUser);

//admin
router.get("/admin", verifyToken, authorizeRoles("admin"), getAllUsers);
//manager
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  getAllUsers
);

module.exports = router;
