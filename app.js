let fifaSkillAvg = {};
let savedSkillScores = {};
let skillSelected;
let playerData;

getPlayerData()
.then(data => {
  //offense
  fifaSkillAvg.ballControl = (getAvg(data, 'ballControl'));
  fifaSkillAvg.crossing = (getAvg(data, 'crossing'));
  fifaSkillAvg.curve = (getAvg(data, 'curve'));
  fifaSkillAvg.dribbling = (getAvg(data, 'dribbling'));
  fifaSkillAvg.finishing = (getAvg(data, 'finishing'));
  fifaSkillAvg.freeKickAccuracy = (getAvg(data, 'freeKickAccuracy'));
  fifaSkillAvg.headingAccuracy = (getAvg(data, 'headingAccuracy'));
  fifaSkillAvg.longPassing = (getAvg(data, 'longPassing'));
  fifaSkillAvg.longShots = (getAvg(data, 'longShots'));
  fifaSkillAvg.shortPassing = (getAvg(data, 'shortPassing'));
  fifaSkillAvg.penalties = (getAvg(data, 'penalties'));
  fifaSkillAvg.shotPower = (getAvg(data, 'shotPower'));
  fifaSkillAvg.volleys = (getAvg(data, 'volleys'));
  fifaSkillAvg.penalties = (getAvg(data, 'penalties'));
  fifaSkillAvg.vision = (getAvg(data, 'vision'));
  //defense
  fifaSkillAvg.interceptions = (getAvg(data, 'interceptions'));
  fifaSkillAvg.marking = (getAvg(data, 'marking'));
  fifaSkillAvg.standingTackle = (getAvg(data, 'standingTackle'));
  fifaSkillAvg.slidingTackle = (getAvg(data, 'slidingTackle'));
  //physical
  fifaSkillAvg.aggression = getAvg(data, 'aggression');
  fifaSkillAvg.acceleration = getAvg(data, 'acceleration');
  fifaSkillAvg.agility = (getAvg(data, 'agility'));
  fifaSkillAvg.balance = (getAvg(data, 'balance'));
  fifaSkillAvg.composure = (getAvg(data, 'composure'));
  fifaSkillAvg.jumping = (getAvg(data, 'jumping'));
  fifaSkillAvg.positioning = (getAvg(data, 'positioning'));
  fifaSkillAvg.reactions = (getAvg(data, 'reactions'));
  fifaSkillAvg.springSpeed = (getAvg(data, 'springSpeed'));
  fifaSkillAvg.stamina = (getAvg(data, 'stamina'));
  fifaSkillAvg.strength = (getAvg(data, 'strength'));
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
let sliderContainer = document.querySelector(".slider-container")
sliderContainer.style.display = 'none'

let slider = document.querySelector(".slider")

let sliderValueLabel = document.querySelector(".slider-value")
sliderValueLabel.textContent = slider.value
slider.addEventListener("mouseup", function() {
  sliderValueLabel.textContent = slider.value
})
slider.addEventListener("keydown", function() {
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
    sliderContainer.style.display = ''
  })
  var buttonContainer = document.querySelector(".skill-button-container")
  buttonContainer.appendChild(newButton)
}

//Save Button
document.querySelector(".save").addEventListener("click", function() {
  if (skillSelected != undefined){
    sliderContainer.style.display = 'none'
    savedSkillScores[skillSelected] = parseInt(slider.value)
    var skillArray = document.getElementsByClassName(skillSelected)
    skillArray[0].classList.add("active")

  }

  //Match Logic
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

//Building Skill Card
function buildSkillCard (skill) {
  skillSelected = skill
  let title = document.querySelector(".skill-title")
  let skillAvg = document.querySelector(".skillAvg")
  title.textContent = skill.charAt(0).toUpperCase() + skill.slice(1);
  skillAvg.textContent = fifaSkillAvg[skill]
  if (savedSkillScores[skill] != undefined){
    slider.value = savedSkillScores[skill]
  }else {
    slider.value = fifaSkillAvg[skill]
  }
  sliderValueLabel.textContent = slider.value
}

//sort-results
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

  var topPlayerName = document.querySelector(".player-name")
  var topPlayerOverall = document.querySelector(".player-overall")
  var topPlayerPositions = document.querySelector(".player-position")
  var topPlayerClub = document.querySelector(".player-club")
  var topPlayerImg = document.querySelector(".player-photo")

  if (matchNames.getElementsByTagName("li").length > 0){
    matchNames.innerHTML = "";
    matchScores.innerHTML = "";
    topPlayerName.innerHTML = "";
    topPlayerPositions.innerHTML = "";
    topPlayerClub.innerHTML = "";
    topPlayerImg.innerHTML = "";
    topPlayerOverall.innerHTML = "";
  }

  //Top Player Data
  topPlayerName.innerHTML = results[0][0]
  var topPlayerData = playerData.filter(data => data.name == results[0][0])
  topPlayerImg.src = topPlayerData[0].photo
  topPlayerOverall.innerHTML = "OVERALL: " + topPlayerData[0].overall
  topPlayerPositions.innerHTML = "POSITION: " + topPlayerData[0].preferredPositions
  topPlayerClub.innerHTML = "CLUB: " + topPlayerData[0].club

  //create topPlayerData array
  var topPlayerDataArray = [];
  var topPlayerDataKeys = Object.keys(topPlayerData[0]);
  var topPlayerDataValues = Object.values(topPlayerData[0]);
  for (let a = 0; a < 40; a++){
    topPlayerDataArray.push(topPlayerDataKeys[a] + ":   " + topPlayerDataValues[a])
  }

  //remaining top player data
  var remainingSkillsList = document.querySelector(".remaining-skills-list")
  remainingSkillsList.innerHTML = "";
  for (let x = 10; x < 39; x++){
    var skillKeyPair = topPlayerDataArray[x]
    var skillLi = document.createElement("li")
    skillLi.textContent = (skillKeyPair)
    remainingSkillsList.appendChild(skillLi)
  }

  //user score data displayResults
    var savedSkillsList = document.querySelector(".saved-skills-list")
    var savedSkillScoresArray = [];
    var savedSkillScoresKeys = Object.keys(savedSkillScores);
    var savedSkillScoresValues = Object.values(savedSkillScores);
    var totalSavedScore = 0;
    savedSkillsList.innerHTML = "";
    for (let z = 0; z < savedSkillScoresKeys.length; z++){
      savedSkillScoresArray.push(savedSkillScoresKeys[z] + ": " + savedSkillScoresValues[z])
      totalSavedScore = totalSavedScore + Number(savedSkillScoresValues[z])
      var skillKeyPair = savedSkillScoresArray[z]
      var skillLi = document.createElement("li")
      skillLi.textContent = (skillKeyPair)
      savedSkillsList.appendChild(skillLi)
    }

  //Top 10 Matches
  for (let i = 0; i < 10; i++){
    var namesLi = document.createElement("li")
    namesLi.textContent = (results[i][0])
    matchNames.appendChild(namesLi)
    var scoresLi = document.createElement("li")
    scoresLi.textContent = Math.floor(((totalSavedScore) - (results[i][1])) / totalSavedScore * 100)
    matchScores.appendChild(scoresLi)
  }
}
