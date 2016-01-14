'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//Update price info and commisions for each rental
function updatePrice()
{
    rentals.forEach(
        function(eachRental)
        {
            cars.forEach(
            function(eachCar)
            {  
                if(eachCar.id == eachRental.carId)
                {
                    //time is calculated in milliseconds
                    var time =(1+(new Date(eachRental.returnDate) - new Date(eachRental.pickupDate))/(24*3600*1000));
              
                    var newPricePerDay = eachCar.pricePerDay;
                    if(time>1)
                        {
                            newPricePerDay = eachCar.pricePerDay*0.90;
                        }
               
                    
                    if(time>4)
                        {
                            newPricePerDay = eachCar.pricePerDay*0.70;
                        }
                
                    if(time>10)
                        {
                            newPricePerDay = eachCar.pricePerDay*0.50;
                        }
                    
               
                    var km = eachRental.distance*eachCar.pricePerKm ;
                    
                    //Deductible option
                    if(eachRental.options.deductibleReduction)
                    {
                        eachRental.price = time*newPricePerDay + km + 4*time;
                    }
                    else
                    {
                        eachRental.price = time*newPricePerDay + km;
                    }
                    
                    
                    //Calculate the commision
                    if(eachRental.options.deductibleReduction)
                        {
                            var commision = (eachRental.price-4*time)*0.30;
                            eachRental.commission.assistance = commision*0.50;
                            eachRental.commission.insurance = 1*time;
                            eachRental.commission.drivy = commision - eachRental.commission.assistance - eachRental.commission.insurance + 4*time;
                        }
                    else
                        {
                            var commision = eachRental.price*0.30;
                            eachRental.commission.assistance = commision*0.50;
                            eachRental.commission.insurance = 1*time;
                            eachRental.commission.drivy = commision - eachRental.commission.assistance - eachRental.commission.insurance;
                        }
                    
                }
            });
        }
    );
}

//returns rental informations which corresponds to the rentalId
function getRentalbyId(id)
{
    var rentalInfo = 0;
    rentals.forEach(
    function(eachRental)
        {
            if(eachRental.id==id)
                {
                    rentalInfo = eachRental;
                }
        }
    );
    return rentalInfo;
}

//Modify the flow of the money
function updateMoneyFlow(eachPayment,moneyflow)
{
    if(moneyflow)
        {
            eachPayment.type = 'credit';
        }
    else
        {
            eachPayment.type = 'debit';
        }
}

//Update the payment information for each actor
function updatePayment(eachActor,rentalInfo)
{
    eachActor.payment.forEach(
    function(eachPayment)
        {
            var moneyFlow = false;
            if(rentalInfo.price < 0)
                {
                    moneyFlow = true;
                }
            
            switch(eachPayment.who)
            {
                case 'driver':
                    eachPayment.amount = Math.abs(rentalInfo.price);
                    updateMoneyFlow(eachPayment, moneyFlow);
                    break;
                case 'insurance':
                    eachPayment.amount = Math.abs(rentalInfo.commission.insurance);
                    updateMoneyFlow(eachPayment, !moneyFlow);
                    break;
                case 'assistance':
                    eachPayment.amount = Math.abs(rentalInfo.commission.assistance);
                    updateMoneyFlow(eachPayment, !moneyFlow);
                    break;
                case 'drivy':
                    eachPayment.amount = Math.abs(rentalInfo.commission.drivy);
                    updateMoneyFlow(eachPayment, !moneyFlow);
                    break;
                case 'owner':
                    eachPayment.amount = Math.abs(rentalInfo.price - rentalInfo.commission.assistance - rentalInfo.commission.drivy - rentalInfo.commission.insurance);
                    updateMoneyFlow(eachPayment, !moneyFlow);
                    break;
            }
        }
    )
}

//Update Actor information
function updateActor()
{
    actors.forEach(
    function(eachActor)
        {
            var rentalInfo = getRentalbyId(eachActor.rentalId);
            updatePayment(eachActor,rentalInfo);
        }
    );
}

//Applies all modifications
function applyModification()
{
    var deltaprice = [];
    rentalModifications.forEach(
    function(eachMod)
        {
            var rentalInfo = getRentalbyId(eachMod.rentalId);
            var tempPrice = rentalInfo.price;
            console.log("Price before modification: "+tempPrice);
            if(eachMod.returnDate != null)
                {
                    rentalInfo.returnDate = eachMod.returnDate;
                }
            if(eachMod.pickupDate != null)
                {
                    rentalInfo.pickupDate = eachMod.pickupDate;
                }
            if(eachMod.distance != null)
                {
                    rentalInfo.distance = eachMod.distance;
                }

            updatePrice();
            rentalInfo = getRentalbyId(eachMod.rentalId);
            console.log("Price after modification: "+rentalInfo.price);
            var newPrice = rentalInfo.price - tempPrice;
            deltaprice.push({'rentalId': rentalInfo.id,'price': newPrice})
            
            console.log("DeltaAmount: "+ newPrice);
        }
    );
    
    if(deltaprice.length != 0)
        {
            deltaprice.forEach(
            function(eachPrice)
                {
                    var rentalInfo = getRentalbyId(eachPrice.rentalId);
                    rentalInfo.price = eachPrice.price;
                }
            )
        }
    updateActor();
}


updatePrice();
updateActor();
applyModification();

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
