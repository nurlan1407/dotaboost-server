## hello
### in order to run the server firstly add products to your mongoDb database


### this inserts services

```
  db.Services.insertMany([
  {
    id: 1,
    title: "MMR Boost",
    price: 0.72,
    multiplier: 1,
    imgLink: 'http://localhost:8080/static/assets/dota2/card_mmrBoost.png'
  },
  {
    id: 2,
    title: "Low priority",
    price: 0.72,
    multiplier: 1,
    imgLink: 'http://localhost:8080/static/assets/dota2/card_lowPriority.png'
  },
  {
    id: 3,
    title: "Calibration",
    price: 0,
    multiplier: 1,
    imgLink: 'http://localhost:8080/static/assets/dota2/card_calibration.png'
  },
  {
    id: 4,
    title: "Low priority",
    price: 23,
    multiplier: 1000,
    imgLink: 'http://localhost:8080/static/assets/dota2/card_behaviour.png'
  }
])
```

### this inserts products
```
db.Products.insertMany([
        {
            serviceId:3,
            name:"Herald",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/herald.png",
            price:2
        },
        {
            serviceId:3,
            name:"Guardian",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/guardian.png",
            price:2
        },
        {
            serviceId:3,
            name:"Crusader",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/crusader.png",
            price:2
        },
        {
            serviceId:3,
            name:"Archon",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/archon.png",
            price:3
        },
        {
            serviceId:3,
            name:"Legend",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/legend.png",
            price:3
        },
        {
            serviceId:3,
            name:"Ancient",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/ancient.png",
            price:3
        },
        {
            serviceId:3,
            name:"Divine",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/divine.png",
            price:3
        },
         {
            serviceId:1,
            name:"Herald",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/herald.png",
            price: 36
        },
        {
            serviceId:1,
            name:"Guardian",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/guardian.png",
            price: 36
        },
        {
            serviceId:1,
            name:"Crusader",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/crusader.png",
            price:40
        },
        {
            serviceId:1,
            name:"Archon",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/archon.png",
            price:42.5
        },
        {
            serviceId:1,
            name:"Legend",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/legend.png",
            price:90
        },
        {
            serviceId:1,
            name:"Ancient",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/ancient.png",
            price:205
        },
        {
            serviceId:1,
            name:"Divine",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/divine.png",
            price:700
        },
    ])
```


