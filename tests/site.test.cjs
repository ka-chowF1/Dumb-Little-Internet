const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.join(__dirname,'..','dist');
const games=['67-calculator','excuse-generator','rock-paper-scissors','wordle-for-dummies','fortune-cookie','iq-test','horoscope','sorting-hat','to-do-tabloid','dog-time-converter','laundry-label-decoder'];
const pages=[path.join(root,'index.html'),...games.map(g=>path.join(root,g,'index.html'))];

test('dashboard and all 11 game pages exist',()=>{
 for(const page of pages) assert.ok(fs.existsSync(page),path.relative(root,page));
});

test('every local link and asset resolves',()=>{
 for(const page of pages){
  const html=fs.readFileSync(page,'utf8');
  const refs=[...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
  for(const ref of refs){
   if(/^(https?:|mailto:|data:|#)/.test(ref)) continue;
   const clean=ref.split('#')[0].split('?')[0];
   if(!clean) continue;
   const target=path.resolve(path.dirname(page),clean);
   assert.ok(fs.existsSync(target),`${path.relative(root,page)} links to missing ${ref}`);
  }
 }
});

test('every game page links back to the dashboard',()=>{
 for(const game of games){
  const html=fs.readFileSync(path.join(root,game,'index.html'),'utf8');
  assert.ok(html.includes('href="../index.html"'),`${game} has no back link`);
 }
});

test('dashboard links to every game',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 for(const game of games) assert.ok(html.includes(`${game}/index.html`),`dashboard is missing ${game}`);
});
