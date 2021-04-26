// Initialize view, populate notes container with currently saved notes
const initializeNotesView = () => {
  getAllNotes().forEach(note => {
    prependNoteToView( new Note(note.title, note.body, note.id) );
  });
};

// Prepend another note to the notes container
const prependNoteToView = (note) => {
  const notesContainer = document.getElementById('notes_container');
  notesContainer.prepend( note.toHTML() );
};

// Update a note currently in view
const updateNoteView = (note) => {
  const el = document.getElementById(note.id);
  el.innerHTML = note.toHTML().innerHTML;
};

// Remove note element from view
const removeNoteFromView = (note) => {
  const el = document.getElementById(note.id);
  el.remove();
};
