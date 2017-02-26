'use strict';
var ESCAPE_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
// resize variables
var filterImagePreview = document.querySelector('.filter-image-preview');
var uploadResizeControls = document.querySelector('.upload-resize-controls');
var uploadOverlay = document.querySelector('.upload-overlay');
uploadOverlay.classList.add('invisible');
var uploadSelectImage = document.querySelector('#upload-select-image');
uploadSelectImage.classList.remove('invisible');
var uploadFile = document.querySelector('#upload-file');
uploadFile.addEventListener('change', showElementOverlay);
var uploadFormCancel = document.querySelector('.upload-form-cancel');
uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
});
// переменная, которая ищет по документу класс селектора .upload-filter
var uploadFilterForm = document.querySelector('.upload-filter');
// переменная, которая явл-ся функцией с объявленными параметрами newFilter, oldFilter
// - новый примененный фильтр и старый
// filterImagePreview - это переменная для сужения поиска,
// не повсему документу, а по конкретному классу .filter-image-preview
var applyFilter = function (newFilter, oldFilter) {
  filterImagePreview.classList.remove('filter-' + oldFilter);
  filterImagePreview.classList.add('filter-' + newFilter);
};
// функция показа элемента
function showElementOverlay() {
  uploadSelectImage.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
}
// функция скрытия элемента
function hideElementOverlay() {
  uploadSelectImage.classList.remove('invisible');
  uploadOverlay.classList.add('invisible');
  document.removeEventListener('keydown', tryHideElementOverlay);
}
function tryHideElementOverlay(evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    hideElementOverlay();
  }
}
uploadSelectImage.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    showElementOverlay();
    document.addEventListener('keydown', tryHideElementOverlay);
  }
});
function onScaleChanged(newScale) {
  filterImagePreview.style.transform = 'scale(' + newScale + ')';
}
window.initializeScale(uploadResizeControls, 25, 1, onScaleChanged);
//
window.initializeFilters(uploadFilterForm, applyFilter);

