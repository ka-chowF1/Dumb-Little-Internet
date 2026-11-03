const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const context=vm.createContext({});
vm.runInContext(readFileSync('dist/excuses.js','utf8')+readFileSync('dist/generator.js','utf8')+'\nthis.data=excuses;',context);
const {data,pickExcuse}=context;
test('four categories each contain 15 unique excuses',()=>{
 assert.equal(Object.keys(data).length,4);
 for(const list of Object.values(data)){assert.equal(list.length,15);assert.equal(new Set(list).size,15);assert(list.every(x=>typeof x==='string'&&x.trim()));}
});
test('all results stay in their category and never immediately repeat',()=>{
 for(const list of Object.values(data)){
  let previous;const seen=new Set();
  for(let i=0;i<100;i++){const next=pickExcuse(list,previous,()=>((i*37)%100)/100);assert(list.includes(next));assert.notEqual(next,previous);seen.add(next);previous=next;}
  assert(seen.size>1);
 }
});
test('single, duplicated, and empty lists terminate safely',()=>{
 assert.equal(pickExcuse(['Only one'],'Only one'),'Only one');
 assert.equal(pickExcuse(['Same','Same'],'Same'),'Same');
 assert.equal(pickExcuse([]),null);
});
function app(){
 class Element{constructor(){this.children=[];this.value='';this.disabled=true;this.classList={add(){},remove(){}};this.events={};}append(x){this.children.push(x);}replaceChildren(x){this.children=[x];}addEventListener(name,fn){this.events[name]=fn;}}
 const elements=Object.fromEntries(['category','generate','result','result-category','excuse-form'].map(id=>[id,new Element()]));
 const c=vm.createContext({document:{querySelector:selector=>elements[selector.slice(1)],createElement:()=>new Element()}});
 vm.runInContext(readFileSync('dist/excuses.js','utf8')+readFileSync('dist/generator.js','utf8')+readFileSync('dist/script.js','utf8'),c);
 return elements;
}
test('selection enables button but does not generate until submitted',()=>{
 const el=app();assert.equal(el.category.children.length,4);assert.equal(el.generate.disabled,true);
 el.category.value='Being Late';el.category.events.change();assert.equal(el.generate.disabled,false);assert.equal(el.result.children.length,0);
 el['excuse-form'].events.submit({preventDefault(){}});const first=el.result.children[0].textContent;assert(data['Being Late'].includes(first));
 el.category.value='Did Something Wrong';el.category.events.change();assert.equal(el.result.children[0].textContent,first);assert.equal(el['result-category'].textContent,'BEING LATE');
 el['excuse-form'].events.submit({preventDefault(){}});assert(data['Did Something Wrong'].includes(el.result.children[0].textContent));
 el.category.value='Being Late';el.category.events.change();el['excuse-form'].events.submit({preventDefault(){}});assert.notEqual(el.result.children[0].textContent,first);
});
test('empty selection cannot generate a result',()=>{const el=app();el['excuse-form'].events.submit({preventDefault(){}});assert.equal(el.result.children.length,0);});
