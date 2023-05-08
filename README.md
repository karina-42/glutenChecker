# Gluten checker
An app to check if your food contains gluten or not by inputting its barcode number to look up the ingredients.

## Visit here: [Check if your food has gluten](https://karina-42.github.io/glutenChecker/)

![screenshot]()

---

## Table of Contents
- [How it works](#how-it-works)
- [Technologies](#technologies)
- [Lessons learned](#lessons-learned)
- [Improvements](#improvements)


## How it works
My sister has celiac disease so I made a website for her to check if her food has gluten in it. 

After entering a UPC barcode number, the site will use the Open Food Facts API to check the ingredients.

![check]()

You will get a message warning you of its contents and a list of ingredients. Ingredients highlighted in red have gluten.

![has gluten]()

Please test it with these codes:

- 737628064502 gluten-free
- 011110038364 chicken tortilla soup
- 072250011372 bread
- 044000032593 oreo
- 041390000034 soy sauce
- 041196910759 progresso
- 070164008235 matzo soup

This website was inspired by Mayanwolfe's [Vegeterian Checker](https://github.com/Mayanwolfe/Vegetarian_Checker) tutorial.

## Technologies
- HTML5
- CSS3
- JavaScript

## Lessons learned
This site gave me a lot of practice working with an API with the fetch method. I used Postman to test the API. I learned how to find the data I wanted from the API and how to display it. Not only that, but I also practiced Object-oriented programming.

## Improvements
- [ ] Make the user interface nicer
- [ ] Store the history of foods that have been checked
- [ ] Include ability to update a product that may have incorrect information

[Back to top](#gluten-checker)