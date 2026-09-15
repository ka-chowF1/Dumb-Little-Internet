function renderProjects(items, container, count) {
  container.replaceChildren();
  let shown = 0;
  for (const project of items) {
    let url;
    try { url = new URL(project.url); } catch { continue; }
    if (!['https:', 'http:'].includes(url.protocol) || !project.name) continue;
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = url.href;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', `${project.name} (opens in a new tab)`);
    const top = document.createElement('div');
    top.className = 'card-top';
    const emoji = document.createElement('span');
    emoji.className = 'emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = project.emoji || '🌐';
    top.append(emoji);
    if (project.isNew) {
      const badge = document.createElement('span');
      badge.className = 'badge'; badge.textContent = 'NEW!'; top.append(badge);
    }
    const name = document.createElement('h3'); name.textContent = project.name;
    card.append(top, name);
    if (project.tagline?.trim()) {
      const tagline = document.createElement('p');
      tagline.className = 'tagline'; tagline.textContent = project.tagline; card.append(tagline);
    }
    const bottom = document.createElement('div'); bottom.className = 'card-bottom';
    const label = document.createElement('span'); label.textContent = 'Give it a click';
    const arrow = document.createElement('span'); arrow.className = 'arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
    bottom.append(label, arrow); card.append(bottom); container.append(card); shown++;
  }
  count.textContent = String(shown).padStart(2, '0');
  if (!shown) {
    const empty = document.createElement('p'); empty.className = 'empty';
    empty.textContent = 'Nothing here yet. A rare moment of good judgment.'; container.append(empty);
  }
}
renderProjects(projects, document.querySelector('#projects'), document.querySelector('#project-count'));
