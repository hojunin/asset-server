const express = require("express");
const app = express();
app.use(express.static("images"));
app.get("/test", (req, res) => {
  res.send("GET 요청이 수신되었습니다.");
});

function generateLargeData(size) {
  const dataArray = [];
  for (let i = 0; i < size; i++) {
    dataArray.push({
      id: i,
      name: "Sample Name " + i,
      description:
        "This is a sample description to add some bulk to the object and increase its size slightly. Item number: " +
        i,
      randomString: Math.random().toString(36).substring(2, 15),
      value: Math.floor(Math.random() * 1000),
    });
  }
  return dataArray;
}

app.get("/api/data", (req, res) => {
  try {
    const size = req.query.size || 100000;
    const data = {
      message: "성공적으로 데이터를 가져왔습니다",
      timestamp: new Date().toISOString(),
      data: generateLargeData(Number(size)),
    };

    // CORS 헤더 설정
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // 200 상태 코드와 함께 응답 반환
    res.status(200).json(data);
  } catch (error) {
    // CORS 헤더 설정
    res.header("Access-Control-Allow-Origin", "*");

    // 에러 발생 시 500 상태 코드와 함께 에러 메시지 반환
    res.status(500).json({ error: "서버 에러가 발생했습니다" });
  }
});

app.listen(4000);
