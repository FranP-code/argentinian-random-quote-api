# Argentinian Random Quote API

With this API you can generate random famous quotes from the popular culture of Argentina.

## Endpoints

- Get all quotes: **GET** to https://argentinian-random-quote-api.up.railway.app/api/v1/all-quotes

- Get random quote: **GET** to https://argentinian-random-quote-api.up.railway.app/api/v1/random-quote

    Obligatory, this request have to include this two headers:
    ```js
    quantity: x, //Quantity of quotes
    repeated: boolean //If you want repeated words (true or false)
    ```

## How to contribute?

You can contribute with
- The code in this repository
- The code in the [original NPM module repository](https://github.com/FranP-code/argentinian-random-quote) 
- The quotes in the [original NPM module repository](https://github.com/FranP-code/argentinian-random-quote)

As soon as the pull request is accepted, the quotes will be accessible from the API
