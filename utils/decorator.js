// декоратор

class ConsoleDecorator {
    static drawLine(lines, format){
        if(format === 1){
            console.log(`-`.repeat(lines));
        }
        else if(format === 2){
            console.log(`+`.repeat(lines));
        }   
        else if(format === 3){
            console.log(`_`.repeat(lines));
        }            
        else{
            console.log(`=`.repeat(lines))
        }
    }

    static showAllFormatNotes(notes){
        notes.forEach((note) => this.showFormatNote(note));
    }

    static showFormatNote(note){
        this.drawLine(30, 1);
        console.log(`\n[${note.id}]`);
        console.log(`\n[${note.title}]`);
        this.drawLine(30, 1);
        console.log(`\n[${note.content}]`);
        this.drawLine(30, 1);
        console.log(`\n[${note.date}]`);
    }
}

module.exports = ConsoleDecorator;