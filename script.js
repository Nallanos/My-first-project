
const form = document.querySelector('#form')
const ul= document.querySelector('ul')
const trash= document.querySelector('.btn-sm')
const labelCheckbox=document.querySelectorAll('.form-check-label')

const listCheckbox = document.querySelectorAll('.form-check-input')

const toutes= document.querySelector('.active')
const aFaire= document.querySelector('.aFaire')
const fait= document.querySelector('.fait')

for (let checkbox of listCheckbox){ 
    radio(checkbox)
    console.log(listCheckbox)
}

const jesuischiant=document.querySelector('#jesuischiant')
removeTrash(jesuischiant)
removeTrash(trash)


function removeTrash(trash){
trash.addEventListener('click', function(e) {
    e.preventDefault()
    trash.parentNode.remove()
})}



form.addEventListener('submit', function (e){
  e.preventDefault();
  const data = new FormData(form)
  const taskname=data.get('title')
  AddATask(taskname)
  document.getElementById('champ').value=''
});


function AddATask(a) {
    const NewLi = document.createElement('li')
    NewLi.classList.add('list-group-item', 'd-flex', 'align-items-center')
    NewLi.dataset.etat='todo'

    const NewInput = document.createElement('input')
    NewInput.classList.add('form-check-input','todo')
    NewInput.setAttribute('type','checkbox')
    NewInput.setAttribute('id','todo-1')

    const NewLabel= document.createElement('label')
    NewLabel.classList.add('ms-2','form-check-label')
    NewLabel.setAttribute('for','todo-1')

    ul.appendChild(NewLi)
    NewLi.appendChild(NewInput)
    NewLi.appendChild(NewLabel)
    NewLabel.innerHTML= a


    const Label = document.createElement('label')
    Label.classList.add('ms-auto', 'btn','btn-danger','btn-sm')
  
    const i = document.createElement('i')
    i.classList.add('bi-trash')
  
    Label.appendChild(i)
    NewLi.appendChild(Label)
  
    removeTrash(Label)
    radio(NewInput)
    filter(pageEtat)

}

let pageEtat = document.querySelector('.btn-outline-primary').dataset.filter

function radio (checkbox){
  checkbox.addEventListener('change', function (e){
    if (e.currentTarget.checked){
      e.currentTarget.parentElement.dataset.etat='done'
    }
    else{
      e.currentTarget.parentElement.dataset.etat='todo'
    }
    filter(pageEtat)
  })
}
function filter (etat){
  const todolist = document.querySelectorAll('[data-etat]')
  todolist.forEach((li)=>{
    if (etat=== 'all'){
      li.setAttribute('style', '')
    }
    else {
      if (li.dataset.etat==etat){
        li.setAttribute('style', '')
      }
      else{
        li.setAttribute('style', 'display:none!important')
      }
    }
  })
}

toutes.addEventListener('click', function (){
  pageEtat = 'all'
  console.log(pageEtat)
  filter(pageEtat)

  aFaire.classList.remove('active') 
  fait.classList.remove('active')
  toutes.classList.add('active')
})

aFaire.addEventListener('click', function (){
  pageEtat = 'todo'
  console.log(pageEtat)
  filter(pageEtat)

  aFaire.classList.add('active') 
  fait.classList.remove('active')
  toutes.classList.remove('active')
})

fait.addEventListener('click', function (){
  pageEtat = 'done'
  console.log(pageEtat)
  filter(pageEtat)

  aFaire.classList.remove('active') 
  fait.classList.add('active')
  toutes.classList.remove('active')
})

