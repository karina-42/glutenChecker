document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  let choice = document.querySelector('input').value
  // if(choice.length !== 12) {
  //   alert(`Please ensure that barcode is 12 characters`)
  //   return
  // }


  const url = `https://world.openfoodfacts.org/api/v0/product/${choice}.json`
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.status === 1) {
        const item = new ProductInfo(data.product)
        item.showInfo()
        item.listIngedients()
        item.checkForGluten()

      } else if (data.status === 0) {
        alert(`Product ${choice} not found. Please try another`)
      }

    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}

class ProductInfo {
  constructor(productData) {
    this.name = productData.product_name
    this.ingredients = productData.ingredients
    this.image = productData.image_url
    this.allergens = productData.allergens_hierarchy
  }

  showInfo() {
    document.getElementById('product-img').src = this.image
    document.getElementById('product-img').alt = 'Image is not available'
    document.getElementById('product-name').textContent = this.name
  }

  checkForGluten() {
    let glutenStatus = document.getElementById('gluten-status')
    if (this.allergens.length === 0) { //if there's nothing in the allergens hierarchy array
      glutenStatus.textContent = `Gluten free! No allergens listed so maybe it's gluten free`
    } else if (this.allergens.includes('en:gluten')) { //if one item of allergens hierarchy array is gluten
      glutenStatus.textContent = `Danger! This  has gluten`
    } else { //if no items of allergens array is gluten
      glutenStatus.textContent = `Gluten free! Gluten is not included as an allergen`
    }
    document.getElementById('disclaimer').textContent = '*double-check the ingredients list'
  }

  listIngedients() {
    let tableRef = document.getElementById('ingredient-table')
    for (let i = 1; i < tableRef.rows.length;) { //delete rows each time you enter a new item
      tableRef.deleteRow(i)
    }
    if (!(this.ingredients == null)) { //using == tests against undefined, etc without checking for each falsy value
      for(let key in this.ingredients) {
        let newRow = tableRef.insertRow(-1) //-1 at the end of my table
        let newICell = newRow.insertCell(0)
        // let newVCell = newRow.insertCell(1)
        let newItext = document.createTextNode(
          this.ingredients[key].text.toLowerCase()
        )
        // let vegStatus = this.ingredients[key].vegetarian
        // let newVtext = document.createTextNode(vegStatus)

        newICell.appendChild(newItext)
        // newVCell.appendChild(newVtext)

        let glutenArray = ['barley', 'rye', 'wheat', 'malt', 'brewer\'s yeast', 'oats', 'flour', 'bulgur', 'couscous', 'farina', 'semolina']
        let safeArray = ['maltodextrin', 'corn maltodextrin', 'corn masa flour', 'corn flour', 'cassava flour', 'coconut flour' , 'almond flour']
        
        for(let item of glutenArray) {
          // console.log(item === this.ingredients[key].text)
          for (let el of safeArray) {
          if (this.ingredients[key].text.toLowerCase().includes(item)) {
            newICell.classList.add('avoid') 
          console.log(`${this.ingredients[key].text}`)
          }
          if (this.ingredients[key].text.toLowerCase().includes(el)) {
            newICell.classList.remove('avoid')
          }
        }
      }
      }
    } else {
      let newRow = tableRef.insertRow(-1) //-1 at the end of my table
      let newICell = newRow.insertCell(0)
      // let newVCell = newRow.insertCell(1)
      let newItext = document.createTextNode(
        'no ingredients listed'
      )
      newICell.appendChild(newItext)
    }
  }

  // highlightGlutenIngredients() {
  //   let glutenArray = ['barley', 'rye', 'wheat', 'malt', 'brewer\'s yeast', 'oats', 'flour']
  //   for(let item of glutenArray) {
  //     for(let key in this.ingredients){
  //       // console.log(this.ingredients[key].text)
  //       if (this.ingredients[key].text.includes(item)) {
  //         newICell.classList.add('avoid') 
  //       }
  //     }
  //   }

  // }

}

//barley, rye, wheat, malt, brewer's yeast, oats

// 737628064502 gluten-free
// 011110038364 chicken tortilla soup
// 072250011372 bread
// 044000032593 oreo
// 041390000034 soy sauce
// 041196910759 progresso
// 070164008235 matzo soup
// 011110098542 peanut butter
// 076808502947 rigatoni