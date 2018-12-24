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
2) Query with fragments by assigning aliases. This helps to get multiple query results in a single go

Query
```
query getFoodWithFragments($foodID1: Int!, $foodID2: Int!) {
      food1: food(id: $foodID1) {
             ...foodFields
      },
      food2: food(id: $foodID2) {
            ...foodFields
      } 
}

fragment foodFields on Food {
  meal
  carbs
  proteins
  fats
}
```
Query variables:
```
{ 
    "foodID1":1,
    "foodID2":2
}
```


