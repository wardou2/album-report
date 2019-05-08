class Album {
  constructor(id, title, artist, art) {
    this.id = id
    this.title = title
    this.artist = artist
    this.art = art
  }

  render() {
    let albumDiv = document.createElement('div')
    albumDiv.classList.add('album-div')
    let albumText = document.createElement('h3')
    albumText.textContent = `${this.title} - ${this.artist.name}`
    albumText.addEventListener('click', () => {
      this.displayNotes()
    })

    let dlt = document.createElement('button')
    dlt.textContent = "Delete"
    dlt.addEventListener('click', () => {
      this.delete(albumDiv)
    })

    let img = document.createElement('img')
    img.src = this.art
    img.classList.add('album-art')

    albumDiv.appendChild(albumText)
    albumDiv.appendChild(img)
    albumDiv.appendChild(dlt)

    return albumDiv
  }

  displayNotes() {
    console.log('notes');
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
