# Fern

Fern is a React application with full `CRUD` capability. It serves as a personal digital plant care card library. **Fern** allows a user to log their houseplants along with any care information that was provided with the plant on purchase. 

#### Problem
Many people love to fill their houses with a vast array of luscious and beautiful houseplants. However, with all that flora, it can be easy for one to lose track of which types of plants they own, how much water and light they need, and when the last time the plants have been watered. Quickly, all of their luscious green plants turn crunchy and brown. **Fern** aims to solves this problem by arming users with the tools to keep log and keep track of all of this information. 

# 
When a user logs in, they will be taken to a dashboard that shows them the current day and which plants are to be watered on this day. They can then mark them as watered, which will automatically update a `completed` boolean to true in the `JSON` database, and take them off of the list of plants to be watered. Said boolean will be reverted back to false when it is time for them to be watered again.  

# Installation

Install react packages:

```npx create-react-app 
npm i --save react-router-dom
npm instal moment --save


npm start from the root directory to run application
```

# Database sample

Create a json file named database.json with the provided sample data and run a json server watching database.json on port 8088


```{
  "users": [],
  "plants": [],
  "days": [
    {
      "id": 1,
      "day": "Monday"
    },
    {
      "id": 2,
      "day": "Tuesday"
    },
    {
      "id": 3,
      "day": "Wednesday"
    },
    {
      "id": 4,
      "day": "Thursday"
    },
    {
      "id": 5,
      "day": "Friday"
    },
    {
      "id": 6,
      "day": "Saturday"
    },
    {
      "id": 0,
      "day": "Sunday"
    }
  ],
"rooms": []
} 
```

# Usage
- login or register as a new user 
- navagate to the `add plant` view
- fill in the form fields for the plant you are adding
- add as many plants as you have 
- navagate to the `My Plants` to view all of your plants
- click the name of the plant to view more information and to update/delete the plant
- navagate to the `dashboard` to view plants to water today
- water your plants and mark them as watered :) 
