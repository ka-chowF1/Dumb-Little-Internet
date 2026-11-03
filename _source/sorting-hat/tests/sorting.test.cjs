const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {questions,houses,pickResult}=require('../dist/script.js');
test('magic override wins for every combination of remaining answers',()=>{
 for(let mask=0;mask<16;mask++) assert.equal(pickResult([false,...Array.from({length:4},(_,i)=>!!(mask&(1<<i)))],()=>{throw Error('must not draw a house');}).name,'Muggle detected!');
});
test('four equal random intervals and other answers do not affect houses',()=>{
 for(let i=0;i<400;i++) assert.equal(pickResult([true,false,true,false,true],()=>i/400).name,houses[Math.floor(i/100)].name);
 assert.equal(questions.length,5);
});
function app(){
 const elements={};
 const make=()=>({hidden:false,style:{setProperty(){}},dataset:{},textContent:'',disabled:false,focus(){},addEventListener(event,fn){this[event]=fn;}});
 const buttons=[make(),make()];buttons[0].dataset.answer='yes';buttons[1].dataset.answer='no';
 const classes=new Set();const timers=[];
 const document={getElementById(id){return elements[id]??=make();},querySelectorAll(){return buttons;},documentElement:make(),body:{classList:{add(...names){names.forEach(n=>classes.add(n));},remove(...names){names.forEach(n=>classes.delete(n));},toggle(n,on){on?classes.add(n):classes.delete(n);}}}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../dist/script.js'),'utf8'),{document,setTimeout(fn,ms){timers.push({fn,ms});return timers.length;},clearTimeout(){},Math});
 return {elements,buttons,classes,timers};
}
test('full flow guards repeated clicks, waits three seconds, and clears magic answer on retry',()=>{
 const a=app();
 for(let run=0;run<2;run++){
   for(let i=0;i<5;i++){
     assert.equal(a.elements.question.textContent,questions[i]);
     const button=a.buttons[run===0&&i===0?1:0];button.click();button.click();
     assert.equal(a.timers.length,1);
     const timer=a.timers.shift();
     if(i===4){assert.equal(timer.ms,3000);assert.equal(a.elements['thinking-screen'].hidden,false);assert.equal(a.elements['result-screen'].hidden,true);}
     timer.fn();
   }
   assert.equal(a.elements['result-screen'].hidden,false);
   if(run===0){assert.equal(a.elements.result.textContent,'Muggle detected!');assert.ok(a.classes.has('muggle'));}
   else assert.match(a.elements.result.textContent,/You are in (Gryffindor|Hufflepuff|Ravenclaw|Slytherin)!/);
   a.elements.retry.click();assert.equal(a.elements.question.textContent,questions[0]);assert.equal(a.classes.has('muggle'),false);assert.equal(a.elements['question-screen'].hidden,false);
 }
});
