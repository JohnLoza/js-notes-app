class Note {
  constructor(title, body, id = null) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  // Push current note to notes array
  save() {
    this.id = generateHash();
    const notes = getAllNotes();
    notes.push(this);
    saveAllNotes(notes);
    return true;
  }

  // Update current note
  update() {
    const notes = getAllNotes();
    const i = getIndexOfNote(this.id);
    notes[i] = this;
    saveAllNotes(notes);
    return true;
  }

  // Destroy current note
  destroy() {
    const notes = getAllNotes().filter((note) => note.id != this.id);
    saveAllNotes(notes);
    return true;
  }

  // Parse current note to an HTML element
  toHTML() {
    const noteNode = document.createElement('div');
    noteNode.id = this.id;
    noteNode.className = 'note pointer card card-body col-lg-3 col-12';
    noteNode.innerHTML = `
      <h3 class="text-center title">${this.title}</h3>
      <p class="body">${this.body.replaceAll('\n', '<br>')}</p>
      <button class="btn btn-primary btn-sm d-none" data-bs-toggle="modal"
              data-bs-target="#note_modal" data-action="editNote" data-note-id="${this.id}">Edit</button>
    `;
    noteNode.addEventListener('click', (event) => {
      const button = event.target.querySelector('[data-bs-toggle="modal"]');
      if (button) button.click();
    });

    return noteNode;
  }
};

// Determine if a new note is going to be saved,
// or update an existing one
const saveNote = (event) => {
  const action = event.target.dataset.action;
  if (action === 'newNote') {
    saveNewNote();
  } else if (action === 'editNote') {
    const noteId = event.target.dataset.noteId
    updateNote(noteId);
  }
};

// Save a new note in localStorage
const saveNewNote = () => {
  const newNote = new Note(getNoteTitleInput().value, getNoteBodyInput().value);
  if ( newNote.save() ) {
    console.log('-> note saved: ', newNote);
    cleanNoteModal();
    prependNoteToView(newNote);
  } else {
    //TODO add error message?
  }
};

// Update a note in localStorage
const updateNote = (noteId) => {
  const note = new Note(getNoteTitleInput().value, getNoteBodyInput().value, noteId);
  if ( note.update() ) {
    console.log('-> note updated: ', note);
    cleanNoteModal();
    updateNoteView(note);
  }
};

// Destroy a note in localStorage
const destroyNote = (event) => {
  const noteId = event.target.dataset.noteId;
  const note = getNote(noteId);

  if ( note.destroy() ) {
    console.log('-> deleted note: ', note);
    cleanNoteModal();
    removeNoteFromView(note);
  }
};

const generateHash = () => Math.random().toString(36).substr(2);
