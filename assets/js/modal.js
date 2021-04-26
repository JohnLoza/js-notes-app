// initialize the note modal form based on
// if it's a new note or edit an existing one
const initNoteModal = (event) => {
  const button = event.relatedTarget;
  if (button.dataset.action === 'newNote') {
    setupNewNoteModal();
  } else if (button.dataset.action === 'editNote') {
    setupEditNoteModal(button.dataset.noteId);
  }
  setTimeout(() => document.getElementById('note_title').focus(), 500);
};

// Setup the modal form for a new note
const setupNewNoteModal = () => {
  getNoteModalTitle().textContent = "Nueva Nota";
  getNoteModalSaveButton().dataset.action = "newNote";
  hideDeleteNoteButton();
};

// Setup the modal form to edit an existing note
const setupEditNoteModal = (noteId) => {
  const note = getNote(noteId);
  getNoteModalTitle().textContent = note.title;
  getNoteTitleInput().value = note.title;
  getNoteBodyInput().value = note.body;
  getNoteModalSaveButton().dataset.action = "editNote";
  getNoteModalSaveButton().dataset.noteId = noteId;
  showDeleteNoteButton(noteId);
};

// Clean the note modal and fields
const cleanNoteModal = () => {
  getNoteModalTitle().textContent = '';
  getNoteTitleInput().value = '';
  getNoteBodyInput().value = '';
  hideDeleteNoteButton();

  delete getNoteModalSaveButton().dataset.action;
  if (getNoteModalSaveButton().dataset.noteId)
    delete getNoteModalSaveButton().dataset.noteId;
};

// Show delete note button on modal
const showDeleteNoteButton = (noteId) => {
  const btn = getDeleteNoteButton();
  btn.classList.remove('d-none');
  btn.dataset.noteId = noteId;
};

// Hide delete note button on modal
const hideDeleteNoteButton = (noteId) => {
  const btn = getDeleteNoteButton();
  btn.classList.add('d-none');
};

const getNoteModal = () => document.querySelector('#note_modal');
const getNoteModalTitle = () => getNoteModal().querySelector('.modal-title');
const getNoteModalSaveButton = () => getNoteModal().querySelector('.save-button');
const getDeleteNoteButton = () => getNoteModal().querySelector('.modal-footer .delete-btn');

const getNoteTitleInput = () => getNoteModal().querySelector('#note_title');
const getNoteBodyInput = () => getNoteModal().querySelector('#note_body');
