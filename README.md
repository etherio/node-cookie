# etherio-cookie

## Installation

```sh
    npm install etherio-cookie
```

## Usage

```js
//* importing module
const cookie = require('etherio-cookie');
```

## Parse Cookie From String

```js
var cookies = cookie.parse(request.headers.cookie);
```

_or_

```js
var cookies = cookie.parse('<cookie-name>=<cookie-value>;<more-cookie>=<more-value>');
```

## Create/Set Cookie

```js
// if u want to add setHeader(cookie) on response, add response variable in second argument
cookies.add({
    name: 'string:required',
    value: 'string:required',
    expires: new Date,
    secure: false,
    httponly: false,
    domain: '*',
    path: '/',
    samesite: 'Las'
}, response);
```

_or_

```js
cookie.create({
    name: 'string:required',
    value: 'string:required',
    expires: new Date,
    secure: false,
    httponly: false,
    domain: '*',
    path: '/',
    samesite: 'Las'
});
```

