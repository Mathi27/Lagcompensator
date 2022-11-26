const quize_question = [
    {
        question:"What is capacitor 1?",
        options:[ "a device","a circuit breaker","simiconductor","none of the above"]
    },
    {
        question:"What is capacitor 2?",
        options:[ "a device","a circuit breaker","simiconductor","none of the above"]
    },
    {
        question:"What is capacito r 3?",
        options:[ "a device","a circuit breaker","simiconductor","none of the above"]
    },
    {
        question:"What is capacitor 4?",
        options:[ "a device","a circuit breaker","simiconductor","none of the above"]
    },
    {
        question:"What is capacitor? 5",
        options:[ "a device","a circuit breaker","simiconductor","none of the above"]
    }
]
const quize_answer = [0,1,2,3,3]
const user_answer = new Array(5)
const invalid_answer = []
var current_question_index = 0 

// the function starts the quize
function startQuiz(event){
    console.log(event)
    let parent  = event.target.parentElement
    let sibling = event.target.nextElementSibling
    parent.removeChild(sibling)
    parent.removeChild(event.target)
    let nextButton = document.createElement('input') 
    nextButton.type ='button'
    nextButton.value = 'next'
    nextButton.onclick = nextQuestion
    let prevsButton = document.createElement('input') 
    prevsButton.type ='button'
    prevsButton.value = 'prev'
    prevsButton.onclick = prevsQuestion
    let btnContainer = document.createElement('div')
    btnContainer.appendChild(nextButton)
    btnContainer.appendChild(prevsButton)
    let questionConatiner = document.createElement('div')
    questionConatiner.id = 'questionContainer'
    questionConatiner.appendChild(createQuestion(current_question_index))
    parent.appendChild(questionConatiner)
    parent.appendChild(nextButton)
    parent.appendChild(prevsButton)
    
    
}
// this function create a question dom templete based on the index value 

function createQuestion(index){
    let containerElement = document.createElement('div')
    let questionElement   = document.createElement('h5')
    questionElement.innerHTML = `${index + 1})${quize_question[index].question}`
    let optionElement = document.createElement('div')
    quize_question[index].options.map((ele,ind)=>{
        let option  =  document.createElement('input')
        let label = document.createElement('label')
        label.htmlFor = ele 
        label.textContent = ele
        option.type = 'radio'
        option.value = ind
        option.name = 'option'
        option.id = ele
        if((user_answer[index] || user_answer[index]==0 )&& user_answer[index]==ind){ option.checked = true}
        optionElement.appendChild(option)
        optionElement.appendChild(label)
    })
    containerElement.appendChild(questionElement)
    containerElement.appendChild(optionElement)
    return containerElement
}

// to render the next question
function nextQuestion(event) {
  document.getElementsByName('option').forEach((ele,index)=>{
        if(ele.checked) user_answer[current_question_index] = index 
        })
        current_question_index
        console.log(user_answer)  
  if (current_question_index > 3){ renderResult(event.target.parentElement) ;return}
  current_question_index++;
  let questionConatiner = document.getElementById('questionContainer');
  questionConatiner.childNodes.forEach(ele=> questionConatiner.removeChild(ele))
  questionConatiner.appendChild(createQuestion(current_question_index));
}
//to render the previous question


function prevsQuestion(){
    
    let questionConatiner = document.getElementById('questionContainer');
    document.getElementsByName('option').forEach((ele,index)=>{
        if(ele.checked) user_answer[current_question_index] = index 
    })
    if (current_question_index < 1) return
    current_question_index--;
    questionConatiner.childNodes.forEach(ele=> questionConatiner.removeChild(ele))
    questionConatiner.appendChild(createQuestion(current_question_index));
}
// to reder the result of the quize
function renderResult(mainContainer){
    let parentContainer  = mainContainer.parentElement;
    let container  = document.createElement('div');
    parentContainer.removeChild(mainContainer)
    
    const result = calculateResult()
    let scoreContainer = document.createElement('div')
    scoreContainer.innerHTML = `Score ${result}/${quize_question.length}`
    let redirectButton = document.createElement('input')
    redirectButton.type = 'button'
    if(result==quize_question.length) {
     redirectButton.value = 'Next' 
     redirectButton.onclick =  renderCircute 
    }
    else{
        redirectButton.value = 'Try Again'
        redirectButton.onclick = reRenderQuestion
    }
    container.appendChild(scoreContainer)
    container.appendChild(redirectButton)
    parentContainer.appendChild(container)
    

}
// to calculate the result of the quize
function calculateResult(){
    let score = 0;
    invalid_answer.splice(0,invalid_answer.length)
    quize_answer.forEach((ele,ind)=>{if(ele == user_answer[ind]){score++}else{invalid_answer.push(ind)}})
    return score
}
// to re-render the incurrect question 
function reRenderQuestion(event){
current_question_index = 0    
let mainContainer = event.target.parentElement.parentElement
mainContainer.removeChild(event.target.parentElement)
let parent = document.createElement('div');
let nextButton = document.createElement('input') 
nextButton.type ='button'
nextButton.value = 'next'
nextButton.onclick = rnextQuestion
let prevsButton = document.createElement('input') 
prevsButton.type ='button'
prevsButton.value = 'prev'
prevsButton.onclick = rprevsQuestion
let btnContainer = document.createElement('div')
btnContainer.appendChild(nextButton)
btnContainer.appendChild(prevsButton)
let questionConatiner = document.createElement('div')
questionConatiner.id = 'questionContainer'
questionConatiner.appendChild(createQuestion(invalid_answer[current_question_index]))
parent.appendChild(questionConatiner)
parent.appendChild(nextButton)
parent.appendChild(prevsButton)
mainContainer.appendChild(parent)
}

// to go to next re-reder question 
function rnextQuestion(event) {
    document.getElementsByName('option').forEach((ele,index)=>{
          if(ele.checked) user_answer[invalid_answer[current_question_index]]= index 
          })
          current_question_index
          
    if (current_question_index > invalid_answer.length-2) renderResult(event.target.parentElement)
    current_question_index++;
    let questionConatiner = document.getElementById('questionContainer');
    questionConatiner.childNodes.forEach(ele=> questionConatiner.removeChild(ele))
    questionConatiner.appendChild(createQuestion(invalid_answer[current_question_index]));
  }
  //to go to previous re-render question
  function rprevsQuestion(){
      
      let questionConatiner = document.getElementById('questionContainer');
      document.getElementsByName('option').forEach((ele,index)=>{
          if(ele.checked) user_answer[invalid_answer[current_question_index]] = index 
      })
      if (current_question_index < 1) return
      current_question_index--;
      console.log(user_answer)
      questionConatiner.childNodes.forEach(ele=> questionConatiner.removeChild(ele))
      questionConatiner.appendChild(createQuestion(invalid_answer[current_question_index]));
  }
// this is circute rendering session 

//   function renderCircute(event){
//     let mainContainer = event.target.parentElement.parentElement.parentElement
//     mainContainer.style.display = 'none';
       
//     let elementContainer  = document.getElementById('elementContainer')
//     //add all he element inside the element container 
//     for(let i=0;i<6;i++){ 
//     elementContainer.appendChild(addCircuiteElement("filepath",i,100,100))
//      }
    
//     }

//     function addCircuiteElement(imagepath,id,width,height){
//         let element = document.createElement('img')
//         element.classList.add('container')
//         element.src = imagepath 
//         element.width = width
//         element.height = height
//         element.id = id
//         element.alt = `component - ${id}`
//         return element 
//     }
   
// selecting all the draggable event 
const draggableElement = document.querySelectorAll(".draggable");
const droppableElement = document.querySelectorAll(".droppable");
draggableElement.forEach(ele=>{
    ele.addEventListener("dragstart",dragStart);
    // ele.addEventListener("drag",drag);
    // ele.addEventListener("dragend",dragEnd);
})
droppableElement.forEach(ele=>{
    ele.addEventListener("dragenter",dragEnter);
    ele.addEventListener("dragover",dragOver);
    // ele.addEventListener("dragleave",dragLeave);
    ele.addEventListener("drop",drop);

})

//drag and drop functionality 
function dragStart(event){
   event.dataTransfer.setData("id",event.target.id)
}
function dragOver(event){
    event.preventDefault();
}
function drop(event){
    event.preventDefault();
    const draggableElementData = event.dataTransfer.getData('id');
    const droppableElementData = event.target.getAttribute("data-draggable-id");
    console.log(draggableElementData)
    if(draggableElementData == droppableElementData){
    const element = document.getElementById(draggableElementData) ;
    element.style.width = "100%"
    element.style.height = "100%"
    event.target.appendChild(element);

    }
}
function dragEnter(event){
     
}