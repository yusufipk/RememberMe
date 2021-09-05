# RememberMe
A database to save the data of people that I've met. I've created this project because of my personal needs and also I wanted to learn backend. I tried to write the code as much as clean and understandable as I could. If you want to add features please feel free to do so.

I want to implement this to a terminal based program and also a webapp in the future.

## Features
You'll be able to save the data specified below using REST API and MongoDB.

1. Name
2. Where you've met
3. Place (that they live)
4. Contact
	1. Number
	2. e-mail
	3. social media accounts
	4. Website
5. Birthdate
6. Age
7. Likes
8. Dislikes
9. Occupation
10. Last Contact
11. When shold I contact next
12. Additional notes
13. Tags

## Usage
1. `npm install`
2. You'll need to install MongoDB either locally or from the cloud. Once you get your connection string change `./startup/db.js` connection string to your MongoDB adress.
3. You'll need token in order to use REST API. Your private key comes from `process.env.rememberMe_jwtkey` so you want to `setenv process.env.rememberMe_jwtkey "whatever"`
	1. To get your jwtKey write `node -e 'require("./token").createToken()'` to terminal. This token expires in 30 days.
4. Run `node index.js` and you are ready.
	1. Server port starts at `3002` if undefined. You can define the port by using `process.env.port` environment.

### Rest API
You are going to need to set your jwt key header `x-auth-token: yourjwtkey` in order to make requests.

Here are the example requests you can make.

#### GET

##### GET all entries
`http://localhost:3002/api/person/`

##### GET by name 
`http://localhost:3002/api/person/get/Mike`

##### GET by ID 
`http://localhost:3002/api/person/60fabc01465fd12839091b25`

#### POST
`http://localhost:3002/api/person/`

```
{
  "name": "Mike",
  "metAt": "Wall Maria Cafe",
  "place": "Üsküdar",
  "contact": {
    "phone": "12345",
    "email": "123456@gmail.com",
    "socialmedia": {
      "instagram": "mike123",
      "youtube": "mike123",
      "twitter": "mike123"
    }
  },
  "birth": "10.05.1998",
  "age": 22,
  "likes": ["football", "video games"],
  "dislikes": ["cats", "spiders"],
  "occupation": "student",
  "lastseen": "12.07.2021",
  "nextcontact": "15.07.2021",
  "notes": "He is a nice guy.",
  "createdAt": "23.07.2021"
}
```
#### PUT by ID
`http://localhost:3002/api/person/60fabc01465fd12839091b25`

```
{
  "name": "Jimmy",
  "metAt": "Taksim"
}
```
#### DELETE by ID
`http://localhost:3002/api/person/60fabc01465fd12839091b25`

### Required Values
Required values are `name`, `metAt` and `createdAt`. For all rules checkout `./models/person-model.js`
