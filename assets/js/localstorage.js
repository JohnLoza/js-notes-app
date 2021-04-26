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
  return match[0];
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
  const notesArr = JSON.stringify([]);
  getDb().setItem('notes', notesArr);
};
