var express = require('express');
var express_graphql = require('express-graphql');
const cors = require('cors');
var { buildSchema } = require('graphql');
const app = express();

require('dotenv').config();
// GraphQL schema for node express 
var schema = buildSchema(`
    type Query {
        food(id: Int!): Food
        foods(meal: String): [Food]
    },
    type Mutation {
        updateFoodMeal(id: Int!, meal: String!): Food
    },
    type Food {
        id: Int
        name: String
        description: String
        carbs: String
        proteins: String
        fats: String
        meal: String
    }
`);
var foodsData = [
    {
        id: 1,
        name: 'Acai Bowl',
        description: 'cocoa with a blend of acai seeds',
        carbs: '33',
        proteins: '10',
        fats: '2',
        meal: 'lunch'
    },
    {
        id: 2,
        name: 'Quest Protein Bar',
        description: 'chocolate chip cookie dough',
        carbs: '10',
        proteins: '15',
        fats: '1',
        meal: 'snack'
    },
    {
        id: 3,
        name: 'Quinoa & Brown Rice',
        description: 'rich in vitamins , minerals and proteins',
        carbs: '45',
        proteins: '25',
        fats: '1',
        meal: 'lunch'
    }
]
var getFood = function(args) { 
    var id = args.id;
    return foodsData.filter(food => {
        return food.id == id;
    })[0];
}
var getFoods = function(args) {
    if (args.meal) {
        var meal = args.meal;
        return foodsData.filter(food => food.meal === meal);
    } else {
        return foodsData;
    }
}
var updateFoodMeal = function({id, meal}) {
    foodsData.map(food => {
        if (food.id === id) {
            food.meal = meal;
            return food;
        }
    });
    return foodsData.filter(food => food.id === id) [0];
}

var root = {
    food: getFood,
    foods: getFoods,
    updateFoodMeal: updateFoodMeal
};
// Create an express server and a GraphQL endpoint

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use('/', (req, res) => res.send("Welcome To Manasa Mannava's Food API"));

app.listen(process.env.PORT, () => console.log('Food API Server is ready on localhost:' + process.env.PORT +'/graphql'));