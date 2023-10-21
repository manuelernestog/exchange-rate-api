# 💱 Free and Open Source Cuban Exchange Rate API

This API just facilitates the consumption of exchange rate information, the values shown here come from third-party sources. Data is updated every 12 hours. We are not responsible for the stability of this API, please use it for your project at your own risk or host your own instance.

## 📊 Data Sources

- https://www.directoriocubano.info/cadeca/ (Same as https://www.cadeca.cu)
- https://divisascu.app/


## 🧞 API Endpoints

### ➡️ v2

#### /v2/informal/[symbol].json
- **Método:** GET
- **Description:** Returns the daily exchange rate for the selected currency
- **URL-Params:** [symbol] = *usd || mlc || eur || cup*
- **Response Format**:
  ```

  ```
- ***Request Example**: GET https://exchange-rate.decubb.com/api/v2/usd.json

### ➡️ v1 (Deprecated)

|Method | Slug                      | Response                                         |
|:-------| :------------------------ | :----------------------------------------------- |
|GET| [/api/formal/cup](/api/formal/cup)         | Formal CUP exchange rate of the day      |
|GET  | [/api/informal/cup](/api/informal/cup)       | Informal CUP exchange rate of the day    |

## 👨‍💻 Source Code 

https://github.com/decubba/exchange-rate-api
