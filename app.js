const chalk = require('chalk');
const yargs= require('yargs');
const dictionary = require('./context/dictionary');
const notes = require('./notes.js');

yargs.version('15.4.1');

//C
yargs.command({
    command: 'add',
    describe: 'Add new Note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        const action = notes.addNote(argv.title,argv.body);
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
        console.log(chalk.bold('   Note :-'));
        console.log(chalk.cyan('   Title: ')+argv.title);
        console.log(chalk.cyan('   Content: ')+argv.body);
        console.log(chalk.green('   '+action+' Succesfully!!!....'));
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
    }
});

//R
yargs.command({
    command: 'list',
    describe: 'List all Notes',
    handler: () => {
        const resultNotes = notes.loadNotes();
        const len = resultNotes.length;
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
        if(len !== 0){
            for(let i=0;i<len;i++){
                console.log(chalk.bold("Note "+(i+1)+":"));
                console.log(chalk.cyan('Title: ')+resultNotes[i].title,chalk.cyan('   Content: ')+resultNotes[i].body);
                console.log();
            }
        }
        console.log(chalk.yellow(len+' Result(s) Found'))
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
    }
});
yargs.command({
    command: 'read',
    describe: 'Read a Note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: "string"
        }
    },
    handler: argv =>{
        const activeNote = notes.getNote(argv.title);
        const note = activeNote.note;
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
        if(note !== undefined){
            console.log(chalk.bold('   Match Found :-'));
            console.log(chalk.cyan('   Title: ')+note.title);
            console.log(chalk.cyan('   Content: ')+note.body);
        }else{
            console.log(chalk.bold('No Matching Reuslts for Title: '+ argv.title));
        }
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
    }
});

//U
yargs.command({
    command: 'update',
    describe: 'Update a Note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        notes.updateNote(argv.title,argv.body);
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
        console.log(chalk.bold('   Note :-'));
        console.log(chalk.cyan('   Title: ')+argv.title);
        console.log(chalk.cyan('   Content: ')+argv.body);
        console.log(chalk.green('   Updated Succesfully!!!....'));
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
    }
});

//D
yargs.command({
    command: 'delete',
    describe: chalk.red('Delete a Note') ,
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        const removedNote = notes.removeNotes(argv.title);
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
        if(removedNote !== undefined){
            console.log(chalk.bold('   Removed Note :-'));
            console.log(chalk.cyan('   Title: ')+removedNote.title);
            console.log(chalk.cyan('   Content: ')+removedNote.body);
        }else{
            console.log(chalk.bold('No Matching Reuslts for Title: '+ argv.title));
        }
        console.log(' ');
        console.log(chalk.inverse('**********************'));
        console.log(' ');
    }
});
yargs.parse();