const initializeNotesView = () => {
  getAllNotes().forEach(note => {
    prependNote( new Note(note.title, note.body, note.id) );
  });
};

const prependNote = (note) => {
  const notesContainer = document.getElementById('notes_container');
  notesContainer.prepend( note.toHTML() );
};

const updateNoteView = (note) => {
  const el = document.getElementById(note.id);
  const title = el.querySelector('.title');
  const body = el.querySelector('.body');

  title.textContent = note.title;
  body.textContent = note.body;
};
