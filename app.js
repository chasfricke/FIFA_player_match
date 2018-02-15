let fifaSkillAvg = {};
let savedSkillScores = {};
let skillSelected;
let skillsList;
let playerData;

getPlayerData()
.then(data => {
  fifaSkillAvg.acceleration = getAvg(data, 'acceleration');
  fifaSkillAvg.aggression = getAvg(data, 'aggression');
  fifaSkillAvg.agility = (getAvg(data, 'agility'));
  fifaSkillAvg.balance = (getAvg(data, 'balance'));
  fifaSkillAvg.ballControl = (getAvg(data, 'ballControl'));
  fifaSkillAvg.composure = (getAvg(data, 'composure'));
  fifaSkillAvg.crossing = (getAvg(data, 'crossing'));
  fifaSkillAvg.curve = (getAvg(data, 'curve'));
  fifaSkillAvg.dribbling = (getAvg(data, 'dribbling'));
  fifaSkillAvg.finishing = (getAvg(data, 'finishing'));
  fifaSkillAvg.freeKickAccuracy = (getAvg(data, 'freeKickAccuracy'));
  fifaSkillAvg.headingAccuracy = (getAvg(data, 'headingAccuracy'));
  fifaSkillAvg.interceptions = (getAvg(data, 'interceptions'));
  fifaSkillAvg.jumping = (getAvg(data, 'jumping'));
  fifaSkillAvg.longPassing = (getAvg(data, 'longPassing'));
  fifaSkillAvg.longShots = (getAvg(data, 'longShots'));
  fifaSkillAvg.marking = (getAvg(data, 'marking'));
  fifaSkillAvg.penalties = (getAvg(data, 'penalties'));
  fifaSkillAvg.positioning = (getAvg(data, 'positioning'));
  fifaSkillAvg.reactions = (getAvg(data, 'reactions'));
  fifaSkillAvg.shortPassing = (getAvg(data, 'shortPassing'));
  fifaSkillAvg.penalties = (getAvg(data, 'penalties'));
  fifaSkillAvg.shotPower = (getAvg(data, 'shotPower'));
  fifaSkillAvg.slidingTackle = (getAvg(data, 'slidingTackle'));
  fifaSkillAvg.springSpeed = (getAvg(data, 'springSpeed'));
  fifaSkillAvg.stamina = (getAvg(data, 'stamina'));
  fifaSkillAvg.standingTackle = (getAvg(data, 'standingTackle'));
  fifaSkillAvg.strength = (getAvg(data, 'strength'));
  fifaSkillAvg.vision = (getAvg(data, 'vision'));
  fifaSkillAvg.volleys = (getAvg(data, 'volleys'));
  return fifaSkillAvg;
})
.then(data => buildList());

function getAvg(data, key = 'dribbling') {
  const goodData = data.filter(player => Number.isInteger (player[key]))
  const sum = goodData.reduce((acc, player) => {
    return acc + parseInt(player[key])
  }, 0)
  return Math.floor(sum / goodData.length)
}

function getPlayerData() {
  let playerDataFile = "./playerData.json";
  return fetch(playerDataFile)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
  .then(data => {
    playerData = data;
    return data
  })
  .catch(err => alert(err))
}




//User Skill Input
let slider = document.querySelector(".slider")
let sliderValueLabel = document.querySelector(".sliderValue")
sliderValueLabel.textContent = slider.value
slider.addEventListener("mouseup", function() {
  sliderValueLabel.textContent = slider.value
})


buildList();
//Button Events
function buildList(){
  var skillsList = Object.getOwnPropertyNames(fifaSkillAvg)
  for (let i = 0; i < skillsList.length; i++){
    buildButton(skillsList[i])
  }
}

function buildButton(skill){
  var newButton = document.createElement("button")
  var buttonLabel = document.createTextNode(skill)
  newButton.appendChild(buttonLabel)
  newButton.classList.add(skill)
  newButton.addEventListener("click", function() {
    buildSkillCard(skill)
    skillSelected = skill;
  })
  var end = document.querySelector("footer")
  document.body.insertBefore(newButton, end);
}

//Save Button
document.querySelector(".save").addEventListener("click", function() {
  if (skillSelected != undefined){
    savedSkillScores[skillSelected] = parseInt(slider.value)
    document.querySelector(".savedScore").textContent = slider.value
    console.log(skillSelected)
    var skillArray = document.getElementsByClassName(skillSelected)
    skillArray[0].classList.add("active")
  }
})



//Building Skill Card
function buildSkillCard (skill) {
  skillSelected = skill
  let title = document.querySelector(".skillCardTitle")
  let skillAvg = document.querySelector(".skillAvg")
  let savedScore = document.querySelector(".savedScore")
  title.textContent = skill.charAt(0).toUpperCase() + skill.slice(1);
  skillAvg.textContent = fifaSkillAvg[skill]
  savedScore.textContent = savedSkillScores[skill]
  if (savedSkillScores[skill] != undefined){
    slider.value = savedSkillScores[skill]
  }else {
    slider.value = fifaSkillAvg[skill]
  }
  sliderValueLabel.textContent = slider.value
}

//matchButton
document.querySelector(".matchButton").addEventListener("click", function() {
  var playerScoreDifference = playerData.reduce((acc,el) => {
    var keys = Object.keys(savedSkillScores)
    acc[el.name] = keys.reduce((acc,el2) => {
      var difference =  Math.abs(savedSkillScores[el2] - el[el2])
      return acc + difference;
    },0)
    return acc
  },{})
  playerScoreDifference = Object.entries(playerScoreDifference)
  sortResults(playerScoreDifference);
})


function sortResults(object){
  var list = object
  function compareNumbers(a, b) {
    return a[1] - b[1];
  }
  var sortResults = list.sort(compareNumbers)
  displayResults(sortResults);
}

function displayResults(results){
  var matchNames = document.querySelector(".matchNames")
  var matchScores = document.querySelector(".matchScores")
  for (let i = 0; i < 10; i++){
    var namesLi = document.createElement("li")
    namesLi.textContent = (results[i][0])
    matchNames.appendChild(namesLi)
    var scoresLi = document.createElement("li")
    scoresLi.textContent = (results[i][1])
    matchScores.appendChild(scoresLi)
  }
}
