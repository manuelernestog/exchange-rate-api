import * as cheerio from "cheerio";

const TARGET_SYMBOLS = ["CAD", "CHF", "CUP", "EUR", "GBP", "JPY", "MXN", "USD"];
const exchange_rate_page = await getExchangeRateData();
let rates_to_cup = extractRateData(exchange_rate_page);

export async function GET({ params, request }) {
  const is_target = params.direction == "target";
  const base_symbol = params.symbol.toUpperCase();

  if (!rates_to_cup) {
    let response = await fetch(`https://exchange-rate.decubba.com/api/v2/formal/${params.direction}/${params.symbol}.json`);
    let data = await response.json();
    return new Response(data, { status: 200, headers: { "Content-Type": "application/json" } });
  }

  const rates = calculateRates(rates_to_cup, base_symbol, is_target);

  let api_response = {
    currency: base_symbol.toUpperCase(),
    exchange_direction: is_target ? "target" : "source",
    date_time: new Date().toISOString(),
    rates: rates,
  };
  return new Response(JSON.stringify(api_response), { status: 200, headers: { "Content-Type": "application/json" } });
}

export function getStaticPaths() {
  let paths = [];
  TARGET_SYMBOLS.forEach((current_symbol) => {
    paths.push({ params: { symbol: current_symbol.toLowerCase(), direction: "source" } });
    paths.push({ params: { symbol: current_symbol.toLowerCase(), direction: "target" } });
  });
  return paths;
}

async function getExchangeRateData() {
  let response, body;
  try {
    response = await fetch("https://www.directoriocubano.info/cadeca/");
    body = await response.text();
  } catch (e) {
    data = null;
  }
  return body;
}

function getRatesToCUP(data) {
  let rates = {};
  data.forEach((element) => {
    let rate = {
      buy: element.buy_exchange_rate.wavg,
      sell: element.sell_exchange_rate.wavg,
      mid: element.mid_exchange_rate.wavg,
    };
    rates[element.source_currency_iso] = rate;
  });
  return rates;
}

function calculateRates(rates_to_cup, base_symbol, is_target = false) {
  let rates = {};
  TARGET_SYMBOLS.forEach((current_symbol) => {
    if (base_symbol == current_symbol) {
      rates[current_symbol] = { buy: 1, sell: 1, mid: 1 };
    } else if (base_symbol == "CUP") {
      rates[current_symbol] = {
        buy: 1 / rates_to_cup[current_symbol].buy,
        sell: 1 / rates_to_cup[current_symbol].sell,
        mid: 1 / rates_to_cup[current_symbol].mid,
      };
    } else if (current_symbol == "CUP") {
      rates[current_symbol] = {
        buy: rates_to_cup[base_symbol].buy,
        sell: rates_to_cup[base_symbol].sell,
        mid: rates_to_cup[base_symbol].mid,
      };
    } else {
      rates[current_symbol] = {
        buy: rates_to_cup[base_symbol].buy / rates_to_cup[current_symbol].buy,
        sell: rates_to_cup[base_symbol].sell / rates_to_cup[current_symbol].sell,
        mid: rates_to_cup[base_symbol].mid / rates_to_cup[current_symbol].mid,
      };
    }

    if (is_target) {
      rates[current_symbol].buy = 1 / rates[current_symbol].buy;
      rates[current_symbol].sell = 1 / rates[current_symbol].sell;
      rates[current_symbol].mid = 1 / rates[current_symbol].mid;
    }
  });
  return rates;
}

function extractRateData(page_body) {
  let rates = {};
  if (!page_body) return null;

  const $ = cheerio.load(page_body);

  $(".cadeca-exchange-rate tbody tr").map((i, el) => {
    var rate = {};
    let currency = "";
    $(el)
      .find("td")
      .each((index, element) => {
        if (index == 0) {
          currency = $(element).text();
        } else if (index == 1) {
          rate.buy = parseFloat($(element).text());
        } else if (index == 2) {
          rate.sell = parseFloat($(element).text());
        }
      });
    rate.mid = (rate.buy + rate.sell) / 2;
    rates[currency] = rate;
  });
  return rates;
}
