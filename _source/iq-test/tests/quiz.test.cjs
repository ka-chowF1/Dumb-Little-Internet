const {test}=require('node:test');
const assert=require('node:assert/strict');
const {questions,shuffle,Quiz}=require('../dist/quiz.js');
test('ten questions each have four distinct choices',()=>{
  assert.equal(questions.length,10);
  for(const q of questions)assert.equal(new Set([q.correct,...q.wrongAnswers]).size,4);
});
test('shuffle preserves choices without mutating data and can move the correct answer',()=>{
  const input=['correct','wrong1','wrong2','wrong3'];
  const result=shuffle(input,()=>0);
  assert.deepEqual(input,['correct','wrong1','wrong2','wrong3']);
  assert.deepEqual([...result].sort(),[...input].sort());
  assert.notEqual(result[0],'correct');
});
for(const mode of ['correct','incorrect','mixed'])test(`${mode} answers all end at 69 and retake clears state`,()=>{
  const quiz=new Quiz();assert.equal(quiz.score,null);
  assert.equal(quiz.advance(),false);
  for(let i=0;i<10;i++){
    const correct=mode==='correct'||(mode==='mixed'&&i%2===0);
    assert.equal(quiz.index,i);
    assert.equal(quiz.answer('not an option'),null);
    assert.equal(quiz.answer(correct?quiz.current.correct:quiz.current.wrongAnswers[0]),correct);
    assert.equal(quiz.answer(quiz.current.correct),null);
    assert.equal(quiz.index,i);
    assert.equal(quiz.advance(),true);
  }
  assert.equal(quiz.finished,true);assert.equal(quiz.score,69);
  assert.equal(quiz.answer('13'),null);assert.equal(quiz.advance(),false);
  quiz.reset();assert.equal(quiz.index,0);assert.equal(quiz.finished,false);assert.equal(quiz.locked,false);assert.equal(quiz.score,null);
  assert.equal(quiz.answer('13'),true);
});
