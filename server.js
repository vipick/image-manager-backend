const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./app/routes/route");
const adminRouter = require("./app/routes/admin.route");
const imageRouter = require("./app/routes/image.route");

/**
 * Sequelize 설정
 */
const { sequelize } = require("./app/models");
sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("Mysql 연결 성공");
  })
  .catch(async (err) => {
    throw new Error("Mysql 연결 에러!" + err);
  });

/**
 * Express 설정
 */
const app = express();
app.set("port", process.env.PORT || 3000); //포트 설정
app.use(express.json()); //Body parser : POST, PUT, PATCH 요청을 req.body에 넣어준다.
app.use(express.urlencoded({ extended: false })); //Body parser : Form 요청을 req.body에 넣어준다.

if (process.env.NODE_ENV === "prod") {
  app.use(morgan("combined")); //로그 설정
  app.use(cors("*")); //CORS 설정
} else {
  app.use(morgan("dev"));
  app.use(cors("*"));
}

/**
 * Route 설정
 */
app.use("/", router);
app.use("/admins", adminRouter);
app.use("/images", imageRouter);

/**
 * 에러 처리 설정
 */
//404 NotFound 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

//500 서버 에러 처리
app.use((err, req, res, next) => {
  return res.status(500).send({
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "서버 에러 : " + err,
  });
});

app.listen(app.get("port"), "0.0.0.0", () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
