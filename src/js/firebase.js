const inputValue = document.querySelector("#add-todo")
const addValue = document.querySelector("#addValue")
const allList = document.querySelector(".allLists")
const firebaseConfig = {
    apiKey: "AIzaSyBrswFJThx4wqFcO3OZ6AAxRt_0KvgDcdY",
    authDomain: "todoapp-ca32a.firebaseapp.com",
    databaseURL: "https://todoapp-ca32a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todoapp-ca32a",
    storageBucket: "todoapp-ca32a.appspot.com",
    messagingSenderId: "872947127577",
    appId: "1:872947127577:web:185bf53d2030bec0e0e188"
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)


// set(userRef,data) // Create data
const userRef = ref(db, "todo")


// Create Data
function CreateData() {
    const addInputValue = inputValue.value
    if (!addInputValue) {
        alert("Please add Value");
        return;
    } else {
        push(userRef, { list: addInputValue })
        inputValue.value = ""
    }

}
// Get value 
onValue(ref(db, "todo"), ShowAllList)

// Remove value
function removeTodoValue(id) {
    const removeItem = ref(db, "todo" + id)
    remove(removeItem)
}
remove(ref(db, "todo"), ShowAllList)
function ShowAllList(snapshot) {
    const data = convertArrayData(snapshot.val());
    allList.innerHTML = data.map((item) => {
        return `
        <li class="todo-list d-flex justify-content-between  align-items-center" >${item.list} <div class="d-flex gap-2"><button class="btn btn-success">Edit</button> <button class="btn btn-danger rmv" data-value =${item.id}>Del</button></div></li> -->

        `
    })
}
addValue.addEventListener("click", () => {
    CreateData()
})
$(document).ready(function () {
    $(".rmv").click(function () {
        const id = $(this).data().value
        removeTodoValue(id)
    });
})