const category = document.querySelector('#category');
const generate = document.querySelector('#generate');
const result = document.querySelector('#result');
const lastByCategory = new Map();
for (const name of Object.keys(excuses)) {
  const option = document.createElement('option');
  option.value = name; option.textContent = name; category.append(option);
}
category.addEventListener('change', () => {
  generate.disabled = !category.value;
});
document.querySelector('#excuse-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = category.value;
  if (!Object.hasOwn(excuses, name)) return;
  const excuse = pickExcuse(excuses[name], lastByCategory.get(name));
  if (!excuse) return;
  lastByCategory.set(name, excuse);
  const text = document.createElement('p');
  text.className = 'excuse'; text.textContent = excuse;
  result.replaceChildren(text, shareRow(excuse));
  document.querySelector('#result-category').textContent = name.toUpperCase();
  result.classList.remove('revealed');
  void result.offsetWidth;
  result.classList.add('revealed');
});

function shareRow(excuse) {
  const row = document.createElement('div');
  row.className = 'share-row';
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'share-btn'; button.textContent = 'Share with a friend';
  const status = document.createElement('span');
  status.className = 'share-status'; status.setAttribute('role', 'status');
  row.append(button, status);
  tdliShare(button, () => ({ title: 'An excuse from the Dumb Little Internet', text: '\u201c' + excuse + '\u201d \u2014 an excuse from the Dumb Little Internet. Get yours:' }), status);
  return row;
}
