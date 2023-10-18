import * as cheerio from "cheerio";

export async function GET() {
  let response, body;

  try {
  response = await fetch("https://www.cadeca.cu/");
  body = await response.text();
  } catch(e){
    return new Response(e, { status: 200, headers: { "Content-Type": "application/json" } });
  }

  const $ = cheerio.load(body);

  let api_response = {
    target_currency: "CUP",
    data_source: "https://www.cadeca.cu/",
    date_time: new Date().toISOString(),
    exchange_rate: []
  }

  $("#quicktabs-tabpage-m_dulo_tasa_de_cambio-0 tbody tr").map((i, el) => {
    let rate = { };
    $(el)
      .find("td")
      .each((index, element) => {
        if (index == 1) {
          rate.source_currency = $(element).text().replace(/\s/g, "");
        }
        if (index == 2) {
          rate.buy = parseFloat($(element).text());
        }
        if (index == 3) {
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
