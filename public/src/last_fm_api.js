let API_KEY = 'bffeac0bc68de1532ae39f2158614db8'
const URL = '/api/v1/albums'

function getAlbum(artist, album) {
  let albumURL = encodeURI(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`)
  fetch(albumURL)
  .then(ret => ret.json())
  .then(parseAlbum)
}

function parseAlbum(album) {
  let albumTitle = album.album.name
  let artistName = album.album.artist
  let coverArt = album.album.image[3]['#text']
  newAlbum(albumTitle, artistName, coverArt)
}

function newAlbum(albumTitle, artistName, coverArt) {
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({albumTitle, artistName, coverArt})
  })
  .then(res => res.json())
  .then(json => {
    console.log('created album', json)
    renderAlbum(album)
  })
}
