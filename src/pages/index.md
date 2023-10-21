# 💱 Free and Open Source Cuban Exchange Rate API

This API just facilitates the consumption of exchange rate information, the values shown here come from third-party sources. Data is updated every 12 hours. We are not responsible for the stability of this API, please use it for your project at your own risk or host your own instance.

## 📊 Data Sources

- https://www.directoriocubano.info/cadeca/ (Same as https://www.cadeca.cu)
- https://divisascu.app/

----

## 🧞 API Endpoints

----

### ➡️ v2

#### /v2/informal/base/[symbol].json
- **Método:** GET
- **Description:** Returns the daily exchange rate for the selected currency
- **URL-Params:** [symbol] = *usd || mlc || eur || cup*
- **Request Example**: GET https://exchange-rate.decubba.com/api/v2/informal/usd.json
- **Response Example**: 
```
{
    "base":"USD",
    "date_time":"2023-10-21T18:19:14.079Z",
    "rates":{
        "USD":{"buy":1,"sell":1,"mid":1},
        "MLC":{"buy":1.1228762380223851,"sell":1.1076650420912717,"mid":1.1061946902654871},
        "CUP":{"buy":253.54545454545453,"sell":250,"mid":250},
        "EUR":{"buy":0.973676860773635,"sell":0.9701202949165697,"mid":0.9646779459780354}
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
