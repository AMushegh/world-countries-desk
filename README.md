# World Countries Desk (React App)

## Technical Overview

This is a React project that uses Webpack as its bundler. To start the app, run `npm start`, and to build it, run `npm run build`. The UI library used is Ant Design.

The project also includes a custom state management tool and an IOC container called Tsyringe. Additionally, there are two custom hooks, `useController` and `useStore`, that provide an API to sync store changes with the UI.

The state management tool is designed to simplify the process of managing application state. It includes support for actions, reducers, and selectors. The IOC container is used to manage dependencies, and it helps keep the code organized and maintainable.

The custom hooks, `useController` and `useStore`, are designed to work together to provide a simple way to synchronize state changes with the UI. The `useController` hook is used to handle UI events, and it passes the event to a service. The service then updates the state, and the `useStore` hook is used to retrieve the updated state.

Events are passed through the controller and then to services, which manage what to do with UI events (such as mounts, clicks, etc.). This architecture helps keep the code organized and maintainable, and it allows for easy testing and debugging.

## Business Overview

This app displays a countries desk with data(including the name, flag, area, etc.) of each country. Users can click on a country to view more detailed information about it, such as its capital city, official languages.

The app is designed to be user-friendly and easy to navigate. The Ant Design UI library provides a modern and clean interface, and the custom state management tool ensures that the app is fast and responsive. Overall, the Countries Desk React App is a powerful and flexible application that is suitable for a wide range of use cases.
