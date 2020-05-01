const form=document.querySelector("#task-form");
const task=document.querySelector("#task");
const btnAdd=document.querySelector(".btn-add");
const filter=document.querySelector("#filter");
const collection=document.querySelector(".collection");
const btnClear=document.querySelector(".btn-clear");

//load All event listener
// form.addEventListener('submit',addTask);
loadEventlistner();

//add event listener
function loadEventlistner(){
    //adding event on loading
    document.addEventListener("DOMContentLoaded",handleLoad)
    //add event listener
    form.addEventListener('submit',addTask);
    //removing item using event
    collection.addEventListener('click',removeItem);
    //filtering the list 
    filter.addEventListener('keyup',handleFilter);
    //clearing all the list
    btnClear.addEventListener('click',handleClear);
}
//load list on opening the web page from local storage
function handleLoad(){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const list = document.createElement('li');
       list.className='collection-item';
       list.appendChild(document.createTextNode(task));
       const link=document.createElement('a');
       link.id="collection-link";
       link.className=" right";
       link.innerHTML="<i class=\"fa fa-times \" aria-hidden=\"true\" style=\"font-size:1.erm\"></i>"
       list.appendChild(link);
       collection.append(list);
    })

}
//function which add task in the list
function addTask(e){
    e.preventDefault();
    //checking  whether the field is empty or not
    if(task.value===''){
        alert("can not be empty");
        task.focus();
    }
    else{  //adding task into the list
       const list = document.createElement('li');
       list.className='collection-item';
       list.appendChild(document.createTextNode(task.value));
       const link=document.createElement('a');
       link.id="collection-link";
       link.className=" right";
       link.innerHTML="<i class=\"fa fa-times \" aria-hidden=\"true\" style=\"font-size:1.erm\"></i>"
       list.appendChild(link);
       collection.append(list);
       //adding task into the local storage
       addToLocalStorage(task.value);
       task.value="";
    }
}
function addToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function removeItem(e){
    if(e.target.parentElement.classList.contains("right")){
        if(confirm("you want to delete ?")){
            e.target.parentElement.parentElement.remove();
            deleteFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
function deleteFromLocalStorage(e){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(val,index){
        if(val===e.textContent){
            console.log(index);
            tasks.splice(index,1);
        }
    })
    // localStorage.setItem('tasks',tasks);
    console.log(tasks);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function handleFilter(e){
    text=e.target.value.toLowerCase();
    var list=document.querySelectorAll(".collection-item");
    list.forEach(function(l1){
        // console.log(l1);
        if(l1.textContent.toLowerCase().indexOf(text)!==-1){
            l1.style.display="block";
        }
        else{
            l1.style.display="none"

        }
    })

}
function handleClear(e){
    // list=querySelectorAll('.collection-list')
   var menu= document.querySelector('.collection');
   while(menu.firstElementChild){
       menu.removeChild(menu.firstElementChild);
   }
   localStorage.clear();
}