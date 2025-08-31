

const state = {

  taskLists:[],


};

const taskcontents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// Template for the card on screen 
// writing html content within backtics
// mapping id with through template literals
// header starting from left so we wrote flex and justify content end
// how write js content within html ? -> Just use ${}
// on my UI is if the task description exceeds 3 lines just trim it we dont wont more than
const htmlTaskContent = ({ id, title, description, type, url}) => ` 
  <div class = 'col-md-6 col-lg-4 mt-3' id=${id}> 
    <div class ='card shadow p-3 task__card'>
    
      <div class ='card-header d-flex justify-content-end task__card__header'>
        <button type ='button' class='btn btn-outline-primary mr-1.5' name ='${id}' onClick = 'editTask.apply(this,arguments)'>
          <i class='fa-solid fa-check'name = '${id}'></i>
        </button>
        <button type = 'button' class ='btn btn-outline-secondary mr-1.5 name='${id}' onClick ='deleteTask.apply(this,arguments)'>
          <i class='fa-solid fa-trash name='${id}' ></i>
        </button>
      </div>
      <div class ='card-body'>
        ${
          url && 
          `<img width ='100%' src =${url} alt = 'Card Image' class='card-img-top md-3 rounded-lg'>`
        }
        <h4 class ='card-title task__card__title'>${title}</h4>
        <p class = 'description trim-3-lines text-muted'>${description}</p>
        <div class ='tags-text-white d-flex flex-wrap'>
          <span class ='badge bg-primary m-1'>${type}</span>
        </div>
      </div>
      <div class='card-footer'>
        <button type='submit' class='btn btn-primary btn-success' data-bs-toggle = "modal" data-bs-target ="#openTask" onclick="openTask.apply(this,arguments)" id=${id}>Open Task</button>
      </div>
    </div>
  <div>
`;                      


// Modal body on click of open task
const htmlModalContent =({id,title,description,url})=>{
  const date = new Date(parseInt(id));
  return`
  <div id = ${id}>
    ${
      url && 
      `<img width ='100%' src =${url} alt = 'Card Image' class='img-fluid place__holder__image mb-3'>`
    }
    <strong class='text-muted text-sm'>Create on: ${date.toDateString()}</strong>
    <h2 class ='my-3'>${title}<h2>
    <p class='text-muted'>${description}</p>
    
      
  </div>
  `;
}
// Here we convert JSON to string for local storage
const updateLocalStorage = () => {
  localStorage.setItem(
    "tasky",
    JSON.stringify({
      tasks: state.taskLists,
    })
  );
};
 

// Load initial data 
// Here we convert string to JSON for rendering cards on the screen
const LoadInitialData = ()=>{
  if(!localStorage.tasks) return;
  const localStorageCopy = JSON.parse(localStorage.tasks);
  if(localStorageCopy) state.taskLists = localStorageCopy.tasks;
  state.taskLists.map((cardDate)=>{
    taskcontents.insertAdjacentHTML("beforeend",htmlModalContent(cardDate))
  })


  
}

const handleSubmit = (event) => {
 
  const id =`${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };
  if(input.title ==="" || input.type ===""||input.description===""){
    return alert("Please Fill all the input fields");
  }
  taskcontents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({...input,id})
  );
state.taskLists.push({...input,id});
updateLocalStorage();
};


// open Task
const openTask =(e) =>{
  //if(!e) e = window.event; // This line is just an old compatibility hack for Internet Explorer. You don’t need it today.Now automatically passed to the event handler 
  const getTask = state.taskLists.find(({id}) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask)
}
const deleteTask =(e)=>{
  //if(!e) e = window.event;
  const targetId = e.target.getAttribute("name");
  //console.log(targetId);
  
  const type = e.target.tagName; // console.log(type);
  const  removeTask = state.taskLists.filter(({id}) => id!== targetId);
  updateLocalStorage();

  if(type ==="BUTTON"){ // this is chaining we go above and abbove till we get out of the div element so that the card gets removed 
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
  }
}

const editTask = (e) => {
  const targetId = e.target.getAttribute("name");
  //console.log(targetId);
  const card = document.getElementById(targetId);

  if (!card) return;

  // Find elements inside the card
  const titleElem = card.querySelector(".task__card__title");
  const descElem = card.querySelector(".description");
  const typeElem = card.querySelector(".badge");

  // Make fields editable
  titleElem.setAttribute("contenteditable", "true");
  descElem.setAttribute("contenteditable", "true");
  typeElem.setAttribute("contenteditable", "true");

  // Optionally, focus the title for better UX
  titleElem.focus();

  // Add a save button if not already present
  if (!card.querySelector(".save-btn")) {
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-success save-btn mt-2";
    saveBtn.innerText = "Save";
    saveBtn.onclick = function () {
      // Update state
      const taskIndex = state.taskLists.findIndex(({ id }) => id === targetId);
      if (taskIndex > -1) {
        state.taskLists[taskIndex].title = titleElem.innerText;
        state.taskLists[taskIndex].description = descElem.innerText;
        state.taskLists[taskIndex].type = typeElem.innerText;
        updateLocalStorage();
      }
      // Make fields non-editable
      titleElem.setAttribute("contenteditable", "false");
      descElem.setAttribute("contenteditable", "false");
      typeElem.setAttribute("contenteditable", "false");
      saveBtn.remove();
    };
    card.querySelector(".card-body").appendChild(saveBtn);
  }
};

// Search for a task by title and display it in the modal
// Search for tasks by title and filter the display
function searchTaskByTitle() {
    const inputEl = document.getElementById("breakpoint");
    if (!inputEl) {
        alert("Search input field not found");
        return;
    }

    const inputVal = inputEl.value.trim().toLowerCase();
    
    // Filter tasks that match the search
    const filteredTasks = state.taskLists.filter(item => 
        item.title.toLowerCase().includes(inputVal)
    );

    // Clear the current display
    taskcontents.innerHTML = '';
    
    // Show filtered results or message
    if (filteredTasks.length > 0) {
        filteredTasks.forEach(task => {
            taskcontents.insertAdjacentHTML("beforeend", htmlTaskContent(task));
        });
    } else {
        taskcontents.innerHTML = `
            <div class="col-12 text-center mt-5">
                <h4 class="text-muted">No tasks found matching "${inputVal}"</h4>
                <p class="text-muted">Try a different search term</p>
            </div>
        `;
    }
}

