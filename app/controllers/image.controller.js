const { Image } = require("../models");
const uuid = require("uuid");

/**
 * 이미지 업로드
 */
exports.uploadImage = async (req, res, next) => {
  const name = req.file.originalname;
  const imageURL = req.file.location;
  const fileSize = String(req.file.size);

  try {
    return res.status(201).send({
      statusCode: 201,
      message: "이미지 업로드 성공",
      data: { imageURL: imageURL, name: name, fileSize: fileSize },
    });
  } catch (err) {
    next(`${req.method} ${req.url} : ` + err);
  }
};

/**
 * 이미지 추가
 */
exports.addImage = async (req, res, next) => {
  const name = req.body.name;
  const imageURL = req.body.imageURL;
  const fileSize = req.body.fileSize;

  try {
    await Image.create({
      name: name,
      imageURL: imageURL,
      fileSize: fileSize,
    });

    return res.status(201).send({
      statusCode: 201,
      message: "이미지 추가 성공",
    });
  } catch (err) {
    next(`${req.method} ${req.url} : ` + err);
  }
};

/**
 * 이미지 리스트
 */
exports.getImages = async (req, res, next) => {
  try {
    const images = await Image.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).send({
      statusCode: 200,
      message: "이미지 리스트 가져오기 성공",
      data: { images: images },
    });
  } catch (err) {
    next(`${req.method} ${req.url} : ` + err);
  }
};

/**
 * 이미지 삭제
 */
exports.deleteImage = async (req, res, next) => {
  try {
    const imageId = req.params.id;

    await Image.destroy({
      where: { id: imageId },
    });

    return res.status(200).send({
      statusCode: 200,
      message: "이미지 삭제 성공",
    });
  } catch (err) {
    next(`${req.method} ${req.url} : ` + err);
  }
};
