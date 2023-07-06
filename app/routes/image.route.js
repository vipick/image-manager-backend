const authJwt = require("./verify-jwt-token");
const JWT_SECRET_FOR_ADMIN = process.env.JWT_SECRET_FOR_ADMIN;
const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller.js");

//이미지 추가
router.post("/", [authJwt.verifyToken(JWT_SECRET_FOR_ADMIN)], imageController.addImage);

//이미지 리스트
router.get("/", [authJwt.verifyToken(JWT_SECRET_FOR_ADMIN)], imageController.getImages);

module.exports = router;
