const URL = '/api/v1/albums'
const notesURL = '/api/v1/notes'
let CURRENT_NOTE = null

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('hi there');
  console.log('DOM fully loaded and parsed');
  main()
});

function getAlbums() {
  fetch(URL)
  .then(res => res.json())
  .then(json => {
    eachAlbums(json)
  })
}

function eachAlbums(albums) {
  clearAlbums()
  albums.forEach(album => {
    album = new Album(album.id, album.title, album.artist, album.art, album.notes)
    renderAlbum(album)
  })
}

function renderAlbum(album) {
  let leftDiv = document.getElementById('albums-menu')
  leftDiv.prepend(album.render())
}

function clearAlbums() {
  let leftDiv = document.getElementById('albums-menu')
  while(leftDiv.firstChild) {
    leftDiv.firstChild.remove()
  }
}

function createNote(ev) {
  ev.preventDefault()
  fetch(notesURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      content: ev.target.elements['note_content'].value,
      album_id: ev.target.getAttribute('data_album_id')
    })
  })
  .then(res => res.json())
  .then(json => {
    let album = ALBUMS.find(album => {
      return album.id === json.album.id
    })
    let note = new Note(json.id, json.content, json.album, json.created_at)
    album.notes.push(note)
    let li = document.createElement('li')
    let notesList = document.getElementById('notes-list')
    note.render(li)
    notesList.prepend(li)
  })
}

function createAlbum(albumTitle, artistName, coverArt) {
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      albumTitle: albumTitle,
      artistName: artistName,
      coverArt: coverArt})
  })
  .then(res => res.json())
  .then(json => {
    console.log('created album', json)
    let album = new Album(json.id, json.title, json.artist, json.art)
    renderAlbum(album)
  })
}

function main() {
  getAlbums()

  let newAlbumForm = document.getElementById('new_album')
  newAlbumForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let albumTitle = ev.target.elements['album_title'].value
    let artistName = ev.target.elements['artist_name'].value
    searchAlbum(artistName, albumTitle)
  })

  let newNoteForm = document.getElementById('new_note')
  newNoteForm.addEventListener('submit', (ev) => {
    createNote(ev)
    ev.target.elements['note_content'].value = ''
  })

  let sortSelect = document.getElementById('album_sort')
  sortSelect.addEventListener('change', (ev) => {
    Album.sort(ev.target.value)
  })
}
