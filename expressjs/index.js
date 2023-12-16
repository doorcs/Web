const express = require('express'); // npm 객체를 가져와서 초기화
const app = express(); // express 객체를 변수 "app"에 저장
const port = 3000; // 서버의 포트 번호

const dbconfig = {host: "localhost", port: 3306, user: "root", password: "", database: ""}

app.use(express.static('public')); // public 폴더를 static 폴더로 지정
// 스태틱 파일들의 경우, 서버에서 처리하지 않고 바로 클라이언트에게 전달. 노드를 재실행하지 않아도 변경사항이 반영됨.

app.get('/', (req, res) => res.send('Hello World!')); // req: 클라이언트에서 받아오는 정보, res: 서버에서 보내는 응답
// res.send() : 문자열을 보낼 때 사용

app.get('/path1', (req, res) => res.send("GET path1"));
app.get('/path2', (req, res) => res.send("GET path2"));
app.put('/path1', (req, res) => res.send("PUT path1"));

app.get('/select', function(req, res) {
    const maria = require('mysql');
    const conn = maria.createConnection(dbconfig);  // db설정 빼놓고 불러와서 쓰자.
    conn.connect();
    conn.query("SELECT * FROM students", function(err, rows, fields) {
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// 실질적으로 서버를 여는 코드. callback 함수를 사용해야 하는데, 여기선 받거나 반환하는 정보가 없기 때문에 빈 함수 사용
// ${변수명} 형태로 쓰면 변수를 문자열에 포함시킬 수 있음.
// '가 아니라 `를 사용해야 함!!
