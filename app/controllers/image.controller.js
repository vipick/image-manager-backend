const { Image } = require("../models");

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
