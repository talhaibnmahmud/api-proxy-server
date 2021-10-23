# Node API Proxy Server

This is a `API Proxy Server` built with `nodejs-express (typescript)` for

- Hide API Key (Proxy)
- Rate Limiting
- Caching

This example uses the [OpenWeather API](https://openweathermap.org/api) but the concept can be adopted for any project.

## Usage

### Install Dependencies

```back
npm install
```

## Development

### Run the development server

```bash
npm run dev
```

### Tailwind CSS watch

```bash
npm run watch-css
```

## Build

### Build JS bundle from TS

```bash
npm run build
```

### Build CSS (Minified)

```bash
npm run build-css
```

## Add API info

Rename **.env.example** to **.env** and edit the values

- API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather`
- API_KEY_NAME = "appid"
- API_KEY_VALUE = (Your API Key)

Go to the [OpenWeather API](https://openweathermap.org/api) site and modify the links as you need.

- Add new routes as your need
- Change rate limiting and caching to your desired values

And you are good to go.
