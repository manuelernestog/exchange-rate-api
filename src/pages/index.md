# 💱 Free and Open Source Cuban Exchange Rate API

This API just facilitates the consumption of exchange rate information, the values shown here come from third-party sources. Data is updated every 12 hours. We are not responsible for the stability of this API, please use it for your project at your own risk or host your own instance.

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
- **Request Example**: GET https://exchange-rate.decubba.com/api/v2/informal/source/cup.json
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

### ➡️ v1 (Deprecated)

|Method | Slug                      | Response                                         |
|:-------| :------------------------ | :----------------------------------------------- |
|GET| [/api/formal/cup](/api/formal/cup)         | Formal CUP exchange rate of the day      |
|GET  | [/api/informal/cup](/api/informal/cup)       | Informal CUP exchange rate of the day    |

----

## 👨‍💻 Source Code 

https://github.com/decubba/exchange-rate-api
