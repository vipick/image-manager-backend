const authJwt = require("./verify-jwt-token");
const JWT_SECRET_FOR_ADMIN = process.env.JWT_SECRET_FOR_ADMIN;
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller.js");
const { body } = require("express-validator");

/**
 * [어드민]
 */

//회원가입
router.post(
  "/signup",
  [
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty().isLength({ min: 4, max: 100 }),
    body("type").not().isEmpty().isIn(["ADMIN"]),
  ],
  adminController.signup
);

//로그인
router.post(
  "/signin",
  [
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty().isLength({ min: 4, max: 100 }),
  ],
  adminController.signin
);

//프로필 가져오기
router.get("/profile", [authJwt.verifyToken(JWT_SECRET_FOR_ADMIN)], adminController.getProfile);

module.exports = router;
