import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  const defaultWrapper = footer.querySelector('.default-content-wrapper');
  if (defaultWrapper) {
    const children = Array.from(defaultWrapper.children);

    const footerContainer = document.createElement('div');
    footerContainer.className = 'footer-container';

    let currentSection = null;
    let ul = null;
    let copyrightText = '';

    children.forEach((child) => {
      if (child.tagName.toLowerCase() === 'h4') {
        currentSection = document.createElement('div');
        currentSection.className = 'footer-section';
        currentSection.innerHTML = `<h4>${child.textContent.trim()}</h4>`;
        ul = document.createElement('ul');
        currentSection.appendChild(ul);
        footerContainer.appendChild(currentSection);
      } else if (child.tagName.toLowerCase() === 'p') {
        const text = child.textContent.trim();
        if (text.toLowerCase().startsWith('copyright')) {
          copyrightText = text;
        } else if (ul) {
          const li = document.createElement('li');
          li.innerHTML = `<a href="#">${text}</a>`;
          ul.appendChild(li);
        } else {
          const div = document.createElement('div');
          div.className = 'footer-section';
          div.innerHTML = `<p>${text}</p>`;
          footerContainer.appendChild(div);
        }
      }
    });

    defaultWrapper.innerHTML = '';
    defaultWrapper.appendChild(footerContainer);

    if (copyrightText) {
      const copyDiv = document.createElement('div');
      copyDiv.className = 'footer-copy';
      copyDiv.innerHTML = `<p>${copyrightText}</p>`;
      footerContainer.appendChild(copyDiv);
    }
  }
}
