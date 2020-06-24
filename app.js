// console.log("This App Made By Yash");
showNotes()
// if user adds a note, add it to the local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt')
    let addTitle = document.getElementById('addTitle')
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notes);
    showNotes();
})

// Function to show elements from Local Storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
                    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                         <div class="card-body">
                              <h5 class="card-title"> ${index+1}. ${element.title}</h5>
                                <p class= "card-text"> ${element.text} </p>
                                 <button id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)" >Delete Note</button>
                        </div>
                     </div>
                `
    })
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to Show! Use "Add a note" section above to add notes`
    }
}

//Fuction to delete Note

function deleteNote(index) {
    console.log("Your Note is Deleted");
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// Creating Seach Functionality

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log("input Event Fired", inputVal);

    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block"
        } else {
            element.style.display = "none"
        }
        // console.log(cardTxt);
    })
})
/* 
*** Further Features to add: ***

    1.Add title. - Done.
    2.Mark Note as Important.
    3.Seperate Notes by User.
    4.Sync and Host on Server.

*/
