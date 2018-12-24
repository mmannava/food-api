var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
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
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Food-api GraphQL Server Now Running On localhost:4000/graphql'));