# Story: Renting a house
## Use Case 01

As a system user

In order to get an available house in a specific neighborhood

Given a neighborhood containing 5 different houses

When I check if there's a house available

Then it should choose randomly a house from the neighborhood chosen

## Use Case 02

As a system user

In order to calculate the final renting price

Given a customer who wants to rent a house for 12 months

And he is 50 years old

When he chooses a house that costs $560.35 per month

Then I must add the Tax of his age which is 15% to the house renting price

Then the final formula will be `((price per month * Tax) * number of months)`

And the final result will be `((560.35 * 1.15) * 12)= 7,732.83`

And the final price will be printed in Brazilian Portuguese format as "R$ 7.732,83"

## Use Case 03

As a system user

In order to register a renting transaction

Given a registered customer who is 50 years old

And a house that costs $560.35 per month

And a delivery date that is for 12 months behind

And given an actual date 15/01/2022

When I rent a house I should see the customer data

And the selected house

And the final price which will be R$ 7.732,83

And DueDate which will be printed in Brazilian Portuguese format "16 de Janeiro de 2023"