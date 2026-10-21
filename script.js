const homeScreen = document.getElementById("home-screen");
const setupScreen = document.getElementById("setup-screen");
const storyScreen = document.getElementById("story-screen");
const characterForm = document.getElementById("character-form");
const playerNameInput = document.getElementById("player-name");
const playerIdentityInput = document.getElementById("player-identity");
const storyContent = document.getElementById("story-content");
const storyChoices = document.getElementById("story-choices");
const choiceFeedback = document.getElementById("choice-feedback");
const continueButton = document.getElementById("continue-button");
const sceneTitle = document.getElementById("scene-title");
const sceneLocation = document.getElementById("scene-location");

let playerName = "Traveler";
let playerIdentity = "they";
let currentScene = "mountain";
let hasChosen = false;

function showScreen(target) {
  [homeScreen, setupScreen, storyScreen].forEach(screen => screen.classList.add("hidden"));
  target.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("begin-button").addEventListener("click", () => {
  showScreen(setupScreen);
  playerNameInput.focus();
});

document.getElementById("home-link").addEventListener("click", event => {
  event.preventDefault();
  showScreen(homeScreen);
});

characterForm.addEventListener("submit", event => {
  event.preventDefault();
  playerName = playerNameInput.value.trim() || "Traveler";
  playerIdentity = playerIdentityInput.value;
  currentScene = "mountain";
  showScreen(storyScreen);
  showMountainScene();
});

function setParagraphs(paragraphs) {
  storyContent.replaceChildren();
  paragraphs.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    storyContent.appendChild(p);
  });
}

function showFeedback(text) {
  choiceFeedback.textContent = text;
  choiceFeedback.classList.remove("hidden");
}

function setChoices(choices) {
  storyChoices.replaceChildren();
  choices.forEach(({ label, action }) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.textContent = label;
    button.addEventListener("click", () => {
      if (hasChosen) return;
      hasChosen = true;
      storyChoices.querySelectorAll("button").forEach(item => item.disabled = true);
      action();
      continueButton.classList.remove("hidden");
    });
    storyChoices.appendChild(button);
  });
}

function showMountainScene() {
  currentScene = "mountain";
  hasChosen = false;
  sceneLocation.textContent = "GLEN · SOMEWHERE IN THE MOUNTAINS";
  sceneTitle.textContent = "A Stranger on the Mountain";
  setParagraphs([
    "Your eyes open to a sky you don't recognize.",
    "Cold stone presses against your back. Far below, forests stretch toward a distant haze. You sit up, head aching, and try to remember how you got here.",
    "Nothing.",
    "You don't know this mountain. You don't know how long you've been here. Most troubling of all, you don't even know your own past.",
    "Voices carry over the rocks nearby.",
    "\"Over here! I've found someone.\"",
    "Three figures approach, dressed for travel and carrying equipment suited to the wilderness. One keeps a hand near their weapon, watching you carefully.",
    "\"Easy,\" one says. \"We're not here to hurt you. Can you stand?\""
  ]);
  choiceFeedback.classList.add("hidden");
  continueButton.classList.add("hidden");
  continueButton.textContent = "Continue →";
  setChoices([
    {
      label: "\"I think so. Who are you?\"",
      action: () => showFeedback(`"I think so. Who are you?" you ask, pushing yourself upright. "Trailseekers," the stranger replies. "We track the mountain paths. Finding lost people isn't usually part of the job, but here we are.`)
    },
    {
      label: "Stand up slowly and study them.",
      action: () => showFeedback(`You get to your feet slowly, keeping your eyes on their hands and weapons. The nearest stranger notices. "Careful. Good instinct, actually. We're Trailseekers. We found you alone up here.`)
    },
    {
      label: "\"Where am I?\"",
      action: () => showFeedback(`"Where am I?" you ask. The three exchange a look. "The mountains of Glen," one replies. "And if you don't remember how you got here, we should probably get you somewhere safe.`)
    }
  ]);
}

continueButton.addEventListener("click", () => {
  if (currentScene === "mountain") showSeersScene();
  else if (currentScene === "seers") showPeacekeeperScene();
  else showScreen(homeScreen);
});

function showSeersScene() {
  currentScene = "seers";
  hasChosen = false;
  sceneLocation.textContent = "GLEN · THE SEERS' SANCTUARY";
  sceneTitle.textContent = "A Strange Presence";
  setParagraphs([
    "The Trailseekers take you down from the mountain and along a winding road. You ask questions, but their answers only raise more.",
    "Glen has changed, they tell you. The Serpent Order keeps the peace, and anyone who threatens that peace is dealt with. Somewhere out there, a rebellion called Talon fights the Order. The Trailseekers don't seem eager to discuss either side.",
    "By dusk, you reach a quiet sanctuary. The people inside call themselves the Seers.",
    "An elderly Seer studies you for a long moment. \"There is something unusual about you,\" they say. \"I can't tell you what it means. Only that we should not ignore it.\"",
    "You have no memory, no explanation, and no reason to trust these strangers. Unfortunately, they're the only lead you've got."
  ]);
  choiceFeedback.classList.add("hidden");
  continueButton.classList.add("hidden");
  continueButton.textContent = "Continue →";
  setChoices([
    {
      label: "\"What do you mean, unusual?\"",
      action: () => showFeedback(`"If I knew, I would tell you," the Seer replies. "I know how unsatisfying that sounds. Trust me, I dislike mysteries as much as you do.`)
    },
    {
      label: "\"I just want to know who I am.\"",
      action: () => showFeedback(`"Then start with what you can choose," the Seer says. "Your next step, at least, is yours to make.`)
    }
  ]);
}

function showPeacekeeperScene() {
  currentScene = "peacekeepers";
  hasChosen = false;
  sceneLocation.textContent = "GLEN · THE ORDER'S TERRITORY";
  sceneTitle.textContent = "Choose Your Path";
  setParagraphs([
    "The Seers arrange for you to be taken to the Peacekeepers, the groups that enforce the Serpent Order's rule throughout Glen.",
    "They make one thing clear: a stranger with no past and no place in society will attract suspicion. Joining a group is your best chance to find shelter, answers, and a way forward.",
    "The Order teaches that Talon is a threat to ordinary people. Whether that is the whole truth is something you have yet to discover.",
    "A Peacekeeper officer waits beside a table of insignias. \"Pick a group. You'll learn the rest on the job.\""
  ]);
  choiceFeedback.classList.add("hidden");
  continueButton.classList.add("hidden");
  continueButton.textContent = "Continue →";
  setChoices([
    { label: "Night Hunters — scouts, trackers, and night operations", action: () => chooseGroup("Night Hunters") },
    { label: "City Wardens — patrols and public order", action: () => chooseGroup("City Wardens") },
    { label: "Iron Guard — protection for the wealthy and influential", action: () => chooseGroup("Iron Guard") },
    { label: "Trailseekers — wilderness scouts and trackers", action: () => chooseGroup("Trailseekers") }
  ]);
}

function chooseGroup(group) {
  currentScene = "chosen";
  storyChoices.replaceChildren();
  showFeedback(`You choose the ${group}. The officer takes your name, gives you a brief nod, and gestures toward the door. "Welcome aboard, ${playerName}. Try not to make me regret this." Your life in Glen is about to begin.`);
  continueButton.textContent = "Back to homepage";
  continueButton.classList.remove("hidden");
}

showMountainScene();
