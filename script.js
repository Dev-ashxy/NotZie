// Select elements
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteButton');
const notesContainer = document.getElementById('notesContainer');

// Load notes from local storage on page load
document.addEventListener('DOMContentLoaded', loadNotes);

// Add note
addNoteButton.addEventListener('click', function() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        addNoteToDOM(noteText);
        saveNoteToLocalStorage(noteText);
        noteInput.value = '';  // Clear input after adding note
    }
});

// Load notes from local storage
function loadNotes() {
    const notes = getNotesFromLocalStorage();
    notes.forEach(note => addNoteToDOM(note));
}

// Add note to DOM
function addNoteToDOM(noteText) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.textContent = noteText;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        noteDiv.remove();
        deleteNoteFromLocalStorage(noteText);
    };

    noteDiv.appendChild(deleteButton);
    notesContainer.appendChild(noteDiv);
}

// Save note to local storage
function saveNoteToLocalStorage(note) {
    let notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Get notes from local storage
function getNotesFromLocalStorage() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// Delete note from local storage
function deleteNoteFromLocalStorage(noteText) {
    let notes = getNotesFromLocalStorage();
    notes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}
