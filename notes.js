const fs = require('fs');
const file="D:/Nodejs/playground/dummy.json";

const getNote = title => {
    const notes = loadNotes();
    const noteSize = notes.length;
    let index = undefined;
    let note = undefined;
    iter: for(let i=0;i<noteSize;i++){
        if(title === notes[i].title){
            index = i;
            note = notes[index];
            break iter;
        }
    }
    return {"note":note,"index": index,"notes":notes}
}

const addNote = (title,body) => {
    const availablenote = getNote(title);
    const notes = availablenote.notes;
    const newNote = availablenote.note === undefined ? true : false;
    const index = availablenote.index;
    if(newNote){
        notes.push({
            "title": title,
            "body": body
        });
        saveNotes(notes);
    }else{
        updateNote(title,body,index);
    }
    return newNote ? 'Added' : 'Updated';
}

const updateNote = (title,body,index) => {
    let notes;
    if(index != undefined){
        notes = loadNotes();
        if(notes[index].title === title){
            notes[index].body = body;
            saveNotes(notes);
            return;
        }
    }else{

        const availablenote = getNote(title);
        notes = availablenote.notes;
        const note =  availablenote.note;
        const noteIndex = availablenote.index;
        note.body = body;
        notes[noteIndex] = note;
        saveNotes(notes);
    }
}

const removeNotes = title =>{
    const availablenote = getNote(title);
    const index = availablenote.index;
    const notes = availablenote.notes;
    if(index !== undefined){
        notes.splice(index,1);
        saveNotes(notes);
    }
    return availablenote.note;
}

const saveNotes = notes => {
    fs.writeFileSync(file,JSON.stringify(notes));
}

const loadNotes = () => {
    try{
        debugger;
        return JSON.parse(fs.readFileSync(file).toString());
    }
    catch(e){
        return [];
    }
}

module.exports = {
    "addNote" : addNote,
    "updateNote" : updateNote,
    "getNote" : getNote,
    "loadNotes" : loadNotes,
    "removeNotes" : removeNotes
};
