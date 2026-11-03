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
  result.replaceChildren(text);
  document.querySelector('#result-category').textContent = name.toUpperCase();
  result.classList.remove('revealed');
  void result.offsetWidth;
  result.classList.add('revealed');
});
