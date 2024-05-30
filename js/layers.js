addLayer("b", {
    name: "maak een baby", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    
    

    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Babies", // Name of prestige currency
    baseResource: "sperm", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 1.225,
    exponent: 1.25,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = 2
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
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
        effectDisplay() { 
          if (hasUpgrade('c', 14)) {
            boost = player.points.add(1).log(5).pow(3).add(1)
          } else {
            boost = player.points.add(1).slog(5).pow(4.75).add(1)
          }
          return format(boost)
         },
        unlocked() { return hasUpgrade('b', 11)}
      },
      13: {
        title: "How does that work?",
        description: "sperm is multiplied based on babies",
        cost: new Decimal(13),
        effectDisplay() { return format(Decimal.pow(2, player[this.layer].points.add(4).pow(1/2.5)))},
        unlocked() { return hasUpgrade('b', 12)}
      }
    },

    automate() {
      if (hasUpgrade('c', 13)) {
        buyUpgrade('b', 11)
        buyUpgrade('b', 12)
        buyUpgrade('b', 13)
      }
    },

    autoPrestige() {
      automate = hasUpgrade('c', 13)
      this.resetsNothing = automate
      return automate
    },
    canBuyMax() {
      return hasUpgrade('c', 13)
    }

})

addLayer("c", {
  name: "Sacrifice your babies for 1 child", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: false,
  points: new Decimal(0),

  }},
  branches: ["b"],
  color: "#4BDC13",
  requires: new Decimal(25), // Can be a function that takes requirement increases into account
  resource: "Children", // Name of prestige currency
  baseResource: "babies", // Name of resource prestige is based on
  baseAmount() {return player.b.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 2.5,
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      exp = new Decimal(1)
      return exp
  },
  row: 1, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
      {key: "c", description: "C: Reset for a Baby", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){return true},
  upgrades: {
    11: {
      title: "Pray to the sperm god",
      description: "^1.8 sperm gain",
      cost: new Decimal(1),
      unlocked() { return (hasUpgrade('c', 11) || player[this.layer].points.gte(1))}
    },
    12: {
      title: "Still don't know how this works...",
      description: "Multiply sperm based on children",
      cost: new Decimal(3),
      unlocked() { return (hasUpgrade('c', 11)) },
      effectDisplay() { return format(player[this.layer].points.add(2).pow(1.5))}
    },
    13: {
      title: "Make them buy it",
      description: "automate baby upgrades 1-3 and automate baby gain",
      cost: new Decimal(5),
      unlocked() { return (hasUpgrade('c', 12)) }
    },
    14: {
      title: "Tetrational gains?",
      description: "'Exponential gains' is better",
      cost: new Decimal(10),
      unlocked() { return (hasUpgrade('c', 13)) }
    },
    
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