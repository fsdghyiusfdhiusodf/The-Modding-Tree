addLayer("b", {
    name: "maak een baby", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Babies", // Name of prestige currency
    baseResource: "sperm", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.25, // Prestige currency exponent
    base: new Decimal(1.25),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for a Baby", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
      11: {
        title: "Become an adult",
        description: "X3 sperm gain",
        cost: new Decimal(3),
        unlocked() { return (hasUpgrade('b', 11) || player[this.layer].points.gte(1))}
      },
      12: {
        title: "Exponential Gains",
        description: "sperm is multiplied based on sperm",
        cost: new Decimal(7),
        effectDisplay() { return format(player.points.add(1).slog(10).pow(4).add(1)) },
        unlocked() { return hasUpgrade('b', 11)}
      },
      13: {
        title: "How does that work?",
        description: "sperm is multiplied based on babies",
        cost: new Decimal(13),
        effectDisplay() { return format(Decimal.pow(2, player[this.layer].points.add(4).pow(1/3)))},
        unlocked() { return hasUpgrade('b', 12)}
      }
    }
})




addLayer("a", {
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0)
    }
  },
  color: "yellow",
  resource: "achievements",
  row: "side",
  tooltip() {
    return ("Achievements")
  },
  achievementPopups: true,
  achievements: {
    11: {
      name: "First try.",
      done() { return player.b.points.gte(1) },
      tooltip: "Get 1 baby. <br> Reward: +1 sperm gain",
      onComplete() { player.a.points =  player.a.points.add(1) },
      
    }
  }
})