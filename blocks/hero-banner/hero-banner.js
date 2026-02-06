export default function decorate(block) {
  const divChildren = block.children;

  const firstWrapper = divChildren[0];
  const imgPath = firstWrapper.querySelector('img')?.src;
  const titleText = firstWrapper.querySelector('h2')?.textContent.trim();
  const detailsText = firstWrapper.querySelector('p')?.textContent.trim();

  const bottomWrapper = divChildren[1];
  const bottomBarText = bottomWrapper.querySelector('p')?.textContent.trim();

  const bannerContainerDiv = document.createElement('div');
  bannerContainerDiv.classList.add('container');
  bannerContainerDiv.innerHTML = `
    <div class="banner-content">
      <h1>${titleText}</h1>
      <p>${detailsText}</p>
    </div>
  `;

  const bottomBarDiv = document.createElement('div');
  bottomBarDiv.classList.add('bottom-bar');
  bottomBarDiv.innerHTML = `
    <div class="container">
      <p>${bottomBarText}</p>
    </div>
  `;

  // replace block content
  block.innerHTML = '';
  block.append(bannerContainerDiv);
  block.append(bottomBarDiv);

  // set CSS custom property for background image
  if (imgPath) {
    document.documentElement.style.setProperty('--bg1', `url(${imgPath})`);
  }
}
