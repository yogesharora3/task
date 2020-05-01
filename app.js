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
    form.addEventListener('submit',addTask);
    collection.addEventListener('click',removeItem);
    filter.addEventListener('keyup',handleFilter);
}
function addTask(e){
    e.preventDefault();
    if(task.value===''){
        alert("can not be empty");
        task.focus();
    }
    else{
       const list = document.createElement('li');
       list.className='collection-item';
       list.appendChild(document.createTextNode(task.value));
       const link=document.createElement('a');
       link.id="collection-link";
       link.className=" right";
       link.innerHTML="<i class=\"fa fa-times \" aria-hidden=\"true\" style=\"font-size:1.erm\"></i>"
       list.appendChild(link);
       collection.append(list);
       task.value="";
    }
}
function removeItem(e){
    if(e.target.parentElement.classList.contains("right")){
        if(confirm("you want to delete ?")){
            e.target.parentElement.parentElement.remove();
        }
    }
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