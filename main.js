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
        if(user_answer[index] && user_answer[index]==ind) option.checked = true
        optionElement.appendChild(option)
        optionElement.appendChild(label)
    })
    containerElement.appendChild(questionElement)
    containerElement.appendChild(optionElement)
    return containerElement
}
function nextQuestion() {
  document.getElementsByName('option').forEach((ele,index)=>{
        if(ele.checked) user_answer[current_question_index] = index 
        })
        current_question_index
        console.log(user_answer)  
  if (current_question_index > 3) return
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
    console.log(user_answer)
    questionConatiner.childNodes.forEach(ele=> questionConatiner.removeChild(ele))
    questionConatiner.appendChild(createQuestion(current_question_index));
}