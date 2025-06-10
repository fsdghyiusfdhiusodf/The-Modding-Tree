addLayer("b", {
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    
    

    color: "#4BDC13",
    requires() {
      return new Decimal(10).div(Decimal.pow(4, getBuyableAmount('m', 11)))
    } , // Can be a function that takes requirement increases into account
    resource: "Babies", // Name of prestige currency
    baseResource: "Sperma", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 1.225,
    exponent: 1.25,
    canBuyMax() {
      return hasAchievement('a', 14)
    },

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade('b', 21)) { exp = exp.div(0.75) }
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset voor a Baby", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
      11: {
        title: "Probeer harder",
        description: "X3 sperma/sec",
        cost: new Decimal(3),
        unlocked() { return (hasUpgrade('b', 11) || player[this.layer].points.gte(1))}
      },
      12: {
        title: "Exponentiele vergelijking van slogaritmes",
        description: "Vermenigvuldig sperma/sec gebaseerd op sperma",
        cost: new Decimal(7),
        effectDisplay() { 
          boost = player.points.add(1).slog(5).pow(4.75).add(1)
          return "x" + format(boost)
         },
        unlocked() { return hasUpgrade('b', 11)}
      },
      13: {
        title: "What the Ohio!",
        description: "Vermenigvuldig sperma/sec gebaseerd op babies",
        cost: new Decimal(13),
        effectDisplay() { return "x" + format(Decimal.pow(2, player[this.layer].points.add(4).pow(1/2.5)))},
        unlocked() { return hasUpgrade('b', 12)}
      },

      21: {
        title: "Eet meer wortels",
        description: "De kost van babies is ^0.75",
        cost: new Decimal(75),
        unlocked() { return hasUpgrade('m', 11) && hasUpgrade('b', 13) }
      },
      22: {
        title: "Goudmijn",
        description: "Dollarwinst is x10",
        cost: new Decimal(100),
        unlocked() { return hasUpgrade('b', 21) }
      },
      23: {
        title: "Immuniteit voor SOA's",
        description: "sperma/sec is ^3",
        cost: new Decimal(200),
        unlocked() { return hasUpgrade('b', 22) }
      },

  
    },



})

addLayer("m", {
  symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  }},
  branches: ["b"],
  color: "#4BDC13",
  requires: new Decimal(20), // Can be a function that takes requirement increases into account
  resource: "Dollar", // Name of prestige currency
  baseResource: "Babies", // Name of resource prestige is based on
  baseAmount() {return player.b.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 5,
  roundUpCost: true,
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if (hasUpgrade('b', 22)) { mult = mult.mul(10) }
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      exp = new Decimal(1)
      return exp
  },
  row: 1, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
      {key: "c", description: "C: Reset voor money", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){
    return true
  },
  buyables: {
    11: {
      title: "Koop een betere condoom",
      unlocked() { return hasAchievement('a', 12) },
      cost(x) {
        cost1 = new Decimal(2).pow(x.pow(0.75)) 
        return cost1
        },
      display(x) { 
        return "God geeft je nogsteeds een baby? <br> Baby kost is gedeeld door 4 <br> Kost: $" + format(cost1)
      },
      canAfford() { return player[this.layer].points.gte(this.cost()) },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },

    },
    12: {
      title: "Ontdek een betere prostaat",
      unlocked() { return hasAchievement('a', 12) },
      cost(x) {
        cost2 = new Decimal(10).mul(x.add(1).pow(3))
        return cost2
      },
      display(x) {
        return "Dat wordt meer drinken <br> Sperma/sec is vermenigvuldigd met 10 <br> Kost: $" + format(cost2)
      },
      canAfford() { return player[this.layer].points.gte(this.cost()) },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },

    },

  },
  upgrades: {
    11: {
      title: "Meer upgrades",
      description: "Ontgrendel 3 nieuwe baby upgrades",
      cost: new Decimal(1000),
      unlocked() { return hasAchievement('a', 13) }
    }
  },
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
      name: "ez",
      done() { return player.b.points.gte(1) },
      tooltip: "Krijg 1 baby. <br> Beloning: +1 sperma/sec",
      onComplete() { player.a.points =  player.a.points.add(1) },
    },
    12: {
      name: "Rijk!",
      done() { return player.m.points.gte(1) },
      tooltip: "Heb $1. <br> Beloning: Winkel",
      onComplete() { player.a.points = player.a.points.add(1) },
    },
    13: {
      name: "Arm!",
      done() { return player.m.points.gte(1000) },
      tooltip: "Heb $1000. <br> Beloning: Dollar Upgrades",
      onComplete() { player.a.points = player.a.points.add(1) },
    },
    14: {
      name: "Da's veel",
      done() { return player.b.points.gte(10) },
      tooltip: "Krijg 10 babies. <br> Beloning: Je kan babies max-buyen",
      onComplete() { player.a.points = player.a.points.add(1) },
    },

  }
})
