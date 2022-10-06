import { Router } from "express";
import { gainerget24HourVolume, gainergetChartData, gainergetCirculatedSupply, gainergetDexTrades,
         gainergetNewListedPairs, gainergetOwnershipTrasnferred, gainergetPairCurrencies, gainergetPriceVariation, 
         gainergetTokenBalances, gainergetTokenCreated, gainergetTokenInfo, gainergetTopTrades } from "../functions/gainerbitqueryFunctions.js";
import chains from "../functions/chains.js";
var router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get('/gainergetChartData', async function (req, res, next){
  const {chain, pair, baseCurrency, quoteCurrency, intervalName, intervalCount, from, to} = req.query;
  const chartData = await gainergetChartData(chain, pair, baseCurrency, quoteCurrency, intervalName, intervalCount, from, to).catch(console.log);
  res.send({code: 1, data: chartData});
})

router.get('/gainergetTokenInfo', async function (req, res, next){
  const tokenInfo = await gainergetTokenInfo("bsc", "0x8918Bb91882CE41D9D9892246E4B56e4571a9fd5");
  res.send({code: 1, data: tokenInfo});
})

router.get("/gainergetDexTrades", async function(req, res, next){
  const trades = await gainergetDexTrades("bsc", "0x8918Bb91882CE41D9D9892246E4B56e4571a9fd5");
  res.send({code: 1, data: trades});
})

router.get("/gainergetNewListedPairs", async function(req, res, next){
  const trades = await gainergetNewListedPairs("ethereum");
  res.send({code: 1, data: trades});
})

router.get("/gainergetTopTrades", async function (req, res, next) {
  const { chain } = req.query;
  const trades = await gainergetTopTrades(chain);
  res.send({code: 1, data: trades})
})

router.get("/gainergetTokenBalances", async function (req, res, next) {
  const {chain, address} = req.query;
  const balances = await gainergetTokenBalances(chains[chain], address);
  res.send({code: 1, data: balances});
})

router.get("/gainergetTokenCreated", async function (req, res, next) {
  const {chain, address} = req.query;
  const data = await gainergetTokenCreated(chains[chain], "0x8E1703E600f3A667482C4cedF9c5042c4F9E1fA5");
  res.send({code: 1, data: data});
})

router.post("/gainergetOwnershipTransferred", async function (req, res, next) {
  const { chain, addresses } = req.body;
  const data = await gainergetOwnershipTrasnferred(chains[chain], JSON.stringify(addresses))
  res.send({code: 1, data});
})

router.post("/gainergetPriceVariation", async function (req, res, next){
  const { chain, addresses } = req.body;
  const data = await gainergetPriceVariation(chain, addresses);
  res.send({code: 1, data});
})

router.get("/gainergetPairCurrencies", async (req, res, next) => {
  const { chain, pair } = req.query;
  const result = await gainergetPairCurrencies(chain, pair);
  res.send({code: 1, data: result});
})

router.get("/gainergetDayVolume", async (req, res, next) => {
  const { chain, pair } = req.query;
  console.log(chain, pair);
  try {
    const result = await gainerget24HourVolume(chain, pair);
    res.send({code: 1, data: result.data.ethereum.dexTrades[0].tradeAmount});
  }
  
  catch(err){
    res.send({code: 0, message: "Unknown Error Occurred!!!"});
  }
})

router.get("/gainergetMarketCap", async (req, res, next) => {
  const { chain, currency} = req.query;
  const result = await gainergetCirculatedSupply(chain, currency);
  res.send({code: 1, data: result});
})

export default router;