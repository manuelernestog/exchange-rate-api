export async function GET() {
  let response, exchanges;

  try {
    response = await fetch("https://api.divisascu.app/api/v2/currencies/active-exchange-rates/");
    exchanges = await response.json();
  } catch (e) {
    return new Response(e, { status: 200, headers: { "Content-Type": "application/json" } });
  }

  let api_response = {
    target_currency: "CUP",
    data_source: "https://www.divisascu.app/",
    date_time: new Date().toISOString(),
    exchange_rate: [],
  };

  exchanges.forEach((element) => {
    let rate = {
      source_currency: element.source_currency_iso,
      buy: element.buy_exchange_rate.wavg,
      sell: element.sell_exchange_rate.wavg,
      mid: element.mid_exchange_rate.wavg,
    };
    api_response.exchange_rate.push(rate);
  });

  return new Response(JSON.stringify(api_response), { status: 200, headers: { "Content-Type": "application/json" } });
}
