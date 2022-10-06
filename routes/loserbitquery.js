import { Router } from "express";
import { loserget24HourVolume, losergetChartData, losergetCirculatedSupply, losergetDexTrades,
         losergetNewListedPairs, losergetOwnershipTrasnferred, losergetPairCurrencies, losergetPriceVariation, 
         losergetTokenBalances, losergetTokenCreated, losergetTokenInfo, losergetTopTrades } from "../functions/loserbitqueryFunctions.js";
import chains from "../functions/chains.js";
var router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get('/losergetChartData', async function (req, res, next){
  const {chain, pair, baseCurrency, quoteCurrency, intervalName, intervalCount, from, to} = req.query;
  const chartData = await losergetChartData(chain, pair, baseCurrency, quoteCurrency, intervalName, intervalCount, from, to).catch(console.log);
  res.send({code: 1, data: chartData});
})

router.get('/losergetTokenInfo', async function (req, res, next){
  const tokenInfo = await losergetTokenInfo("bsc", "0x8918Bb91882CE41D9D9892246E4B56e4571a9fd5");
  res.send({code: 1, data: tokenInfo});
})

router.get("/losergetDexTrades", async function(req, res, next){
  const trades = await losergetDexTrades("bsc", "0x8918Bb91882CE41D9D9892246E4B56e4571a9fd5");
  res.send({code: 1, data: trades});
})

router.get("/losergetNewListedPairs", async function(req, res, next){
  const trades = await losergetNewListedPairs("ethereum");
  res.send({code: 1, data: trades});
})

router.get("/losergetTopTrades", async function (req, res, next) {
  const { chain } = req.query;
  const trades = await losergetTopTrades(chain);
  res.send({code: 1, data: trades})
})

router.get("/losergetTokenBalances", async function (req, res, next) {
  const {chain, address} = req.query;
  const balances = await losergetTokenBalances(chains[chain], address);
  res.send({code: 1, data: balances});
})

router.get("/losergetTokenCreated", async function (req, res, next) {
  const {chain, address} = req.query;
  const data = await losergetTokenCreated(chains[chain], "0x8E1703E600f3A667482C4cedF9c5042c4F9E1fA5");
  res.send({code: 1, data: data});
})

router.post("/losergetOwnershipTransferred", async function (req, res, next) {
  const { chain, addresses } = req.body;
  const data = await losergetOwnershipTrasnferred(chains[chain], JSON.stringify(addresses))
  res.send({code: 1, data});
})

router.post("/losergetPriceVariation", async function (req, res, next){
  const { chain, addresses } = req.body;
  const data = await losergetPriceVariation(chain, addresses);
  res.send({code: 1, data});
})

router.get("/losergetPairCurrencies", async (req, res, next) => {
  const { chain, pair } = req.query;
  const result = await losergetPairCurrencies(chain, pair);
  res.send({code: 1, data: result});
})

router.get("/losergetDayVolume", async (req, res, next) => {
  const { chain, pair } = req.query;
  console.log(chain, pair);
  try {
    const result = await loserget24HourVolume(chain, pair);
    res.send({code: 1, data: result.data.ethereum.dexTrades[0].tradeAmount});
  }
  
  catch(err){
    res.send({code: 0, message: "Unknown Error Occurred!!!"});
  }
})

router.get("/losergetMarketCap", async (req, res, next) => {
  const { chain, currency} = req.query;
  const result = await losergetCirculatedSupply(chain, currency);
  res.send({code: 1, data: result});
})

export default router;