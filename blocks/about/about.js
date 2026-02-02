export default function decorate(block) {
  const divs = block.children;

  const container = document.createElement('div');

  [...divs].forEach((div) => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image-container');

    const pictureElem = div.querySelector('picture');
    imgContainer.appendChild(pictureElem);

    const pElem = div.querySelectorAll('p');
    [...pElem].forEach((p, index) => {
      // imgContainer.appendChild(p);
      if (index === 0) {
        const h1Div = document.createElement('h1');
        h1Div.textContent = p.textContent;
        imgContainer.appendChild(h1Div);
      }

      if (index === 1) {
        const pDiv = document.createElement('p');
        pDiv.textContent = p.textContent;
        imgContainer.appendChild(pDiv);
      }
    });

    container.appendChild(imgContainer);
  });
  block.innerHTML = '';
  block.appendChild(container);
}
