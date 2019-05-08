class Note {
  constructor(id, content, album, created_at) {
    this.id = id
    this.content = content
    this.album = album
    this.created_at = created_at
  }

  edit(el) {
    CURRENT_NOTE = this
    let editForm = document.getElementById('edit_note')
    editForm.elements["note_content"].value = this.content
    editForm.style.display = 'inline-block'
    editForm.addEventListener('submit', (ev) => {
      this.handleEdit(ev, editForm, el)
    })
  }

  handleEdit(ev, editForm, el) {
    ev.preventDefault()
    fetch(notesURL + '/' + CURRENT_NOTE.id, {
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

    let edit = document.createElement('button')
    edit.textContent = "Edit Note"
    edit.style.float = 'right'
    edit.addEventListener('click', () => {
      this.edit(li)
    })
    li.appendChild(edit)

    let dlt = document.createElement('button')
    dlt.textContent = "Delete"
    dlt.style.float = 'right'
    dlt.addEventListener('click', () => {
      this.delete(li)
    })
    li.appendChild(dlt)
  }
}
