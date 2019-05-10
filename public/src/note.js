class Note {
  constructor(id, content, album, created_at) {
    this.id = id
    this.content = content
    this.album = album
    this.created_at = created_at
  }

  edit(el) {
    CURRENT_NOTE = this
    let newForm = document.getElementById('new_note')
    newForm.style.display = 'none'

    let editForm = document.getElementById('edit_note')
    editForm.elements["note_content"].value = this.content
    editForm.style.display = 'inline-block'
    editForm.addEventListener('submit', (ev) => {
      this.handleEdit(ev, el)
    })
  }

  handleEdit(ev, el) {
    ev.preventDefault()
    fetch(notesURL + '/' + ev.target.getAttribute('data_note_id'), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: ev.target.elements['note_content'].value
      })
    })
    .then(res => res.json())
    .then(json => {
      this.id = json.id
      this.content = json.content
      this.album = json.album
      this.created_at = json.created_at

      let newForm = document.getElementById('new_note')
      newForm.style.display = 'inline-block'
      let editForm = document.getElementById('edit_note')
      editForm.style.display = 'none'

      this.render(el)
    })
  }

  delete(el) {
    fetch(notesURL + '/' + this.id, {
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

  render(li) {
    let date = this.created_at
    let year = parseInt(date.slice(0,4))
    let month = parseInt(date.slice(5,7))
    let day = parseInt(date.slice(8,10))
    let hour = parseInt(date.slice(11,13))
    let min = parseInt(date.slice(14,16))
    let adj = parseInt(date.slice(25,26))

    let dateObj = new Date(year, month, day, hour, min)

    li.textContent = `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()} - ${this.content}`

    let dlt = document.createElement('button')
    dlt.textContent = "Delete"
    dlt.style.float = 'right'
    dlt.classList.add('btn-warning')
    dlt.addEventListener('click', () => {
      // let album = ALBUMS.find(a => a.id === this.album.id)
      // album.notes = album.notes.filter(note => {
      //   return note.id != this.id
      // })
      this.delete(li)
    })
    li.appendChild(dlt)

    let edit = document.createElement('button')
    edit.textContent = "Edit"
    edit.style.float = 'right'
    edit.addEventListener('click', () => {
      let editNoteForm = document.getElementById('edit_note')
      editNoteForm.setAttribute('data_note_id', this.id)
      this.edit(li)
    })
    li.classList.add('borderlist')
    li.appendChild(edit)
  }
}
