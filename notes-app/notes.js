const fs = require('fs')
const chalk = require('chalk')
const notesDatabaseName = 'notesdb.json'

const getNotes = function () {
    return 'Your notes...'
}

const addNote = (title, body) => {
  debugger
    var notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => { return note.title === title })
    const duplicateNote = notes.find((note) => note.title === title)

    if (! duplicateNote) {
        console.log('New note added')
        notes.push({
            title:title,
            body:body
        })
    }
    else {
        console.log('Duplicate detected, note ignored')
    }
    saveNotes(notes)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredArray = notes.filter((note) => {
        return note.title !== title
    })
    if (filteredArray.length === notes.length) {
        var removeMessage = chalk.default.bgRedBright.black('No notes removed')
    }
    else {
        var removeMessage = chalk.default.bgGreenBright.black('Notes removed')
    }
    console.log(removeMessage)
    saveNotes(filteredArray)
}

const saveNotes = (array) => {
    let dataJSON = JSON.stringify(array)
    fs.writeFileSync(notesDatabaseName, dataJSON) 
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(notesDatabaseName)
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
  let notesArray = loadNotes()
  notesArray.forEach((note) =>{
    console.log(`Note Title: ${note.title}`)
    console.log(`Body: \n${note.body}`)
  })
}

const readNote = (title) => {
  let notesArray = loadNotes()
  let noteFound = notesArray.find((note) => note.title === title)
  if (noteFound) {
    console.log(chalk.inverse( `Note Title: ${noteFound.title}` ))
    console.log(`Note Body: ${noteFound.body}`)
  } else {
    console.log('No notes found by that name')
  }
}

module.exports = {
  getNotes:getNotes,
  addNote:addNote,
  removeNote:removeNote,
  listNotes:listNotes,
  readNote: readNote
}
