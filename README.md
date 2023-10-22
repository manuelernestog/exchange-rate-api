# 💱 Free and Open Source Cuban Exchange Rate API

This API just facilitates the consumption of exchange rate information, the values shown here come from third-party sources. Data is updated every 12 hours. We are not responsible for the stability of this API, please use it for your project at your own risk.

## Stack

Astro y jabaescri :)

## Install & Config

Required Node 18 or higher

```sh
pnpm install
pnpm run dev
```

## 📊 Data Sources

- https://www.directoriocubano.info/cadeca/ (Same as https://www.cadeca.cu)
- https://divisascu.app/



----

## 🧞 API Endpoints

----

### ➡️ v2

#### /v2/informal/source/[symbol].json
- **Método:** GET
- **Description:** Returns the daily exchange rate for the selected currency
- **URL-Params:** [symbol] = *usd || mlc || eur || cup*
- **Request Example**: GET https://exchange-rate.decubba.com/api/v2/informal/source/usd.json
- **Response Example**: 
```
{
    "base":"USD",
    "exchange_direction": "source",
    "date_time":"2023-10-21T18:19:14.079Z",
    "rates":{
        "USD":{"buy":1,"sell":1,"mid":1},
        "MLC":{"buy":1.1228762380223851,"sell":1.1076650420912717,"mid":1.1061946902654871},
        "CUP":{"buy":253.54545454545453,"sell":250,"mid":250},
        "EUR":{"buy":0.973676860773635,"sell":0.9701202949165697,"mid":0.9646779459780354}
        }
}
```

#### /v2/informal/target/[symbol].json
- **Método:** GET
- **Description:** Returns the daily exchange rate for the selected currency in the opposite direction (Good to use when the value of the origin is a fraction of the others currencies)
- **URL-Params:** [symbol] = *usd || mlc || eur || cup*
- **Request Example**: GET https://exchange-rate.decubba.com/api/v2/informal/target/cup.json
- **Response Example**: 
```
{
    "currency":"CUP",
    "exchange_direction":"target",
    "date_time":"2023-10-21T20:58:55.720Z",
    "rates":{
        "USD":{"buy":253.54545454545456,"sell":250,"mid":250},
        "MLC":{"buy":225.79999999999998,"sell":225.69999999999996,"mid":225.99999999999997},
        "CUP":{"buy":1,"sell":1,"mid":1},
        "EUR":{"buy":260.4,"sell":257.7,"mid":259.1538461538461}
        }
}
```

#### /v2/formal/source/[symbol].json
- **Método:** GET
- **Description:** Returns the daily exchange rate for the selected currency
- **URL-Params:** [symbol] = *cad || chf || cup || eur || gbp || jpy || mxn || usd*
- **Request Example**: GET https://exchange-rate.decubba.com/api/v2/informal/source/usd.json
- **Response Example**: 
```
{
    "currency":"USD",
    "exchange_direction":"source",
    "date_time":"2023-10-22T00:01:06.134Z",
    "rates":{
        "CAD":{"buy":1.277861193716812,"sell":1.3352722869746458,"mid":1.3075565874449424},
        "CHF":{"buy":0.8452734589799663,"sell":0.8832495580179193,"mid":0.8649162683431553},
        "CUP":{"buy":110.4,"sell":123.6,"mid":117},
        "EUR":{"buy":0.8905098749801571,"sell":0.9305182896531787,"mid":0.9112038825696511},
        "GBP":{"buy":0.7696773880495873,"sell":0.804257096788047,"mid":0.7875634442936181},
        "JPY":{"buy":86.82589991427517,"sell":104.36985433818872,"mid":95.28618431768578},
        "MXN":{"buy":16.859466269614018,"sell":17.616925931943932,"mid":17.251255692361454},
        "USD":{"buy":1,"sell":1,"mid":1}
        }
}
```

#### /v2/formal/target/[symbol].json
- **Método:** GET
- **Description:** Returns the daily exchange rate for the selected currency in the opposite direction (Good to use when the value of the origin is a fraction of the others currencies)
- **URL-Params:** [symbol] = *cad || chf || cup || eur || gbp || jpy || mxn || usd*
- **Request Example**: GET https://exchange-rate.decubba.com/api/v2/formal/target/cup.json
- **Response Example**: 
```
{
    "currency":"CUP",
    "exchange_direction":"target",
    "date_time":"2023-10-22T00:01:06.118Z",
    "rates":
        {"CAD":{"buy":86.39436,"sell":92.56539,"mid":89.47987499999999},
        "CHF":{"buy":130.60862,"sell":139.9378,"mid":135.27321},
        "CUP":{"buy":1,"sell":1,"mid":1},
        "EUR":{"buy":123.97392,"sell":132.8292,"mid":128.40156},
        "GBP":{"buy":143.43672,"sell":153.6822,"mid":148.55946},
        "JPY":{"buy":1.27151,"sell":1.18425,"mid":1.2278799999999999},
        "MXN":{"buy":6.54825,"sell":7.01598,"mid":6.782115},
        "USD":{"buy":110.39999999999999,"sell":123.59999999999998,"mid":116.99999999999999}
        }
}
```

### ➡️ v1 (Deprecated)

|Method | Slug                      | Response                                         |
|:-------| :------------------------ | :----------------------------------------------- |
|GET| [/api/formal/cup](/api/formal/cup)         | Formal CUP exchange rate of the day      |
|GET  | [/api/informal/cup](/api/informal/cup)       | Informal CUP exchange rate of the day    |

----
