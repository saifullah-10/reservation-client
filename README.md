# Documentation

How to run this application locally?

Recently, this application's client-side has been hosted in Firebase and the server side has been hosted in Vercel. If you want to run this application in your local environment, you need to follow some steps.
- First, clone the client side code using git clone <--repository link-->.
- Install node modules using npm install.
- Install Axios (Follow axios documentation).
- Install Tanstack query (Follow Tanstack query documentation).
- Install Tailwind CSS (Follow Tailwind CSS documentation).
- Change the URL from Reservation.jsx file to your local server URL.(If you don't setup server in your local system, no need to follow this step)
  
Now, let's set up server-side code in your local environment.
 Repository link for server-side:  

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
