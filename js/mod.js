let modInfo = {
	name: "The Baby Tree",
	id: "Babies",
	author: "Professional gamedev man",
	pointsName: "Sperma",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 69420,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "My name is Walter Hartwell White.",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added Babies.<br>
		- Added more things?.`

let winText = `Gefeliciteerd! Het universum implodeert door het gewicht en inhoud van een googol sperma`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)

  // adders
  if (hasAchievement('a', 11)) { gain = gain.add(1) }

  // multipliers
  if (hasUpgrade('b', 11)) { gain = gain.mul(3) }
  if (hasUpgrade('b', 12)) { 
    gain = gain.mul(player.points.add(1).slog(5).pow(4.75).add(1))

  }
  if (hasUpgrade('b', 13)) { gain = gain.mul(Decimal.pow(2, player['b'].points.add(4).pow(1/2.5))) }

  gain = gain.mul(Decimal.pow(10, getBuyableAmount('m', 12)))

  if (hasUpgrade('b', 23)) { gain = gain.pow(3) }
 
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e100"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}