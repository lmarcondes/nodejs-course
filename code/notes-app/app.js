const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes.js')
// const getNotes = require('./utils')

// Customize yargs version
yargs.version('1.21.0')

// add, remove, read, list notes
// add command

yargs.command({
    command:'add',
    describe:'Add a new note',
    builder: {
        title: {
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'body of the note',
            demandOption:true,
            type:'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
})

// remove command
yargs.command({
    command:'remove',
    describe:'remove a note from db',
    builder:{
        title:{
            describe:'title of the note to be removed',
            demandOption:true,
            type:'string'
        }
    },
    handler: (argv)=>{
        console.log('Removing note')
        notes.removeNote(argv.title)
    }
})

// read command 
yargs.command({
    command:'read',
    describe:'read a note',
    handler: () => {
        console.log('reading note from db')
    }
})

// list commad
yargs.command({
    command:'list',
    describe:'list all notes created',
    handler: () => {
        console.log('notes created...')
    }
})

yargs.parse()