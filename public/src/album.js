const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
let ALBUMS = []

class Album {
  constructor(id, title, artist, art, notes) {
    this.id = id
    this.title = title
    this.artist = artist
    this.art = art
    this.notes = notes
    ALBUMS.push(this)
  }

  render() {
    let albumDiv = document.createElement('div')
    albumDiv.classList.add('album-div')
    let internalAlbumDiv = document.createElement('div')
    internalAlbumDiv.classList.add('internal-album-div')
    let albumText = document.createElement('h3')
    albumText.textContent = this.title
    let artistText = document.createElement('h4')
    artistText.textContent = this.artist.name
    internalAlbumDiv.addEventListener('click', () => {
      let newNoteForm = document.getElementById('new_note')
      newNoteForm.setAttribute('data_album_id', this.id)
      this.displayNotes()
    })

    let img = document.createElement('img')
    img.src = this.art
    img.classList.add('album-art')

    let infoDiv = document.createElement('div')

    // let edit = document.createElement('button')
    // edit.textContent = "Edit"
    // edit.addEventListener('click', () => {
    //   this.edit(albumDiv)
    // })

    let dlt = document.createElement('button')
    dlt.textContent = "Remove"
    dlt.classList.add('btn-warning')
    dlt.addEventListener('click', () => {
      this.delete(albumDiv)
    })

    // infoDiv.appendChild(edit)
    infoDiv.appendChild(dlt)
    internalAlbumDiv.appendChild(albumText)
    internalAlbumDiv.appendChild(artistText)
    internalAlbumDiv.appendChild(img)
    albumDiv.appendChild(internalAlbumDiv)
    albumDiv.appendChild(infoDiv)

    return albumDiv
  }

  displayNotes() {
    let notesDiv = document.getElementById('notes-display')
    let notesTitle = document.getElementById('notes-display-title')
    notesTitle.textContent = `${this.title} - ${this.artist.name} Notes`
    notesDiv.style.display = "inline-block"
    let notesList = document.getElementById('notes-list')
    while (notesList.firstChild) {
      notesList.firstChild.remove()
    }

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

  static sort(filter) {
    let retArr = [...ALBUMS]

    switch (filter) {
      case "Date Added":
        clearAlbums()
        retArr.forEach(al => {
          renderAlbum(al)
        })
        break
      case "Artist":
        retArr.sort((a, b) => {
          if (removeThe(a.artist.name) < removeThe(b.artist.name)) {
            return 1
          }
          if (removeThe(a.artist.name) > removeThe(b.artist.name)) {
            return -1
          }
          return 0
        })
        clearAlbums()
        retArr.forEach(al => {
          renderAlbum(al)
        })
        break
      case "Title":
      // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
        retArr.sort((a, b) => {
          if (removeThe(a.title) < removeThe(b.title)) {
            return 1
          }
          if (removeThe(a.title) > removeThe(b.title)) {
            return -1
          }
          return 0
        })
        clearAlbums()
        retArr.forEach(al => {
          renderAlbum(al)
        })
        break
    }
  }
}

function removeThe(el) {
  if (el.slice(0,4).toUpperCase() === "THE ") {
    console.log(el.slice(0,4))
    return el.slice(4)
  } else {
    return el
  }
}
