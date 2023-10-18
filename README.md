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


## 🧞 API Endpoints

|Method | Slug                      | Response                                         |
|:-------| :------------------------ | :----------------------------------------------- |
|GET| [/api/formal/cup](/api/formal/cup)         | Formal CUP exchange rate of the day      |
|GET  | [/api/informal/cup](/api/informal/cup)       | Informal CUP exchange rate of the day    |