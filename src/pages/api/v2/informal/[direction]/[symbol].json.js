const TARGET_SYMBOLS = ["USD", "MLC", "CUP", "EUR"];
const informal_exchange_rate_data = await getInformalExchangeRateData();

export async function GET({ params, request }) {
  const is_target = params.direction == "target";
  const base_symbol = params.symbol.toUpperCase();

  if (!informal_exchange_rate_data) {
    response = await fetch(`https://exchange-rate.decubba.com/api/v2/informal/${params.direction}/${params.symbol}.json`);
    body = await response.text();
    return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
  }

  const rates_to_cup = getRatesToCUP(informal_exchange_rate_data);
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

async function getInformalExchangeRateData() {
  let response, data;
  try {
    response = await fetch("https://api.divisascu.app/api/v2/currencies/active-exchange-rates/");
    data = await response.json();
  } catch (e) {
    data = null;
  }
  return data;
}

function getRatesToCUP(data) {
  let rates = {};
  data.forEach((element) => {
    if (element.source_currency_iso == "CAD") return;
    let rate = {
      buy: element.buy_exchange_rate ? element.buy_exchange_rate.wavg : "-" ,
      sell: element.sell_exchange_rate ? element.sell_exchange_rate.wavg : "-",
      mid: element.mid_exchange_rate.wavg ? element.mid_exchange_rate.wavg : "-",
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
