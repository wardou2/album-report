const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
class Album {
  constructor(id, title, artist, art, notes) {
    this.id = id
    this.title = title
    this.artist = artist
    this.art = art
    this.notes = notes
  }

  render() {
    let albumDiv = document.createElement('div')
    albumDiv.classList.add('album-div')
    let albumText = document.createElement('h3')
    albumText.textContent = `${this.title} - ${this.artist.name}`
    albumText.addEventListener('click', () => {
      this.displayNotes()
    })

    let img = document.createElement('img')
    img.src = this.art
    img.classList.add('album-art')

    let infoDiv = document.createElement('div')

    let edit = document.createElement('button')
    edit.textContent = "Edit"
    edit.addEventListener('click', () => {
      this.edit(albumDiv)
    })

    let dlt = document.createElement('button')
    dlt.textContent = "Delete"
    dlt.addEventListener('click', () => {
      this.delete(albumDiv)
    })

    infoDiv.appendChild(edit)
    infoDiv.appendChild(dlt)
    albumDiv.appendChild(albumText)
    albumDiv.appendChild(img)
    albumDiv.appendChild(infoDiv)

    return albumDiv
  }

  displayNotes() {
    let notesDiv = document.getElementById('notes-display')
    notesDiv.style.display = "inline-block"
    let notesList = document.getElementById('notes-list')
    while (notesList.firstChild) {
      notesList.firstChild.remove()
    }

    let newNoteForm = document.getElementById('new_note')
    newNoteForm.addEventListener('submit', (ev) => {
      createNote(ev, this)
    })

    this.notes.forEach(note => {
      note = new Note(note.id, note.content, note.album, note.created_at)
      let li = document.createElement('li')
      note.render(li)
      notesList.prepend(li)
    })
  }

  delete(el) {
    fetch(URL + '/' + this.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(json => {
      el.remove()
    })
  }
}
