const authJwt = require("./verify-jwt-token");
const JWT_SECRET_FOR_ADMIN = process.env.JWT_SECRET_FOR_ADMIN;
const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller.js");
const upload = require("../commons/image-upload");

//이미지 업로드
router.post(
  "/upload",
  [authJwt.verifyToken(JWT_SECRET_FOR_ADMIN), upload.single("file")],
  imageController.uploadImage
);

//이미지 추가
router.post("/", [authJwt.verifyToken(JWT_SECRET_FOR_ADMIN)], imageController.addImage);

//이미지 리스트
router.get("/", [authJwt.verifyToken(JWT_SECRET_FOR_ADMIN)], imageController.getImages);

//이미지 삭제
router.delete("/:id", [authJwt.verifyToken(JWT_SECRET_FOR_ADMIN)], imageController.deleteImage);

module.exports = router;
