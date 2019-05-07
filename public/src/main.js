window.addEventListener('DOMContentLoaded', (event) => {
  console.log('hi there');
  console.log('DOM fully loaded and parsed');
  document.body.style.backgroundColor = 'goldenrod'

  const URL = '/api/v1/albums'

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
      renderAlbum(album)
    })
  }

  function renderAlbum(album) {
    let li = document.createElement('li')
    li.textContent = `${album.title} - ${album.artist.name}`
    let ul = document.getElementById('albums')
    let img = document.createElement('img')
    img.src = album.art
    li.appendChild(img)
    ul.appendChild(li)
  }

  function clearAlbums() {
    let ul = document.getElementById('albums')
    while(ul.firstChild) {
      ul.firstChild.remove()
    }
  }

  function main() {
    getAlbums()

    let newAlbumForm = document.getElementById('new_album')
    newAlbumForm.addEventListener('submit', (ev) => {
      ev.preventDefault()
      let albumTitle = ev.target.elements['album_title'].value
      let artistName = ev.target.elements['artist_name'].value
      getAlbum(artistName, albumTitle)
    })
  }

  main()

});
