let API_KEY = 'bffeac0bc68de1532ae39f2158614db8'

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
  createAlbum(albumTitle, artistName, coverArt)
}

function handleErrors(resp) {
  if (!resp.ok) {
    throw Error(resp.statusText)
  }
  return resp
}
