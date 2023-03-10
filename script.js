const form = document.querySelector('#form')
let todocount=0
const ul= document.querySelector('.list-group')
const fait = document.querySelector('.fait')
const aFaire= document.querySelector(".aFaire")
const toutes= document.querySelector('.Toutes')
let pageEtat='all'
let task = []
console.log(task)

function removeTrash(trash) {
  todocount--
  trash.addEventListener('click', function (e) {
    e.preventDefault()
    trash.parentNode.remove()
    task.splice(todocount,1)
    console.log(todocount)
  console.log(task)
  console.log(todocount)
  })
}

function createATask (taskname){
  console.log(todocount)
  let todoID= 'todo-'+ todocount
  const NewLi = document.createElement('li')
  NewLi.classList.add('list-group-item', 'd-flex', 'align-items-center')
  NewLi.dataset.etat = 'todo'
  NewLi.draggable = true;

  const NewInput = document.createElement('input')
  NewInput.classList.add('form-check-input', 'todo')
  NewInput.setAttribute('type', 'checkbox')

  const NewLabel = document.createElement('label')
  NewLabel.classList.add('ms-2', 'form-check-label')
  NewLabel.setAttribute('for', 'todo-' + todocount)
  NewLabel.innerHTML = taskname

  NewLabel.appendChild(NewInput)

  const Label = document.createElement('label')
  Label.classList.add('ms-auto', 'btn', 'btn-danger', 'btn-sm')
  const i = document.createElement('i')
  i.classList.add('bi-trash')

  Label.appendChild(i)
  NewLi.appendChild(NewInput)
  NewLi.appendChild(NewLabel)
  NewLi.appendChild(Label)  

  NewLi.ondragstart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
  }
  NewLi.ondragover = (e) => {
    e.preventDefault()
  }
    
  task.push({
    etat: false,
    name: taskname,
    htmlcontent: NewLi.outerHTML,
    todoID: todoID
  })
  removeTrash(Label)
  radio(NewInput)
  ul.appendChild(NewLi)
  console.log(task)
  todocount++
  filter(pageEtat)
  console.log(todocount)
}

form.addEventListener('submit', (e)=>{
  e.preventDefault()
  const data = new FormData(form); 
  document.getElementById('champ').value = ''; 
  var taskname = data.get('title'); 

createATask(taskname)
})

toutes.addEventListener('click', function () {
  pageEtat = 'all'
  console.log(pageEtat)
  filter(pageEtat)

  aFaire.classList.remove('active')
  fait.classList.remove('active')
  toutes.classList.add('active')
})

aFaire.addEventListener('click', function () {
  pageEtat = 'todo'
  console.log(pageEtat)
  filter(pageEtat)

  aFaire.classList.add('active')
  fait.classList.remove('active')
  toutes.classList.remove('active')
})

fait.addEventListener('click', function () {
  pageEtat = 'done'
  filter(pageEtat)
  aFaire.classList.remove('active')
  fait.classList.add('active')
  toutes.classList.remove('active')
})

function filter(etat) {
  const ul = document.querySelectorAll('[data-etat]')
  ul.forEach((li) => {
    if (etat === 'all') {
      li.setAttribute('style', '')
    }
    else {
      console.log(etat)
      if (li.dataset.etat == etat) {
        li.setAttribute('style', '')
      }
      else {
        li.setAttribute('style', 'display:none!important')
      }
    }
  })
}

function radio(checkbox) {
  checkbox.addEventListener('change', function (e) {
    const parentLi = e.currentTarget.parentElement;
    const taskIndex = task.findIndex(task => task.todoID === parentLi.id);
    if (e.currentTarget.checked) {
      parentLi.dataset.etat = 'done';
      task[taskIndex].etat = true;
      console.log(task);
    } else {
      parentLi.dataset.etat = 'todo';
      task[taskIndex].etat = false;
      console.log(task);
    }
    filter(pageEtat);
  });
}


