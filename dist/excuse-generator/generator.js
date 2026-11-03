function pickExcuse(list, previous, random = Math.random) {
  if (!Array.isArray(list) || !list.length) return null;
  const alternatives = list.filter(excuse => excuse !== previous);
  const choices = alternatives.length ? alternatives : list;
  return choices[Math.floor(random() * choices.length)];
}
