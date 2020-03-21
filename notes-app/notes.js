const fs = require('fs')
const chalk = require('chalk')
const notesDatabaseName = 'notesdb.json'

const getNotes = function () {
    return 'Your notes...'
}

const addNote = (title, body) => {
    var notes = loadNotes()
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })
    if (duplicateNotes.length ===0) {
        console.log('New note added')
        notes.push({
            title:title,
            body:body
        })
    }
    else {
        console.log('Duplicate detected, note ignored')
    }
    console.log(notes)
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

module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote
}