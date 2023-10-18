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

- https://www.directoriocubano.info/cadeca/
- https://divisascu.app/


## 🧞 API Endpoints

| slug                      | Response                                         |
| :------------------------ | :----------------------------------------------- |
| [/api/formal/cup](/api/formal/cup)         | Returns formal CUP exchange rate of the day      |
| [/api/informal/cup](/api/informal/cup)       | Returns informal CUP exchange rate of the day    |