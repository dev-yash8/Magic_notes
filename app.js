showNotes();
// If user adds a note, add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
})

// Funtion to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 21rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h4 class="my-3">Nothing to show. Use "Add a Note" section above to add notes.</h4>`
    }
}

// Function to delete note
function deleteNote(index) {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Function to search
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
     })
})