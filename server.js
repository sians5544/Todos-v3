// 패키지 가져오기
const express = require('express');

//express 프레임 워크는 함수 하나를 준다
// console.log(express);

const app = express();
const port = 9000;

let todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

//experess 가 제공하는 정적 파일 세팅
//root 디렉토리를 알려줘야한다 (정적파일들이 모아져있는 폴더가 public 이다 )
// 기본적으로 express 진영에서는  public 으로 적어줌

app.use(express.static('public'));
app.use(express.json());

//성공적으로 웹 서버가 시작하면 log 을 찍기위함이 두번째 인수의 역할

//root url 에 접근 했을 때 무엇을 할것인지 알려주는 함수
// (req, res) 호출자가 전달 express 가 호출
//get 방식으로 root 호출시 응답하는 메서드
//서버들은 정적 파일을 서브할 수 있는 기능을 가지고 있어야한다 (바뀌지 않은 회사 소개같은 놈들...)

app.get('/todos', (req, res) => {
  res.send(todos); // 사용자에게 보내겠다 이게 바디에 담긴다 , express 가 문자열로 자동 파싱해서 넘겨준다
});

app.post('/todos', (req, res) => {
  todos = [req.body, ...todos];
  res.send(todos);
});

// todos 배열의 모든 요소의 completed 를 payload 와 일치 시킨다
app.patch('/todos', (req, res) => {
  const { completed } = req.body;
  console.log(completed, typeof completed);

  todos = todos.map((todo) => ({ ...todo, completed }));

  // response 없으면 계속 대기함

  res.send(todos);
});

// PATCH http://localhost:9000/todos/4
// Content-Type:  application/json

// {
//   "completed":true
// }
// {
//   "content":"ABCD"
// }

app.patch('/todos/:id', (req, res) => {
  //id 는 문자열이다.
  const { id } = req.params;

  // payload => {content} or {completed}
  const payload = req.body;

  todos = todos.map((todo) => (todo.id === +id ? { ...todo, ...payload } : todo));

  // response 없으면 계속 대기함

  res.send(todos);
});

// DELETE http://localhost:9000/todos/4

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter((todo) => todo.id !== +id);
  res.send(todos);
});

//DELETE  http://localhost:9000/todos?completed=true
app.delete('/todos', (req, res) => {
  const { completed } = req.query; //{completed : true}

  todos = todos.filter((todo) => todo.completed !== JSON.parse(completed));
  res.send(todos);
});

// 요청이 언제 올지 몰라서 server 가 대기(듣고있다)하고 있다는 의미
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
