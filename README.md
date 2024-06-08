# Documentation

How to run this application locally?

Recently, this application's client-side has been hosted in Firebase and the server side has been hosted in Vercel. If you want to run this application in your local environment, you need to follow some steps.
- First, clone the client side code using git clone <--repository link-->.
- Install node modules using npm install.
- Install Axios (Follow axios documentation).
- Install Tanstack query (Follow Tanstack query documentation).
- Install Tailwind CSS (Follow Tailwind CSS documentation).
- Change the URL from Reservation.jsx file to your local server URL. (If you don't set up server in your local system, no need to follow this step)
  
Now, let's set up server-side code in your local environment.

 Repository link for server-side:  https://github.com/saifullah-10/reservation-server

 - Clone the server side code using git clone <--repository link-->.
 - Install node modules using npm install.
 - Install express, cors, pdfkit. (If you don't know how to install please follow their documentation).
 - Set up your local client URL to server root file index.js > cors > origin array. (example: app.use(cors({origin: ["your local URL"])  

If you follow these steps properly, you will  run this application in your local environment.

# Bonus solution:

- I have a Tesla in my system that charges $10 per hour and $50 per day. So if a client rented this car for 6 hours he/she needs to pay $60. But according to our packages, we provide the whole day rent service for $50. This creates a situation where the cost of renting the car for six hours $60 exceeds the daily rate of $50. We need to ensure that the customer always pays the lowest possible rate. Let's make an algorithm:

  First, specify the rates:
 - **Hourly Rate**: $10 per hour
 - **Daily Rate**: $50 per day
 - **Weekly Rate**: $300 per week

Now, calculate the total cost based on hourly rate, daily rate, and weekly rate. Then compare all of the costs and charges to the customer that is the minimum. 


This approach ensures fairness and transparency in the pricing of car rentals, making sure that customers are always offered the best possible rate.

Thank You.
