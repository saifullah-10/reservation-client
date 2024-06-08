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

 Repository link for server-side:  https://github.com/saifullah-10/reservation-server

 - Clone the server side code using git clone <--repository link-->.
 - Install node modules using npm install.
 - Install express, cors, pdfkit. (If you don't know how to install please follow their documentation).
 - Set up your local client URL to server root file index.js > cors > origin array. (example: app.use(cors({origin: ["your local URL"])  

If you follow these steps properly, you will  run this application in your local environment.

Thank You
