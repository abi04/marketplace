# Marketplace Api
The marketplace allows employers to post jobs, while perspective self employed can bid for projects.


## TO INSTALL ON LOCAL MACHINE
- Git Clone the repository to your local machine.
- Run the command ```npm install``` to download the required dependencies.
- Then type ```npm start``` in terminal inside the directory.
- The server will start on port ```3000 ```

## Questions
* The time the exercise took (after dev environment is set up) 3 hours 
* Exercise Difficulty: Moderate
* How did you feel about the exercise itself? 8 , Excellent way to analyse coding style and design patterns 
* How do you feel about coding an exercise as a step in the interview process?  8
* What would you change in the exercise and/or process? It should be either the online coding challenge and technical phone screening by Karat or a smiliar backend assessment test by intuit. I have been through both and it seems too much at this stage.

## Usage

### Seller

* Manages the projects on the system

**Endpoint: /** 

### GET /project

Get the list of open projects

```
[
    {
        "_id": 13,
        "description": "This is my project#6",
        "maxBudget": 1000,
        "lastTime": "01/13/18",
        "lowestBid": 1000,
        "lowestBuyer": "No Buyer Yet",
        "status": true,
        "__v": 0
    },
    {
        "_id": 14,
        "description": "This is my project#6",
        "maxBudget": 1000,
        "lastTime": "01/13/18",
        "lowestBid": 1000,
        "lowestBuyer": "No Buyer Yet",
        "status": true,
        "__v": 0
    },
    {
        "_id": 15,
        "description": "This is my project#6",
        "maxBudget": 1000,
        "lastTime": "01/13/18",
        "lowestBid": 93,
        "lowestBuyer": "Buyer 3",
        "status": true,
        "__v": 0
    },
    {
        "_id": 16,
        "description": "This is my project#7",
        "maxBudget": 10000,
        "lastTime": "01/13/18",
        "lowestBid": 10000,
        "lowestBuyer": "No Buyer Yet",
        "status": true,
        "__v": 0
    },
    {
        "_id": 17,
        "description": "This is my project#8",
        "maxBudget": 2000,
        "lastTime": "01/13/18",
        "lowestBid": 2000,
        "lowestBuyer": "No Buyer Yet",
        "status": true,
        "__v": 0
    }
]
```
*Note*: This method will return active projects and filter the expired ones.

### GET /cproject

Get the list of expired projects

```
[
    {
        "_id": 8,
        "description": "This is my project",
        "maxBudget": 3000,
        "lastTime": "01/01/18",
        "lowestBid": 2300,
        "lowestBuyer": "buyer1",
        "status": false,
        "__v": 0
    },
    {
        "_id": 9,
        "description": "This is my project#2",
        "maxBudget": 2500,
        "lastTime": "01/11/18",
        "lowestBid": 2200,
        "lowestBuyer": "buyer2",
        "status": false,
        "__v": 0
    },
    {
        "_id": 10,
        "description": "This is my project#3",
        "maxBudget": 4000,
        "lastTime": "01/12/18",
        "lowestBid": 1999,
        "lowestBuyer": "buyer3",
        "status": false,
        "__v": 0
    },
    {
        "_id": 11,
        "description": "This is my project#4",
        "maxBudget": 300,
        "lastTime": "01/12/18",
        "lowestBid": 300,
        "lowestBuyer": "No Buyer Yet",
        "status": false,
        "__v": 0
    },
    {
        "_id": 12,
        "description": "This is my project#5",
        "maxBudget": 2001,
        "lastTime": "01/12/18",
        "lowestBid": 2001,
        "lowestBuyer": "No Buyer Yet",
        "status": false,
        "__v": 0
    }
]
```

### GET /project/{id}

Get the the project identified by {id} in the URL

```
{
    "_id": 15,
    "description": "This is my project#6",
    "maxBudget": 1000,
    "lastTime": "01/13/18",
    "lowestBid": 93,
    "lowestBuyer": "Buyer 3",
    "status": true,
    "__v": 0
}
```

### POST /create

Create a new project on the system. Request body is an application/json object with all project parameters:

```
{
"description": "This is my project#13",
"maxBudget": "4300",
"lastTime": "MM/DD/YY"
}
```
Object properties if null or invalid format, then project won't be created and error message will be returned.
lastTime is parsed and checked if it is a valid future date.

The server will return a copy of the object in application/json format as described under GET /project/{id}.


### Buyer

Manges buyer and their bids on the system

**Endpoint: /buyer** 

### POST /buyer/bid

Creates a project bid. Request body is an application/json object with all buyer parameters:

```
{
	"buyerID" : "buyer 1",
	"bid" : "3",
	"projectID" : "15"	
 }
```

*Note* : The properties cannot be null and should be in a valid format.

The bid can be on only active projects and the bid should be lesser than the current bid.

The server will return a copy of the object in application/json format as described under GET /project/{id}.














