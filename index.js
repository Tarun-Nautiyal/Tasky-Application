

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
const htmlTaskContent = ({ id, title, decription, type, url}) => ` 
  <div class = 'col-md-6 col-lg-4 mt-3' id=${id}> 
    <div class ='card shadow p-3 task__card'>
    
      <div class ='card-header d-flex justify-content-end task__card__header'>
        <button type ='button' class='btn btn-outline-primary mr-1.5' name ='${id}>
          <i class='fa-solid fa-pencil'></i>
        </button>
        <button type = 'button' class ='btn btn-outline-secondary mr-1.5 name='${id}'>
          <i class='fa-solid fa-trash name=${id}'></i>
        </button>
      </div>
      <div class ='card-body'>
        ${
          url && 
          `<img width ='100%' src =${url} alt = 'Card Image' class='card-img-top md-3 rounded-lg'>`
        }
        <h4 class ='card-title task__card__title'>${title}</h4>
        <p class = 'description trim-3-lines text-muted'>${decription}</p>
        <div class ='tags-text-white d-flex flex-wrap'>
          <span class ='badge bg-primary m-1'>${type}</span>
        </div>
      </div>
      <div class='card-footer'>
        <button type='submit' class='btn btn-primary btn-success' dat-bs-target="#showTask>Open Task</button>
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