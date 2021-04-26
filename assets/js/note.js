class Note {
  constructor(title, body, id = null) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  save() {
    this.id = generateHash();
    const notes = getAllNotes();
    notes.push(this);
    getDb().setItem('notes', JSON.stringify(notes));
    return true;
  }

  update() {
    const notes = getAllNotes();
    const i = getIndexOfNote(this.id);
    notes[i] = this;
    getDb().setItem('notes', JSON.stringify(notes));
    return true;
  }

  toHTML() {
    const noteNode = document.createElement('div');
    noteNode.id = this.id;
    noteNode.className = 'note card card-body col-lg-3 col-12';
    noteNode.innerHTML = `
      <h3 class="text-center title">${this.title}</h3>
      <p class="body">${this.body}</p>
      <button class="btn btn-primary btn-sm" data-bs-toggle="modal"
              data-bs-target="#note_modal" data-action="editNote" data-note-id="${this.id}">
        Edit
      </button>
    `;

    return noteNode;
  }
};

const saveNote = (event) => {
  const action = event.target.dataset.action;
  if (action === 'newNote') {
    saveNewNote();
  } else if (action === 'editNote') {
    const noteId = event.target.dataset.noteId
    updateNote(noteId);
  }
};

const saveNewNote = () => {
  const newNote = new Note(getNoteTitleInput().value, getNoteBodyInput().value);
  if ( newNote.save() ) {
    console.log('-> note saved: ', newNote);
    cleanNoteModal();
    closeNoteModal();
    prependNote(newNote);
  } else {
    //TODO add error message?
  }
};

const updateNote = (noteId) => {
  const note = new Note(getNoteTitleInput().value, getNoteBodyInput().value, noteId);
  if ( note.update() ) {
    console.log('-> note updated: ', note);
    cleanNoteModal();
    closeNoteModal();
    updateNoteView(note);
  }
}

const generateHash = () => Math.random().toString(36).substr(2);
