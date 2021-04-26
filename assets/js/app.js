const initializeListeners = () => {
  getNoteModal().addEventListener('show.bs.modal', (event) => initNoteModal(event));
  getNoteModalSaveButton().addEventListener('click', (event) => saveNote(event));
};

document.addEventListener('DOMContentLoaded', (event) => {
  initializeLocalStorarge();
  initializeListeners();
  initializeNotesView();
});
