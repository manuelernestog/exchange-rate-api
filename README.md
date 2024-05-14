# 💱 Free and Open Source Exchange Rate API

Esta API no es más que un wrapper para entregar los datos de las tazas de cambio de una forma sencilla de procesar por una aplicación. Todos los datos se toman de fuentes de terceros y son actualizados segun se defina el intervalo de compilacion de la API o en tiempo real si se utiliza SSR.

## Stack

Astro y jabaescri :)

## Instalacion

Required Node 18 or higher

```sh
pnpm install
pnpm run dev
```

## Despliegue

### Server Side Render

Para crear un despliegue en demanda, siga las instrucciones en la página oficial de Astro.

https://docs.astro.build/en/guides/server-side-rendering/

### Static

El despliegue estático se realiza por defecto y se puede llevar a cabo en cualquier PaaS como Vercel, Netlify, Github Pages, Cloudflare Page, etc.

De esta forma, al generarse los endpoint de forma estática se pueden recibir request ilimitados y no hay que preocuparse por el consumo de recursos.

El problema en este caso es que al ser estático necesitamos que la compilación del sitio se ejecute de forma automática cada cierto tiempo (como la información es diaria, podría será cada 12 o 24 horas) para actualizar los valores. Para lograr esto vamos a programar un cronjob que dispare un trigger para recompilar el sitio en el PaaS donde lo desplegamos.

## 📊 Fuentes de datos

- https://www.directoriocubano.info/cadeca/ (La misma que https://www.cadeca.cu)
- https://divisascu.app/
- https://mdiv.pro/

Si quiere tomar otra funte de datos tiene que configurarla directamente en los metodos que extraen la informacion de dichas fuentes.

## 🧞 API Doc

- `GET` /api/v2/formal/source/{symbol}.json
  
Returns the daily exchange rate for the selected currency.
[Symbol] = cad | chf | cup | eur | gbp | jpy | mxn | usd   

- `GET` /api/v2/formal/target/{symbol}.json
  
Returns the daily exchange rate for the selected currency in the opposite direction (Good to use when the value of the origin is a fraction of the others currencies)
[Symbol] = cad | chf | cup | eur | gbp | jpy | mxn | usd

- `GET` /api/v2/informal/source/{symbol}.json
  
Returns the daily exchange rate for the selected currency
[Symbol] = usd | mlc | eur | cup

- `GET` /api/v2/informal/target/{symbol}.json
  
Returns the daily exchange rate for the selected currency in the opposite direction (Good to use when the value of the origin is a fraction of the others currencies)
[Symbol] = usd | mlc | eur | cup

