
const quize_question = [
    {
        question: "The capacitor in lag compensator is connected in ____  with resistor ?",
        options: ["Parallel", "Perpendicular", "Open", "Series"]
    },
    {
        question: "The Phase Lag provided by the lag compensator at Low Frequency lowers the _____?",
        options: ["Magnitude", "Current", "Harmonics", "Steady State Error"]
    },
    {
        question: "The Poles and Zeros in the Graph ______?",
        options: ["Parallel Axis", "Positive Real Axis", "Zero Real Axis", "Negative Real Axis"]
    },
    {
        question: "In Lag Compensator the phase is always?",
        options: ["Negative", "Positive", "Zero", "Infinity"]
    },
    {
        question: "Lag Compensator is always _____ an Unstable System?",
        options: ["Increases", "Settling", "Stabilizes", "Decreases"]
    }
]
const quize_answer = [3, 3, 3, 0, 2]
const user_answer = new Array(5)
const invalid_answer = []
var current_question_index = 0
const circuitObject = {}
const records = new Map();

//to move to quize page
function startTheQuize() {
    document.getElementById("block-1").classList.add("display-off")
    document.getElementById("block-2").classList.remove("display-off");
}
// the function starts the quize
function startQuiz(event) {
    console.log(event)
    let parent = event.target.parentElement
    let sibling = event.target.nextElementSibling
    parent.removeChild(sibling)
    parent.removeChild(event.target)
    let nextButton = document.createElement('input')
    nextButton.type = 'button'
    nextButton.value = 'next'
    nextButton.onclick = nextQuestion
    let prevsButton = document.createElement('input')
    prevsButton.type = 'button'
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

function createQuestion(index) {
    let containerElement = document.createElement('div')
    let questionElement = document.createElement('h5')
    questionElement.innerHTML = `${index + 1})${quize_question[index].question}`
    let optionElement = document.createElement('div')
    quize_question[index].options.map((ele, ind) => {
        let option = document.createElement('input')
        let label = document.createElement('label')
        label.htmlFor = ele
        label.textContent = ele
        option.type = 'radio'
        option.value = ind
        option.name = 'option'
        option.id = ele
        if ((user_answer[index] || user_answer[index] == 0) && user_answer[index] == ind) { option.checked = true }
        optionElement.appendChild(option)
        optionElement.appendChild(label)
    })
    containerElement.appendChild(questionElement)
    containerElement.appendChild(optionElement)
    return containerElement
}

// to render the next question
function nextQuestion(event) {
    document.getElementsByName('option').forEach((ele, index) => {
        if (ele.checked) user_answer[current_question_index] = index
    })
    current_question_index
    console.log(user_answer)
    if (current_question_index > 3) { renderResult(event.target.parentElement); return }
    current_question_index++;
    let questionConatiner = document.getElementById('questionContainer');
    questionConatiner.childNodes.forEach(ele => questionConatiner.removeChild(ele))
    questionConatiner.appendChild(createQuestion(current_question_index));
}
//to render the previous question


function prevsQuestion() {

    let questionConatiner = document.getElementById('questionContainer');
    document.getElementsByName('option').forEach((ele, index) => {
        if (ele.checked) user_answer[current_question_index] = index
    })
    if (current_question_index < 1) return
    current_question_index--;
    questionConatiner.childNodes.forEach(ele => questionConatiner.removeChild(ele))
    questionConatiner.appendChild(createQuestion(current_question_index));
}
// to reder the result of the quize
function renderResult(mainContainer) {

    let parentContainer = mainContainer.parentElement;
    console.log(parentContainer);
    let container = document.createElement('div');
    parentContainer.removeChild(mainContainer)

    const result = calculateResult()
    let scoreContainer = document.createElement('div')
    scoreContainer.innerHTML = `Score ${result}/${quize_question.length}`
    let redirectButton = document.createElement('input')
    redirectButton.type = 'button'
    if (result == quize_question.length) {
        redirectButton.value = 'Next'
        redirectButton.onclick = renderCircuit
    }
    else {
        redirectButton.value = 'Try Again'
        redirectButton.onclick = reRenderQuestion
    }
    container.appendChild(scoreContainer)
    container.appendChild(redirectButton)
    parentContainer.appendChild(container)


}
// to calculate the result of the quize
function calculateResult() {
    let score = 0;
    invalid_answer.splice(0, invalid_answer.length)
    quize_answer.forEach((ele, ind) => { if (ele == user_answer[ind]) { score++ } else { invalid_answer.push(ind) } })
    return score
}
// to re-render the incurrect question 
function reRenderQuestion(event) {
    current_question_index = 0
    let mainContainer = event.target.parentElement.parentElement
    mainContainer.removeChild(event.target.parentElement)
    let parent = document.createElement('div');
    let nextButton = document.createElement('input')
    nextButton.type = 'button'
    nextButton.value = 'next'
    nextButton.onclick = rnextQuestion
    let prevsButton = document.createElement('input')
    prevsButton.type = 'button'
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
    document.getElementsByName('option').forEach((ele, index) => {
        if (ele.checked) user_answer[invalid_answer[current_question_index]] = index
    })
    current_question_index

    if (current_question_index > invalid_answer.length - 2) renderResult(event.target.parentElement)
    current_question_index++;
    let questionConatiner = document.getElementById('questionContainer');
    questionConatiner.childNodes.forEach(ele => questionConatiner.removeChild(ele))
    questionConatiner.appendChild(createQuestion(invalid_answer[current_question_index]));
}
//to go to previous re-render question
function rprevsQuestion() {

    let questionConatiner = document.getElementById('questionContainer');
    document.getElementsByName('option').forEach((ele, index) => {
        if (ele.checked) user_answer[invalid_answer[current_question_index]] = index
    })
    if (current_question_index < 1) return
    current_question_index--;
    console.log(user_answer)
    questionConatiner.childNodes.forEach(ele => questionConatiner.removeChild(ele))
    questionConatiner.appendChild(createQuestion(invalid_answer[current_question_index]));
}


//this is no render the circuit
function renderCircuit() {
    document.getElementById("block-2").classList.add("display-off");
    document.getElementById("block-3").classList.remove("display-off");
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
draggableElement.forEach(ele => {
    ele.addEventListener("dragstart", dragStart);
    // ele.addEventListener("drag",drag);
    // ele.addEventListener("dragend",dragEnd);
})
droppableElement.forEach(ele => {
    ele.addEventListener("dragenter", dragEnter);
    ele.addEventListener("dragover", dragOver);
    // ele.addEventListener("dragleave",dragLeave);
    ele.addEventListener("drop", drop);

})

//drag and drop functionality 
function dragStart(event) {
    event.dataTransfer.setData("id", event.target.id)
}
function dragOver(event) {
    event.preventDefault();
}
function dragEnter(event) { }
function drop(event) {
    event.preventDefault();
    const draggableElementData = event.dataTransfer.getData('id');
    const droppableElementData = event.target.getAttribute("data-draggable-id");
    if (draggableElementData == droppableElementData) {
        const element = document.getElementById(draggableElementData);
        element.style.width = "100%"
        element.style.height = "100%"
        event.target.appendChild(element);
        circuitObject[droppableElementData] = true

    }

    if (Object.keys(circuitObject).length == 5) {
        const circuitConnectionbtn = document.getElementById("checkConnection")
        circuitConnectionbtn.disabled = false

    }
}

//check connectin function 
function checkConnection() {
    document.getElementById("header1").style.display = "none";
    const inputField = document.getElementById("header2")
    inputField.classList.add("circuit-header")
    inputField.style.display = "block";
    const draggableContainer = document.getElementById("draggable-elements")
    draggableContainer.style.display = "none";
    document.getElementById("check-connection").style.display = "none";
    document.getElementById("record-result").style.display = "block";
}
//function to record the result 
function frequencyOnChange() {
    const voltage = Number(document.getElementById("voltage").value);
    const frequency = Number(document.getElementById("frequency").value);
    //base case 
    const value = generateResult(frequency)
    document.getElementById("output-a").innerHTML = `a: ${value.a}`
    document.getElementById("output-b").innerHTML = `b: ${value.b}`
    document.getElementById("output-v").innerHTML = `c: ${value.v}`
}
function recordTheResult() {
    const voltage = Number(document.getElementById("voltage").value);
    const frequency = Number(document.getElementById("frequency").value);
    //base case 
    if (records.has(frequency)) return alert("the frequency is already recorded")
    const value = generateResult(frequency)
    records.set(frequency, value)
    if (records.size == 10) {
        document.getElementById("result-btn").disabled = false
        return
    }
}
//function to generate result 
function generateResult(frequency) {
    if (frequency <= 100) return { vin: 2, f: frequency, a: 2, b: 0.2, v: 2 }
    if (frequency > 100 && frequency <= 200) return { vin: 2, f: frequency, a: 2, b: 0.3, v: 2 }
    if (frequency > 200 && frequency <= 400) return { vin: 2, f: frequency, a: 1.8, b: 0.6, v: 1.8 }
    if (frequency > 400 && frequency <= 600) return { vin: 2, f: frequency, a: 1.6, b: 0.5, v: 1.6 }
    if (frequency > 600 && frequency <= 800) return { vin: 2, f: frequency, a: 1.4, b: 0.4, v: 1.4 }
    if (frequency > 800 && frequency <= 1000) return { vin: 2, f: frequency, a: 1.2, b: 0.2, v: 1.2 }
}
// function to map the a,b,Vo value 
function getRecordValue() {
    document.getElementById("block-3").style.display = "none";
    document.getElementById("block-4").style.display = "block";
    const graph1 = document.getElementById("graph1");
    const graph2 = document.getElementById("graph2");
    let label = []
    let dataset1 = []
    let dataset2 = []
    const tableBody = document.getElementById("table-body");
    for (let i = 100; i <= 1000; i += 100) {
        let row = document.createElement('tr')
        let object = records.get(i)
        label.push(i)
        dataset1.push(Number((20 * Math.log10(object.v / object.vin)).toFixed(2)))
        dataset2.push(Number(Math.asin(object.b / object.a).toFixed(2)))
        Object.keys(object).forEach(ele => {
            let value = document.createElement('td');
            value.textContent = object[ele]
            row.appendChild(value)
        })
        tableBody.appendChild(row)

    }

    console.log(dataset1, dataset2, label)
    new Chart(graph1, {
        type: "line",
        data: {
            labels: label,
            datasets: [{
                label: 'phase/frequency',
                data: dataset1,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
        // options: {
        //     responsive: true,
        //     maintainAspectRatio: false,
        // }
    })
    new Chart(graph2, {
        type: "line",
        data: {
            labels: label,
            datasets: [{
                label: 'theta/frequency',
                data: dataset2,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
        // options: {
        //     responsive: true,
        //     maintainAspectRatio: false,
        // }
    })
}
//to go to privious circuit page
function gotoprevious() {
    document.getElementById("block-4").classList.add("display-off");
    document.getElementById("block-3").classList.remove("display-off");

}
// to download the result as pdf
function downloadResult() {
    alert("the expriment completed successfully and the download will begin soon...")
    const element = document.getElementById('block-4');
    html2pdf().from(element).save()
}