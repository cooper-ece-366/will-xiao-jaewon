# Project Dove: Solution to Retail Enthusiasts during the COVID Era

### ECE-366 Software Development and Large System Design
### Professor. Marano
### Will Wu, Xiao Lin, Jaewon Cho

## Intro
- This solution provides a simple platform for retail businesses enthusiasts to obtain information about retail businesses around them.
- Customers will be able to add and remove stores from their list in addition to the default list of stores generated during setup.
- Location information is acquired only with user textual input with minimal user data collection.
- The solution is designed to let customers decide freely when to make trips to stores given the information from the solution.

## Features
- Develop and maintain their own list of stores stored on their local databases.
- Logging into the application with their google account.
- Simple and straightforward user interface to access functionality.
- Add, delete, update to the list of stores unique to each device with relevant information.
- Address, population density and types of the stores are displayed.
- Makes recommendation based on the population density of the stores.

## Business Outcome
- Streamlines the process of obtaining information about in person visits more convenient for visitors.
- Makes recommendation based on population density of stores.
- Allows search based on individual preferences of COVID prevention rules as well as general information about businesses.

## How-To Guide for the Dove App
- Default page http://localhost:3000/.
- Users may choose to log in via the login tab.
- Choosing not to log in will not stop the user from gaining full access to features.
- Starting at the front page, users can navigate the application vias top bar tabs.
- At the Add Store tab, users can add a new store to their interest list with relevant information.
  1) To properly add a store, the address must be correct.
  2) To prevent potential conflicting addresses when multiple streets of the same name exist, put in the borough name at the end of the address.
- The Store List tab by default lists out the built-in list of stores.
  1) Users can edit or delete a store from their interest list on this tab.
  2) To update or delete a store, simply click on the respective buttons.
  3) When updating the store, it is recommended to not change the address.
- In the Store List tab, users can search up stores by exact keywords in types, names, addresses and covid rules.
- In the Proximity tab, users can find the list of stores in database within a certain distance.
  1) Users need to enter a valid address and use the distance scroll bar to filter the list of stores by distance.
  2) The address must be correct for the feature to function correctly.

## Setup Guide (With Intellij)
- Start by cloning the repository to a PC. 
- Ensure that npm is installed correctly on the machine.
- Navigate to dove-app/ in the bottom terminal of Intellij.
- Run 'npm install to' install required components. 
- Setup configurations to build and run RestApiServer under will-xiao-jaewon/dove-service/src/main/java/edu/cooper/ece366/project/dove/server/.
  1) Ensure that a Java 17 sdk is installed. 
- Configure MySQL credentials in application.yml file under will-xiao-jaewon/dove-service/src/main/resources/.
  1) Create a database with a table named "stores".
  2) Configure the username and password as well as the url for the datasource to match the MySQL credentials on the local machine.
- Before running, ensure that port 3000 and 8080 are not already in use by other processes.
- When ready to run, navigate to dove-app/ and run 'npm start' to start the application in a web browser.
- Run RestApiServer to to start the backend services. 
  1) In case of dependency errors, sync using Maven or in Intellij go to 'File' and 'Invalidate Caches' and restart Intellij.
- To generate the default list of stores, navigate to 'dove-app/' and run './add-test-data.sh' or manually insert information about stores via 'Add Store' tab.
- Now you are ready to use Dove!





We plan to develop a mobile app that retailers would use to display store-specific policies regarding masks and social distancing and track population density in-store using QR codes real time.
