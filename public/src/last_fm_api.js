let API_KEY = 'bffeac0bc68de1532ae39f2158614db8'

function searchAlbum(artist, album) {
  album = album.trim()
  hideErrorDiv()
  let albumSearchURL = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${album}&api_key=${API_KEY}&format=json`
  fetch(albumSearchURL)
  .then(ret => ret.json())
  .then(results => {
    getAlbumFromSearch(results, artist, album)
  })
}

function getAlbumFromSearch(results, artistInput, albumInput) {
  console.log('results:', results.results.albummatches.album);

  let albums = results.results.albummatches.album
  artistInput = artistInput.trim()
  if (albums.length !== 0) {
    console.log("Non-zero return");
    let album = albums.find(function(el) {
      return el.artist.toUpperCase().includes(artistInput.toUpperCase())
    })
    if (album) {
      console.log("Found match:", album)
      parseAlbum(album)
    } else {
      showErrorDiv()
    }
  } else {
    showErrorDiv()
  }
}

// function getAlbum(artist, album) {
//   let albumURL = encodeURI(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`)
//   fetch(albumURL)
//   .then(ret => ret.json())
//   // .then(handleErrors)
//   .then(parseAlbum)
// }

function parseAlbum(album) {
  let albumTitle = album.name
  let artistName = album.artist
  let coverArt = album.image[3]['#text']
  createAlbum(albumTitle, artistName, coverArt)
}

function showErrorDiv() {
  let errorDiv = document.getElementById('error')
  // errorDiv.textContent = 'Album/Artist combination not found'
  errorDiv.style.display = 'inline-block'
}

function hideErrorDiv() {
  let errorDiv = document.getElementById('error')
  errorDiv.style.display = 'none'
}
