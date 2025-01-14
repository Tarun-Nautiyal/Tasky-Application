const myModal = document.getElementById('staticBackdrop')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

const submit = document.getElementById('submit')
document.getElementById(submit).innerHTML = new myModal