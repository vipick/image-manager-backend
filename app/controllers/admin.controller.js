const { Admin } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

/**
 * 회원가입
 */
exports.signup = async (req, res, next) => {
  //회원 가입 유효성 검사
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const result = errors.array();
    return res.status(400).send({
      statusCode: 400,
      code: "BAD_REQUEST_INPUT",
      message: result,
    });
  }

  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 8); //패스워드 암호화
  const type = req.body.type;

  try {
    //회원 가입 예외처리
    const adminData = await Admin.findOne({
      where: {
        email,
      },
    });

    if (adminData) {
      return res.status(409).send({
        statusCode: 409,
        code: "CONFLICT_EMAIL",
        message: "이미 사용중인 이메일 입니다.",
      });
    }

    //회원 및 멤버 생성
    const createdAdmin = await Admin.create({
      email,
      password,
      type,
    });

    //JWT 토큰 생성
    const accessToken = jwt.sign(
      {
        id: createdAdmin.id,
      },
      process.env.JWT_SECRET_FOR_ADMIN,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).send({
      statusCode: 201,
      message: "어드민 회원가입 성공",
      data: { accessToken: accessToken },
    });
  } catch (err) {
    next(`${req.method} ${req.url} : ` + err);
  }
};

/**
 * 로그인
 */
exports.signin = async (req, res, next) => {
  //로그인 유효성 검사
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const result = errors.array();
    return res.status(400).send({
      statusCode: 400,
      code: "BAD_REQUEST_INPUT",
      message: result,
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    //로그인 예외처리
    const adminData = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!adminData) {
      return res.status(401).send({
        statusCode: 401,
        code: "UNAUTHORIZED_ACCOUNT",
        message: "잘못된 아이디 또는 패스워드 입니다",
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, adminData.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        statusCode: 401,
        code: "UNAUTHORIZED_ACCOUNT",
        message: "잘못된 아이디 또는 패스워드 입니다",
      });
    }

    //JWT 토큰 생성
    const accessToken = jwt.sign(
      {
        id: adminData.id,
      },
      process.env.JWT_SECRET_FOR_ADMIN,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).send({
      statusCode: 200,
      message: "어드민 로그인 성공",
      data: { accessToken: accessToken },
    });
  } catch (err) {
    next(`${req.method} ${req.url} : ` + err);
  }
};

/**
 * 프로필 가져오기
 */
exports.getProfile = async (req, res, next) => {
  const userId = req.userId;

  try {
    //프로필 데이터 가져오기
    const adminData = await Admin.findOne({
      attributes: ["email", "type"],
      where: {
        id: userId,
      },
    });

    return res.status(200).send({
      statusCode: 200,
      message: "어드민 프로필 가져오기 성공",
      data: { profile: adminData },
    });
  } catch (err) {
    next(`${req.method} ${req.url} : ` + err);
  }
};
