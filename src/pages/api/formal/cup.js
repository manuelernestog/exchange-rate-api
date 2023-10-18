import * as cheerio from "cheerio";

export async function GET() {
  let response, body;

  try {
  response = await fetch("https://www.directoriocubano.info/cadeca/");
  body = await response.text();
  } catch(e){
    return new Response(e, { status: 200, headers: { "Content-Type": "application/json" } });
  }

  const $ = cheerio.load(body);

  let api_response = {
    target_currency: "CUP",
    data_source: "https://www.directoriocubano.info/cadeca/",
    date_time: new Date().toISOString(),
    exchange_rate: []
  }

  $(".cadeca-exchange-rate tbody tr").map((i, el) => {
    let rate = { };
    $(el)
      .find("td")
      .each((index, element) => {
        if (index == 0) {
          rate.source_currency = $(element).text().replace(/\s/g, "");
        }
        if (index == 1) {
          rate.buy = parseFloat($(element).text());
        }
        if (index == 2) {
          rate.sell = parseFloat($(element).text());
        }
      });
      api_response.exchange_rate.push(rate);
  });

  return new Response(JSON.stringify(api_response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
