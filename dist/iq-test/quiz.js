(function(root){
  const questions = [
    { question:'17 − 4 = ?', correct:'13', wrongAnswers:['$91','Aura loss','4'], category:'QUICK MATH' },
    { question:'What is the capital of Mexico?', correct:'Mexico City', wrongAnswers:['The Taco Shop','Texas','9/11'], category:'WORLD KNOWLEDGE' },
    { question:'8 × 3 = ?', correct:'24', wrongAnswers:['A financial problem','38','Yes'], category:'QUICK MATH' },
    { question:'What color do you get by mixing red and blue?', correct:'Purple', wrongAnswers:['Mac and cheese','Sus','34'], category:'ART CLASS' },
    { question:'How many continents are there?', correct:'7', wrongAnswers:['6ix9ine','Negative aura','Idk chief'], category:'WORLD KNOWLEDGE' },
    { question:'What planet do we live on?', correct:'Earth', wrongAnswers:['A giant meatball','Mars, probably',"The sun (it's warm)"], category:'SPACE STUFF' },
    { question:'What is the opposite of “hot”?', correct:'Cold', wrongAnswers:['Unplugged','Rizz','L'], category:'WORD PLAY' },
    { question:'5 + 5 = ?', correct:'10', wrongAnswers:['Skill issue','Negative rizz','15'], category:'QUICK MATH' },
    { question:'What is the capital of Japan?', correct:'Tokyo', wrongAnswers:['Naruto','Anime Land','The food court'], category:'WORLD KNOWLEDGE' },
    { question:'What sound does a cow make?', correct:'Moo', wrongAnswers:['CHICKEN JOCKY','L + ratio','34'], category:'ANIMAL EXPERTISE' },
  ];
  function shuffle(items, random=Math.random){
    const result=[...items];
    for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
    return result;
  }
  class Quiz {
    constructor(){this.reset();}
    reset(){this.index=0;this.locked=false;this.finished=false;}
    get current(){return questions[this.index];}
    get score(){return this.finished ? 69 : null;}
    answer(value){
      if(this.locked || this.finished || ![this.current.correct,...this.current.wrongAnswers].includes(value))return null;
      this.locked=true;
      return value===this.current.correct;
    }
    advance(){
      if(!this.locked || this.finished)return false;
      this.index++;
      this.finished=this.index===questions.length;
      this.locked=false;
      return true;
    }
  }
  root.IQTest={questions,shuffle,Quiz};
  if(typeof module!=='undefined')module.exports=root.IQTest;
})(globalThis);
