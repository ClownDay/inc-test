var gameData = {
  currency: 0,
  clickPower: 1,
  clickUpgradeCost: 10,
  priceUpgradeCost: 1000,
  priceUpgradeStrength: 2,
  priceUpgradeTimesBought: 0,
  automated: false,
  currencyName: "Currency"
};

tab("Present")

var mainGameLoop = window.setInterval(function() {
  if(gameData.currency > 25000){
    document.getElementById("timeUnlock").style.all = "revert"
    document.getElementById("timeUnlock").disabled = false
  }
}, 1000);

var fastGameLoop = window.setInterval(function() {
  if (gameData.automated) currencyTick();
}, 10);

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function currencyTick() {
  gameData.currency += gameData.clickPower;
  update("currencyCounter", gameData.currencyName + ": " + format(gameData.currency, "scientific"))
}

function clickUpgrade() {
  if (gameData.currency >= gameData.clickUpgradeCost) {
    gameData.currency -= gameData.clickUpgradeCost;
    gameData.clickPower += 1;
    gameData.clickUpgradeCost = gameData.clickUpgradeCost * 1.1;
    update("currencyCounter", gameData.currencyName + ": " + format(gameData.currency, "scientific")
    );
    update(
      "clickUpgrade",
      "Upgrade Click Power (Currently: " +
        gameData.clickPower +
        ") (Price: " +
        format(gameData.clickUpgradeCost, "scientific") +
        ")"
    );
  }
}

function priceUpgrade() {
  if (gameData.currency >= gameData.priceUpgradeCost) {
    gameData.priceUpgradeTimesBought++;
    gameData.currency -= gameData.priceUpgradeCost;
    gameData.priceUpgradeCost *= 10;
    gameData.clickUpgradeCost /= 2;
    update(
      "currencyCounter",
      "Currency: " + format(gameData.currency, "scientific")
    );
    update(
      "clickUpgrade",
      "Upgrade Click Power (Currently: " +
        gameData.clickPower +
        ") (Price: " +
        format(gameData.clickUpgradeCost, "scientific") +
        ")"
    );
    update(
      "priceUpgrade",
      "Decrease Previous Upgrade Cost (Currently: 1/" +
        format(
          gameData.priceUpgradeStrength ** gameData.priceUpgradeTimesBought,
          "scientific"
        ) +
        ") (Price: " +
        format(gameData.priceUpgradeCost, "scientific") +
        ")"
    );
  }
}

function automateUpgrade() {
  if (gameData.currency >= 10000) {
    gameData.currency -= 10000;
    gameData.automated = true;
    update("automateUpgrade", "Automate Clicking (Bought)");
    document.getElementById("automateUpgrade").disabled = true;
  }
}

function timeUnlock() {
  gameData.currencyName = "Currentsy"
  update("currencyButton", "Acquire " + gameData.currencyName)
  update("currencyCounter", gameData.currencyName + ": " + format(gameData.currency, "scientific"))
  document.getElementById("pTab").style.all = "revert"
  document.getElementById("pTab").disabled = false
  document.getElementById("prTab").style.all = "revert"
  document.getElementById("prTab").disabled = false
  document.getElementById("fTab").style.all = "revert"
  document.getElementById("fTab").disabled = false
  document.getElementById("timeUnlock").remove()
}

function format(number, type) {
  let exponent = Math.floor(Math.log10(number));
  let mantissa = number / Math.pow(10, exponent);
  if (3 < exponent && exponent < 9) return number.toFixed(0);
  if (exponent < 9) return number.toFixed(1);
  if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent;
}

function tab(tab){
  document.getElementById("Past").style.display = "none"
  document.getElementById("Present").style.display = "none"
  document.getElementById("Future").style.display = "none"
  document.getElementById("Tabs").style.display = "inline-block"
  document.getElementById(tab).style.display = "inline-block"
}
