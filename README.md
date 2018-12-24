# food-api

1) Basic, querying exactly what you need, by passing food id in query variables section
Query:
```
query getSingleFood($foodID: Int!) {
  food(id: $foodID) {
    name
    carbs
    proteins
    fats
  }
}
```
Query variables
```
{ 
    "foodID":1
}

```
