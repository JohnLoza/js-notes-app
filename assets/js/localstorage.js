const initializeLocalStorarge = () => {
  setupNotesItem();
};

const getDb = () => window.localStorage;

const getAllNotes = () => {
  const stringJSON = getDb().getItem('notes');
  return JSON.parse(stringJSON);
};

const getNote = (noteId) => {
  const notes = getAllNotes();
  const match = notes.filter((note) => note.id === noteId);
  return new Note(match[0].title, match[0].body, match[0].id);
};

const getIndexOfNote = (noteId) => {
  for (const [i, note] of getAllNotes().entries()) {
    if (note.id === noteId)
      return i;
  }
  return -1;
};

const setupNotesItem = () => {
  try {
    const notes = getAllNotes();
    if (!Array.isArray(notes))
      saveEmptyNotesArray();
  } catch (error) {
    saveEmptyNotesArray();
  }
};

const saveEmptyNotesArray = () => {
  const notesArr = [];
  saveAllNotes(notesArr);
};

const saveAllNotes = (notesArr) => {
  const notesString = JSON.stringify(notesArr);
  getDb().setItem('notes', notesString);
}
