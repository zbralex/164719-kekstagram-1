'use strict';

(function () {
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

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

  var uploadFilterForm = document.querySelector('.upload-filter');

  var applyFilter = function (newFilter, oldFilter) {
    filterImagePreview.classList.remove('filter-' + oldFilter);
    filterImagePreview.classList.add('filter-' + newFilter);
  };

  function showElementOverlay() {
    uploadSelectImage.classList.add('invisible');
    uploadOverlay.classList.remove('invisible');
  }

  function hideElementOverlay() {
    uploadSelectImage.classList.remove('invisible');
    uploadOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  function onDocumentKeydown(evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      hideElementOverlay();
    }
  }

  uploadSelectImage.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      showElementOverlay();
      document.addEventListener('keydown', onDocumentKeydown);
    }
  });
  function onScaleChanged(newScale) {
    filterImagePreview.style.transform = 'scale(' + newScale + ')';
  }

  window.initializeScale(uploadResizeControls, 25, 1, onScaleChanged);

  window.initializeFilters(uploadFilterForm, applyFilter);

})();
