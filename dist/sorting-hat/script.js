(function () {
  'use strict';
  const questions = ['Do you believe in magic?', 'Would you rather be feared than loved?', "If you found a bag of gold that wasn’t yours, would you return it?", 'Would you break a rule to help a friend?', 'Do you trust your gut over a rulebook?'];
  const houses = [
    { name: 'Gryffindor', color: '#a44135', symbol: '☀', lines: ['Brave enough to face a dragon. Still checks behind the shower curtain.', 'A natural hero. A questionable planner.', 'Courage: outstanding. Indoor voice: missing.'] },
    { name: 'Hufflepuff', color: '#8b6618', symbol: '❋', lines: ['Your real superpower? You brought enough snacks for everyone.', 'Loyal, kind, and already helping the hat move house.', 'You would apologize to a door after walking into it.'] },
    { name: 'Ravenclaw', color: '#385d87', symbol: '✧', lines: ['You know this quiz is nonsense. You still want the methodology.', 'A brilliant mind. Forty-seven tabs open.', 'You read the instructions. The hat finds that unsettling.'] },
    { name: 'Slytherin', color: '#3c7459', symbol: '☽', lines: ['You have a five-year plan. The hat is apparently in it.', 'Ambitious enough to ask if this house has a corner office.', 'You didn’t cheat. You creatively interpreted the rules.'] }
  ];
  const muggle = {name: 'Muggle detected!', color: '#646464', symbol: '▤', lines: ['Your application for magic has been replaced with a spreadsheet.', 'No wand. No prophecy. Just a very normal Tuesday.', 'Please collect your sensible shoes at reception.']};
  function pickResult(answers, random = Math.random) { return answers[0] === false ? muggle : houses[Math.floor(random() * houses.length)]; }
  if (typeof module !== 'undefined' && module.exports) module.exports = { questions, houses, pickResult };
  if (typeof document === 'undefined') return;
  const $ = id => document.getElementById(id);
  const buttons = [...document.querySelectorAll('[data-answer]')];
  let answers = [], busy = false, timer;
  function show(id) { ['question-screen', 'thinking-screen', 'result-screen'].forEach(name => { $(name).hidden = name !== id; }); }
  function question(focus) {
    $('question').textContent = questions[answers.length];
    $('step').textContent = `QUESTION ${String(answers.length + 1).padStart(2, '0')} / 05`;
    $('bar').style.width = `${(answers.length + 1) * 20}%`;
    buttons.forEach(button => { button.disabled = false; });
    busy = false;
    if (focus) $('question').focus({preventScroll: true});
  }
  function reveal() {
    const chosen = pickResult(answers);
    document.body.classList.remove('thinking');
    document.body.classList.toggle('muggle', answers[0] === false);
    document.documentElement.style.setProperty('--accent', chosen.color);
    $('result-label').textContent = answers[0] === false ? 'DEPARTMENT OF ORDINARY AFFAIRS' : 'THE HAT HAS SPOKEN';
    $('result').textContent = answers[0] === false ? chosen.name : `You are in ${chosen.name}!`;
    $('seal').textContent = chosen.symbol;
    $('flavor').textContent = chosen.lines[Math.floor(Math.random() * chosen.lines.length)];
    show('result-screen');
    $('result').focus({preventScroll: true});
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    buttons.forEach(item => { item.disabled = true; });
    answers.push(button.dataset.answer === 'yes');
    if (answers.length === questions.length) {
      show('thinking-screen');
      document.body.classList.add('thinking');
      timer = setTimeout(reveal, 3000);
    } else { timer = setTimeout(() => question(true), 240); }
  }));
  $('retry').addEventListener('click', () => {
    clearTimeout(timer); answers = []; document.body.classList.remove('muggle', 'thinking');
    show('question-screen'); question(true);
  });
  question(false);
})();
