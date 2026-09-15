const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
class Element {
 constructor(tag){this.tag=tag;this.children=[];this.attributes={};}
 append(...items){this.children.push(...items);}
 replaceChildren(){this.children=[];}
 setAttribute(name,value){this.attributes[name]=value;}
}
function render(items){
 const container=new Element('div'), count=new Element('span');
 const context=vm.createContext({URL,document:{createElement:tag=>new Element(tag),querySelector:id=>id==='#projects'?container:count}});
 vm.runInContext(fs.readFileSync('dist/projects.js','utf8')+fs.readFileSync('dist/script.js','utf8'),context);
 if(items)context.renderProjects(items,container,count);
 return {container,count};
}
test('first project opens the real calculator in a safe new tab',()=>{
 const {container,count}=render();const card=container.children[0];
 assert.equal(count.textContent,'02');assert.equal(card.href,'https://ka-chowf1.github.io/67-calculator/');
 assert.equal(card.target,'_blank');assert.equal(card.rel,'noopener noreferrer');assert.equal(card.children[1].textContent,'67 Calculator');
});
test('ten entries require no layout code changes, and absent taglines work',()=>{
 const {container,count}=render(Array.from({length:10},(_,i)=>({name:`Project ${i}`,emoji:'🌐',url:`https://example.com/${i}`,tagline:i%2?'':''})));
 assert.equal(container.children.length,10);assert.equal(count.textContent,'10');
 assert(container.children.every(c=>c.children.length===3));
});
test('empty list has an intentional empty state',()=>{const {container,count}=render([]);assert.equal(count.textContent,'00');assert.equal(container.children[0].className,'empty');});
test('invalid links are skipped and text is not rendered as markup',()=>{
 const {container,count}=render([{name:'unsafe',url:'javascript:alert(1)'},{name:'<b>site</b>',url:'https://example.com',tagline:'<img>'}]);
 assert.equal(count.textContent,'01');assert.equal(container.children[0].children[1].textContent,'<b>site</b>');
});

test('excuse generator card points to the verified live site',()=>{
 const {container}=render(); const card=container.children[1];
 assert.equal(card.children[1].textContent,'Excuse Generator');
 assert.equal(card.href,'https://ka-chowf1.github.io/Excuse-Generator/');
 assert.equal(card.target,'_blank'); assert.equal(card.rel,'noopener noreferrer');
});
