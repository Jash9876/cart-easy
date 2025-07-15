import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://cartease-af9f7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const deleteAllIcon = document.getElementById("delete-all-icon");

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const errorEl = document.getElementById("error-msg");
let hasInteracted = false;
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", () => {
    hasInteracted = true;
    const inputValue = inputFieldEl.value;
    const trimmedValue = inputValue.trim();
    const isValid = /[a-zA-Z0-9]/.test(trimmedValue);

    if (!isValid) {
        errorEl.textContent = "Please enter your item.";
        errorEl.classList.add("show");
        return;
    }

    errorEl.textContent = "";
    errorEl.classList.remove("show")
    push(shoppingListInDB, trimmedValue);
    clearInputFieldEl();
});

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            appendItemToShoppingListEl(currentItem)
        }    
    }  else {
        if (hasInteracted) {
        shoppingListEl.innerHTML = `<li style="color: gray; font-style: italic; background: none; box-shadow: none; cursor: default;">No items are here.....yet</li>`;
        } else {
        shoppingListEl.innerHTML = "";
        }
    }
    }
)

deleteAllIcon.addEventListener("click", () => {
  onValue(shoppingListInDB, (snapshot) => {
    if (snapshot.exists()) {
      remove(shoppingListInDB);
    } else {
      errorEl.textContent = "Add something to remove.";
      setTimeout(() => {
        errorEl.textContent = "";
      }, 2000);
    }
  }, { onlyOnce: true });
});


function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log("✅ Service Worker registered"))
    .catch((err) => console.error("❌ Service Worker error:", err));
}
