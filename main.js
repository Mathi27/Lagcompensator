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
function calculateResult(){
    let score = 0;
    invalid_answer.splice(0,invalid_answer.length)
    quize_answer.forEach((ele,ind)=>{if(ele == user_answer[ind]){score++}else{invalid_answer.push(ind)}})
    return score
}
function renderCircute(event){
let mainContainer = event.target.parentElement.parentElement.parentElement
mainContainer.removeChild(event.target.parentElement.parentElement)
let circuitContainer = document.createElement('div')
circuitContainer.innerHTML = `This is circuit page`
mainContainer.appendChild(circuitContainer)    
}
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
