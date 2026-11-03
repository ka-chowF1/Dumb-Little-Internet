(() => {
  const {Quiz, questions, shuffle}=IQTest;
  const quiz=new Quiz();
  const el=id=>document.getElementById(id);
  const answers=el('answers');
  let timer;
  function progress(completed){
    el('progress').setAttribute('aria-valuenow',completed);
    el('progress-fill').style.width=`${completed/questions.length*100}%`;
  }
  function render(focus=false){
    el('question-screen').hidden=false;
    el('result').hidden=true;
    el('counter').textContent=`QUESTION ${String(quiz.index+1).padStart(2,'0')} / ${questions.length}`;
    el('category').textContent=quiz.current.category;
    el('question').textContent=quiz.current.question;
    el('feedback').textContent='';
    answers.replaceChildren();
    shuffle([quiz.current.correct,...quiz.current.wrongAnswers]).forEach((value,index)=>{
      const button=document.createElement('button');
      button.className='answer';
      const letter=document.createElement('span');
      letter.className='letter';letter.textContent=String.fromCharCode(65+index);letter.setAttribute('aria-hidden','true');
      const text=document.createElement('span');text.textContent=value;
      button.append(letter,text);
      button.addEventListener('click',()=>select(value,button));
      answers.append(button);
    });
    progress(quiz.index);
    if(focus)el('question').focus({preventScroll:true});
  }
  function select(value,button){
    const correct=quiz.answer(value);
    if(correct===null)return;
    for(const answer of answers.children)answer.disabled=true;
    button.classList.add('selected',correct?'correct':'wrong');
    el('feedback').textContent=correct?'✅ Correct. Look at you go.':'❌ Not quite. Moving on.';
    progress(quiz.index+1);
    timer=setTimeout(()=>{
      quiz.advance();
      if(quiz.finished){
        el('question-screen').hidden=true;
        el('result').hidden=false;
        el('counter').textContent='TEST COMPLETE';
        el('result-title').querySelector('strong').textContent=quiz.score;
        el('result-title').focus({preventScroll:true});
      }else render(true);
    },950);
  }
  el('retake').addEventListener('click',()=>{clearTimeout(timer);quiz.reset();render(true);});
  render();
})();
