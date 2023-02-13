const form = document.querySelector('#form')
const ul = document.querySelector('ul')
const trash = document.querySelector('.btn-sm')
const labelCheckbox = document.querySelectorAll('.form-check-label')
const listCheckbox = document.querySelectorAll('.form-check-input')
const toutes = document.querySelector('.active')
const aFaire = document.querySelector('.aFaire')
const fait = document.querySelector('.fait')
const jesuischiant = document.querySelector('#jesuischiant')
let pageEtat = document.querySelector('.btn-outline-primary').dataset.filter

let todocount = 0
let info = []


function filter(etat) {
  const todolist = document.querySelectorAll('[data-etat]')
  todolist.forEach((li) => {
    if (etat === 'all') {
      li.setAttribute('style', '')
    }
    else {
      if (li.dataset.etat == etat) {
        li.setAttribute('style', '')
      }
      else {
        li.setAttribute('style', 'display:none!important')
      }
    }
  })
}

function removeTrash(trash) {
  trash.addEventListener('click', function (e) {
    e.preventDefault()
    trash.parentNode.remove()
  })
}

function radio(checkbox) {
  checkbox.addEventListener('change', function (e) {
    if (e.currentTarget.checked) {
      e.currentTarget.parentElement.dataset.etat = 'done'
    }
    else {
      e.currentTarget.parentElement.dataset.etat = 'todo'
    }
    filter(pageEtat)
  })
}
function AddATask(a) {
  todocount++
  const todoID = 'todo-' + todocount;
  const NewLi = document.createElement('li')
  NewLi.classList.add('list-group-item', 'd-flex', 'align-items-center')
  NewLi.dataset.etat = 'todo'
  NewLi.draggable = true;
  NewLi.id = todoID
  const NewInput = document.createElement('input')
  NewInput.classList.add('form-check-input', 'todo')
  NewInput.setAttribute('type', 'checkbox')
  NewInput.id = todoID

  const NewLabel = document.createElement('label')
  NewLabel.classList.add('ms-2', 'form-check-label')
  NewLabel.setAttribute('for', 'todo-' + todocount)


  NewLi.appendChild(NewInput)
  NewLi.appendChild(NewLabel)
  NewLabel.innerHTML = a
  const Label = document.createElement('label')
  Label.classList.add('ms-auto', 'btn', 'btn-danger', 'btn-sm')


  const i = document.createElement('i')
  i.classList.add('bi-trash')

  NewLi.ondragstart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
  }
  NewLi.ondragover = (e) => {
    e.preventDefault()
    ///
  }
  NewLi.ondrop = (e) => {
    //check if the drop is on the same list
    // console.log(e.dataTransfer.getData('text/plain'));
    if (e.target.id === e.dataTransfer.getData('text/plain')) {
      return
    }
    //move the element if we are moving it into a LI
    if (e.target.tagName === 'LI') {
      const elementSource = document.getElementById(e.dataTransfer.getData('text/plain'))
      const elementDestination = e.target;

      const rect = elementDestination.getBoundingClientRect();
      const position = e.clientY - rect.top;
      if (position <= rect.height / 2) {
        elementDestination.parentNode.insertBefore(elementSource, elementDestination);
      } else {
        elementDestination.parentNode.insertBefore(elementSource, elementDestination.nextSibling);
      }

    }
  }

  Label.appendChild(i)
  NewLi.appendChild(Label)
  ul.appendChild(NewLi)
  removeTrash(Label)
  radio(NewInput)
  filter(pageEtat)
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(form)
  const taskname = data.get('title')
  AddATask(taskname)
  document.getElementById('champ').value = ''
});

toutes.addEventListener('click', function () {
  pageEtat = 'all'
  filter(pageEtat)

  aFaire.classList.remove('active')
  fait.classList.remove('active')
  toutes.classList.add('active')
})

aFaire.addEventListener('click', function () {
  pageEtat = 'todo'
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

for (let checkbox of listCheckbox) {
  radio(checkbox)
}


// removeTrash(jesuischiant)
// removeTrash(trash)
