var gameData = {
    currency: 0,
    currencyPerClick: 1
  }

function currencyTick(){
    gameData.currency += gameData.currencyPerClick
    document.getElementById("currency-counter").innerHTML = "Currency: " + gameData.currency
}