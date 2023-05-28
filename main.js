const quize_question = [
  {
    question:
      "The capacitor in lag compensator is connected in ____  with resistor ?",
    options: ["Parallel", "Perpendicular", "Open", "Series"],
  },
  {
    question:
      "The Phase Lag provided by the lag compensator at Low Frequency lowers the _____?",
    options: ["Magnitude", "Current", "Harmonics", "Steady State Error"],
  },
  {
    question: "The Poles and Zeros in the Graph ______?",
    options: [
      "Parallel Axis",
      "Positive Real Axis",
      "Zero Real Axis",
      "Negative Real Axis",
    ],
  },
  {
    question: "In Lag Compensator the phase is always?",
    options: ["Negative", "Positive", "Zero", "Infinity"],
  },
  {
    question: "Lag Compensator is always _____ an Unstable System?",
    options: ["Increases", "Settling", "Stabilizes", "Decreases"],
  },
];

///  staet quize -> 2 questuion(only after correct) -> circuit (correct) -> 2 question -> reading -> 1 question(crt) -> end
const quize_answer = [3, 3, 3, 0, 2];
const user_answer = new Array(5);

var current_question_index = 0;
const circuitObject = {};
const records = new Map();

// //to move to quize page
function switchDisplay(id1, id2) {
  document.getElementById(id1).classList.add("display-off");
  document.getElementById(id2).classList.remove("display-off");
}
function startQuiz(event) {
  const questionObj = new RenderQuestions([0, 1], "block-3", "block-4");
  document.getElementById("btn1").onclick =
    questionObj.prevQuestion.bind(questionObj);
  document.getElementById("btn2").onclick =
    questionObj.nextQuestion.bind(questionObj);
  document.getElementById("btn3").onclick =
    questionObj.submit.bind(questionObj);
  switchDisplay("block-2", "block-3");
}

class RenderQuestions {
  constructor(question, currentBlock, nextBlock, callback) {
    this.index = 0;
    this.question = question;
    this.nextBlock = nextBlock;
    this.currentBlock = currentBlock;
    this.selectedAnswer = {};
    this.invalid = [];
    this.callback = callback;
    this.renderQuestions();
  }
  renderQuestions() {
    questionRenderer(
      this.question[this.index],
      this.selectedAnswer[this.index]
    );
    buttonDisplayController(0, this.question.length, this.index);
  }
  nextQuestion() {
    if (this.checkAnswer()) this.index++;
    this.renderQuestions();
  }
  prevQuestion() {
    if (this.checkAnswer()) this.index--;
    this.renderQuestions();
  }
  checkAnswer() {
    const answer = document.getElementsByName("answer");
    answer.forEach((option, index) => {
      if (option.checked) {
        if (index !== quize_answer[this.question[this.index]]) {
          this.invalid.push(this.question[this.index]);
        }
        this.selectedAnswer[this.index] = index;
      }
    });
    if (!this.selectedAnswer[this.index]) {
      alert("select an option");
      return false;
    }
    return true;
  }
  submit() {
    this.checkAnswer();

    if (this.invalid.length === 0) {
      switchDisplay(this.currentBlock, this.nextBlock);
      console.log("this is the current path ");
      if (this.callback) this.callback();
      return;
    } else {
      this.index = 0;
      this.question = this.invalid;
      this.invalid = [];
      this.renderQuestions();
    }
  }
}

function questionRenderer(questionIndex, exisitingValue) {
  let index = 0;

  document.getElementById("question").innerHTML =
    (questionIndex + 1).toString() +
    ") " +
    quize_question[questionIndex].question;
  document.getElementById("option").childNodes.forEach((element) => {
    if (element.nodeType === 1) {
      if ((exisitingValue || exisitingValue === 0) && exisitingValue === index)
        element.childNodes[0].checked = true;
      element.childNodes[1].data =
        quize_question[questionIndex].options[index++];
    }
  });
}
function buttonDisplayController(startRange, endRange, questionIndex) {
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");
  btn3.disabled = true;
  btn1.disabled = false;
  btn2.disabled = false;
  if (questionIndex + 1 >= endRange) {
    btn2.disabled = true;
    btn3.disabled = false;
  }
  if (questionIndex - 1 < startRange) btn1.disabled = true;
}

// selecting all the draggable event
const draggableElement = document.querySelectorAll(".draggable");
const droppableElement = document.querySelectorAll(".droppable");
draggableElement.forEach((ele) => {
  ele.addEventListener("dragstart", dragStart);
  // ele.addEventListener("drag",drag);
  // ele.addEventListener("dragend",dragEnd);
});
droppableElement.forEach((ele) => {
  ele.addEventListener("dragenter", dragEnter);
  ele.addEventListener("dragover", dragOver);
  // ele.addEventListener("dragleave",dragLeave);
  ele.addEventListener("drop", drop);
});

// //drag and drop functionality
function dragStart(event) {
  event.dataTransfer.setData("id", event.target.id);
}
function dragOver(event) {
  event.preventDefault();
}
function dragEnter(event) {}
function drop(event) {
  event.preventDefault();
  const draggableElementData = event.dataTransfer.getData("id");
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  if (draggableElementData == droppableElementData) {
    const element = document.getElementById(draggableElementData);
    element.style.width = "100%";
    element.style.height = "100%";
    event.target.appendChild(element);
    circuitObject[droppableElementData] = true;
  }

  if (Object.keys(circuitObject).length == 5) {
    const circuitConnectionbtn = document.getElementById("checkConnection");
    circuitConnectionbtn.disabled = false;
  }
}

// //check connectin function
function checkConnection() {
  console.log("working");
  switchDisplay("block-4", "block-3");
  const cb = () => {
    document.getElementById("check-connection").style.display = "none";
    document.getElementById("circuit-page").style.gridTemplateRows =
      "0fr 8fr 13fr";
    document.getElementById("header1").style.display = "none";
    const inputField = document.getElementById("header2");
    // inputField.classList.add("circuit-header")
    inputField.style.display = "block";
    const draggableContainer = document.getElementById("draggable-elements");
    draggableContainer.style.display = "none";
    document.getElementById("record-result").style.display = "block";
  };
  const questionObj = new RenderQuestions([2, 3], "block-3", "block-4", cb);
  document.getElementById("btn1").onclick =
    questionObj.prevQuestion.bind(questionObj);
  document.getElementById("btn2").onclick =
    questionObj.nextQuestion.bind(questionObj);
  document.getElementById("btn3").onclick =
    questionObj.submit.bind(questionObj);
  questionObj.renderQuestions();
}
// //function to record the result
function frequencyOnChange() {
  const voltage = Number(document.getElementById("voltage").value);
  const frequency = Number(document.getElementById("frequency").value);
  //base case
  const value = generateResult(frequency);
  document.getElementById("output-a").innerHTML = `a: ${value.a}`;
  document.getElementById("output-b").innerHTML = `b: ${value.b}`;
  document.getElementById("output-v").innerHTML = `c: ${value.v}`;
}
function recordTheResult() {
  const voltage = Number(document.getElementById("voltage").value);
  const frequency = Number(document.getElementById("frequency").value);
  //base case
  if (records.has(frequency)) return alert("the frequency is already recorded");
  const value = generateResult(frequency);
  records.set(frequency, value);
  if (records.size == 10) {
    document.getElementById("result-btn").disabled = false;
    return;
  }
}
//function to generate result
function generateResult(frequency) {
  if (frequency <= 100) return { vin: 2, f: frequency, a: 2, b: 0.2, v: 2 };
  if (frequency > 100 && frequency <= 200)
    return { vin: 2, f: frequency, a: 2, b: 0.3, v: 2 };
  if (frequency > 200 && frequency <= 400)
    return { vin: 2, f: frequency, a: 1.8, b: 0.6, v: 1.8 };
  if (frequency > 400 && frequency <= 600)
    return { vin: 2, f: frequency, a: 1.6, b: 0.5, v: 1.6 };
  if (frequency > 600 && frequency <= 800)
    return { vin: 2, f: frequency, a: 1.4, b: 0.4, v: 1.4 };
  if (frequency > 800 && frequency <= 1000)
    return { vin: 2, f: frequency, a: 1.2, b: 0.2, v: 1.2 };
}
// function to map the a,b,Vo value
function getRecordValue() {
  switchDisplay("block-4", "block-3");
  const questionObj = new RenderQuestions([4], "block-3", "block-5");
  document.getElementById("btn1").onclick =
    questionObj.prevQuestion.bind(questionObj);
  document.getElementById("btn2").onclick =
    questionObj.nextQuestion.bind(questionObj);
  document.getElementById("btn3").onclick =
    questionObj.submit.bind(questionObj);

  let label = [];
  let dataset1 = [];
  let dataset2 = [];
  const tableBody = document.getElementById("table-body");
  for (let i = 100; i <= 1000; i += 100) {
    let row = document.createElement("tr");
    let object = records.get(i);
    label.push(i);
    dataset1.push(Number((20 * Math.log10(object.v / object.vin)).toFixed(2)));
    dataset2.push(Number(Math.asin(object.b / object.a).toFixed(2)));
    Object.keys(object).forEach((ele) => {
      let value = document.createElement("td");
      value.textContent = object[ele];
      row.appendChild(value);
    });
    tableBody.appendChild(row);
  }

  console.log(dataset1, dataset2, label);
  // new Chart(graph1, {
  //     type: "line",
  //     data: {
  //         labels: label,
  //         datasets: [{
  //             label: 'phase/frequency',
  //             data: dataset1,
  //             fill: false,
  //             borderColor: 'rgb(75, 192, 192)',
  //             tension: 0.1
  //         }]
  //     }
  //     // options: {
  //     //     responsive: true,
  //     //     maintainAspectRatio: false,
  //     // }
  // })
  // new Chart(graph2, {
  //     type: "line",
  //     data: {
  //         labels: label,
  //         datasets: [{
  //             label: 'theta/frequency',
  //             data: dataset2,
  //             fill: false,
  //             borderColor: 'rgb(75, 192, 192)',
  //             tension: 0.1
  //         }]
  //     }
  //     // options: {
  //     //     responsive: true,
  //     //     maintainAspectRatio: false,
  //     // }
  // })
}

// // to download the result as pdf
// function downloadResult() {
//     alert("the expriment completed successfully and the download will begin soon...")
//     const element = document.getElementById('block-4');
//     html2pdf().from(element).save()
// }
