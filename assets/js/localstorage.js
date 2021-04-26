// Initialize localStorage settings
const initializeLocalStorarge = () => {
  setupNotesItem();
};

// get localStorage instance
const getDb = () => window.localStorage;

// get an array with all notes from localStorage
const getAllNotes = () => {
  const stringJSON = getDb().getItem('notes');
  return JSON.parse(stringJSON);
};

// get a note object from a note in localStorage
const getNote = (noteId) => {
  const notes = getAllNotes();
  const match = notes.filter((note) => note.id === noteId);
  return new Note(match[0].title, match[0].body, match[0].id);
};

// get the index from a note in the notes array, based on it's id
const getIndexOfNote = (noteId) => {
  for (const [i, note] of getAllNotes().entries()) {
    if (note.id === noteId)
      return i;
  }
  return -1;
};

// Make sure we have a localStorage item named `notes`
// and it should be an `Array` if not save an empty one.
const setupNotesItem = () => {
  try {
    const notes = getAllNotes();
    if (!Array.isArray(notes))
      saveEmptyNotesArray();
  } catch (error) {
    saveEmptyNotesArray();
  }
};

// Save an empty array as the notes array in localStorage
const saveEmptyNotesArray = () => {
  const notesArr = [];
  saveAllNotes(notesArr);
};

// Save the given notes array in localStorage
const saveAllNotes = (notesArr) => {
  const notesString = JSON.stringify(notesArr);
  getDb().setItem('notes', notesString);
}
