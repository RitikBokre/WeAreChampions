// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const textInputEl = document.querySelector(".text-input");
const button = document.querySelector(".btn");
const ulEl = document.querySelector(".endor-list");
const appConfig = {
    databaseURL: "https://cartlist-ae597-default-rtdb.asia-southeast1.firebasedatabase.app/",
}
const app = initializeApp(appConfig);
const database = getDatabase(app);
const location = ref(database, "Endorsements");

function renderItem(item) {
    const [itemKey, itemValue] = item;
    // ulEl.innerHTML += `<li>${itemValue}</li>`;
    const liEl = document.createElement("li");
    liEl.textContent = itemValue;
    liEl.addEventListener("dblclick", function () {
        let liLoaction = ref(database, `Endorsements/${itemKey}`);
        remove(liLoaction);
    });
    ulEl.appendChild(liEl);
}

function clearulEl() {
    ulEl.innerHTML = "";
}

onValue(location, function (snap) {
    if (snap.exists()) {
        const items = Object.entries(snap.val())
        clearulEl();
        items.forEach(item => {
            renderItem(item)
        })
    }
    else {
        ulEl.innerHTML = "No items here... yet"
    }
})

function pushEndor() {
    const text = textInputEl.value;
    if (text) {
        push(location, text);
        textInputEl.value = "";
    }
}

button.addEventListener("click", function () {
    pushEndor();
})

textInputEl.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        pushEndor();
    }
})