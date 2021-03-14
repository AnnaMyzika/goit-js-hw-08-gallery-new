import galleryItems from "./gallery-items.js";

const listGalleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imgRef = document.querySelector('.lightbox__image');
const btnRef = document.querySelector('.lightbox__button');
const overlayRef = document.querySelector('.lightbox__overlay');


const markup = galleryItems.map(
  ({ preview, original, description }) =>
    `<li><a class="gallery__link" href='${original}'><img class='gallery__image' src='${preview}' data-source= '${original}' alt='${description}'></a></li>`
);
listGalleryRef.insertAdjacentHTML('beforeend', markup.join(''));

listGalleryRef.addEventListener('click', onModalClick);


function onModalClick(e) {
  e.preventDefault();

  if (e.target.nodeName === 'IMG') {
    modalRef.classList.add('is-open');
    imgRef.src = e.target.dataset.source;
  }

  for (let elem of markup){
    if (elem.includes(e.target.src)) {
      activeIndex = markup.indexOf(elem)
    }
  }
};

btnRef.onclick = closeModal;
function closeModal() {
modalRef.classList.remove('is-open');
  imgRef.removeAttribute('src');
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
});

overlayRef.addEventListener('click', closeModal);

window.addEventListener('keydown', onPressKeyLandR);

let activeIndex = 0;
function onPressKeyLandR(e) {
 if (e.key === 'ArrowLeft' && activeIndex > 0) {
        activeIndex -= 1;
        imgRef.src = galleryItems[activeIndex].original;
    }

    if (e.key === 'ArrowRight' && activeIndex < galleryItems.length - 1) {
        activeIndex += 1;
        imgRef.src = galleryItems[activeIndex].original;
    }
};


