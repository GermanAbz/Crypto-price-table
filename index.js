import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

function roundUp(num, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.ceil(num * factor) / factor;
}


app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.coinpaprika.com/v1/global");
    const result = await axios.get("https://api.coinpaprika.com/v1/tickers");
    res.render("index.ejs", { 
        marCap: roundUp(response.data.market_cap_usd / Math.pow(10, 12), 3),
        vol24: roundUp(response.data.volume_24h_usd / Math.pow(10, 9), 1),  
        bitDom: response.data.bitcoin_dominance_percentage,
        cryNum: response.data.cryptocurrencies_number.toLocaleString(),
        bitPrice: roundUp(result.data[0].quotes.USD.price, 0).toLocaleString(),
        ethPrice: roundUp(result.data[1].quotes.USD.price, 0).toLocaleString(),
        solPrice: roundUp(result.data[5].quotes.USD.price, 1).toLocaleString(),
        suiPrice: roundUp(result.data[14].quotes.USD.price, 2).toLocaleString(),
        usdtPrice: roundUp(result.data[2].quotes.USD.price, 5),
        usdcPrice: roundUp(result.data[6].quotes.USD.price, 5),

        bitCap: roundUp(result.data[0].quotes.USD.market_cap/ Math.pow(10, 12), 3),
        ethCap: roundUp(result.data[1].quotes.USD.market_cap/ Math.pow(10, 9), 1),
        solCap: roundUp(result.data[5].quotes.USD.market_cap/ Math.pow(10, 9), 1),
        suiCap: roundUp(result.data[14].quotes.USD.market_cap/ Math.pow(10, 9), 1),
        usdtCap: roundUp(result.data[2].quotes.USD.market_cap/ Math.pow(10, 9), 1),
        usdcCap: roundUp(result.data[6].quotes.USD.market_cap/ Math.pow(10, 9), 1),
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});











app.listen(port, () => {
    console.log("Server is running on port " + port);
});