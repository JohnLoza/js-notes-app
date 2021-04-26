const initializeListeners = () => {
  getNoteModal().addEventListener('show.bs.modal', (event) => initNoteModal(event));
  getNoteModalSaveButton().addEventListener('click', (event) => saveNote(event));
  getDeleteNoteButton().addEventListener('click', (event) => destroyNote(event));
};

const initializeTooltips = () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
};

document.addEventListener('DOMContentLoaded', (event) => {
  initializeLocalStorarge();
  initializeListeners();
  initializeNotesView();
  initializeTooltips();
});
