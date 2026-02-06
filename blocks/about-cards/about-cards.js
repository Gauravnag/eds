export default function decorate(block) {
  const divs = [...block.children];
  const container = document.createElement('div');
  container.className = 'cards-container';

  divs.forEach((div) => {
    const img = div.querySelector('img');
    const titleEl = div.querySelector('strong');
    const descEl = titleEl ? titleEl.parentElement.nextElementSibling : null;

    const imgSrc = img?.src;
    const title = titleEl?.textContent.trim();
    const desc = descEl?.textContent.trim();

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${title}" />
      <h3>${title}</h3>
      <p>${desc}</p>
    `;
    container.appendChild(card);
  });

  block.innerHTML = '';
  block.appendChild(container);
}
