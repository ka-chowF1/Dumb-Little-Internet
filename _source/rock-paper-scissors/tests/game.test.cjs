const {test}=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
function game(){
 class El{constructor(move){this.dataset={move};this.events={};this.attrs={};this.className='hand fist';this.textContent='';this.disabled=false;this.classList={add(){},remove(){}};}addEventListener(k,f){this.events[k]=f;}setAttribute(k,v){this.attrs[k]=v;}click(){this.events.click();}}
 const buttons=['rock','paper','scissors'].map(x=>new El(x));const els=Object.fromEntries(['#player-hand','#opponent-hand','#play','#result','#countdown','.stage','#move-label'].map(x=>[x,new El()]));const timers=[];
 vm.runInNewContext(fs.readFileSync('dist/game.js','utf8'),{document:{querySelectorAll:()=>buttons,querySelector:k=>els[k]},setTimeout:(f,ms)=>timers.push({f,ms})});
 return {buttons,els,timers};
}
test('each move updates immediately, then always gets the delayed finger gun and punchline',()=>{
 for(const [i,shape] of ['fist','paper','scissors'].entries()){
 const {buttons,els,timers}=game();buttons[i].click();assert.equal(els['#player-hand'].className,'hand '+shape);assert.equal(els['#opponent-hand'].className,'hand fist');
 els['#play'].click();assert.equal(els['#countdown'].textContent,'3');assert.equal(timers.length,4);assert(buttons.every(b=>b.disabled));
 buttons[(i+1)%3].click();assert.equal(els['#player-hand'].className,'hand '+shape);els['#play'].click();assert.equal(timers.length,4);
 timers.filter(t=>t.ms<1500).forEach(t=>t.f());assert.equal(els['#opponent-hand'].className,'hand fist');
 timers.find(t=>t.ms===1500).f();assert.equal(els['#opponent-hand'].className,'hand finger-gun');assert.notEqual(els['#result'].textContent,'Skill issue');
 timers.find(t=>t.ms===1900).f();assert.equal(els['#result'].textContent,'You lose!  Skill issue.');assert.equal(els['#play'].disabled,false);
 els['#play'].click();assert.equal(els['#opponent-hand'].className,'hand fist');assert.equal(els['#result'].className,'');assert(buttons.every(b=>!b.disabled));
 buttons[(i+1)%3].click();els['#play'].click();assert.equal(timers.length,8);
 }
});
test('move selection exposes a single pressed state',()=>{const {buttons}=game();buttons[1].click();assert.deepEqual(buttons.map(b=>b.attrs['aria-pressed']),['false','true','false']);});
