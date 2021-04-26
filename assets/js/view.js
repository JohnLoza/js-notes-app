const initializeNotesView = () => {
  getAllNotes().forEach(note => {
    prependNoteToView( new Note(note.title, note.body, note.id) );
  });
};

const prependNoteToView = (note) => {
  const notesContainer = document.getElementById('notes_container');
  notesContainer.prepend( note.toHTML() );
};

const updateNoteView = (note) => {
  const el = document.getElementById(note.id);
  el.innerHTML = note.toHTML().innerHTML;
};

const removeNoteFromView = (note) => {
  const el = document.getElementById(note.id);
  el.remove();
};
