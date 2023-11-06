import { useState } from 'react';
import './App.css';

function App() {
  const [제목, 제목변경] = useState([]);
  const [제목입력, 제목입력변경] = useState('');
  const [내용, 내용변경] = useState([]);
  const [내용입력, 내용입력변경] = useState('');
  const [하는중, 하는중변경] = useState([]);
  const [끝남, 끝남변경] = useState([]);



  function 추가() {
    let 복사1 = [...제목];
    복사1.push(제목입력);
    let 복사2 = [...내용];
    복사2.push(내용입력);
    제목변경(복사1)
    내용변경(복사2)
    let 복사3 = [...하는중]
    복사3.push({ 제목: 제목입력, 내용: 내용입력 })
    하는중변경(복사3);
 
  }
  function 삭제(i,a,b) {
    let 복사1 = [...a];
    b(복사1);
    복사1.splice(i, 1);
  }
  function 완료(i,a,b,c,d) {
    let 복사1 = [...a];
    let 완료이동 = 복사1[i]
    let 복사2 = [...b,완료이동];
    복사1.splice(i, 1);
    c(복사1);
    d(복사2);
    console.log("끝남로그",끝남);
  }

function 입력값변경(e,변경){변경(e.target.value) }


  return (
    <div className="layout">
      <div className="header"> <h4>나의 Todo 리스트!!</h4></div>
      <form className="addForm">
        <div className="input-group">
          <label>제목</label>
          <input onChange={(e) => {입력값변경(e,제목입력변경)}}
          type="text" value={제목입력}></input>
          <label>내용</label>
          <input onChange={(e) => {입력값변경(e,내용입력변경)}} 
        type="text"value={내용입력} ></input>
        </div>
        <button type='submit' onClick={(e)=>{
          e.preventDefault();
          if(제목입력&&내용입력){
          추가();
          제목입력변경("");
          내용입력변경("");
        }
        else{alert("빈값 입력 금지!")}
          }}  className='addBtn'
        >추가할래</button>
      </form>
      <div className="list">
        <div className="list-title"> <h4>하는중임...🔥</h4></div>
        <div className="list-wrap">
          {
            하는중.map(function (a, i) {
              return (<div className="list-Todo">
                <h4>{a.제목}</h4>
                <p>{a.내용}</p>
                <div className="button-box">
                  <button className='red'
                    onClick={function () {삭제(i,하는중,하는중변경)}}>삭제</button>
                  <button className='grn'
                    onClick={function () {완료(i,하는중,끝남,하는중변경,끝남변경)}}>완료</button>
                </div>
              </div>)
            })
          }

        </div>
        <div className="list-title"> <h4>끝남 🎉</h4>
          <div className="list-wrap">
            {
              끝남.map(function (a, i) {
                return (<div className="list-Todo">
                  <h4>{a.제목}</h4>
                  <p>{a.내용}</p>
                  <div className="button-box">
                    <button className='red' onClick={function () {삭제(i,끝남,끝남변경)}}>
                      삭제</button>
                    <button className='grn'
                      onClick={function () { 완료(i,끝남,하는중,끝남변경,하는중변경) }}>취소</button>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
