

let cartItemCount = 1;
//input field er kaj ses


//food show korar method by default
const ShowFoodsDefault = () => {
    //API theke fetch kore show koro sob foods


    //sob letters gulo generate korchi ----------
    let letters = [];
    for (let i = 97; i <= 122; i++) {
        letters.push(String.fromCharCode(i));
    }
    // shuffle korchi sob letter gulo
    for (let i = letters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    let randomString = letters.join(""); //array ta k string e convert korlam
    //sob letters gulo generate kora ses ----------

    //each letter onujayi item fetch kore ante hbe
    for (let char of randomString) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${char}`)
            .then(response => response.json())
            .then(elements => {
                //ekhane elements er moddhe object thakbe
                //oi object er moddhe drinks nam e array thake, tar moddhe each drinks er info thakbe
                if (elements.drinks) {
                    for (let element of elements.drinks) {
                        //each element accessed!
                        //akhn show koro
                        const container = document.getElementById("show-all-items")
                        const div = document.createElement("div")
                        div.classList.add("card-design")
                        div.id = "card-design"
                        div.innerHTML = `
                    <img src="${element.strDrinkThumb}" class="img-size" alt="">
                    <p><span class="name-tag">Name: ${element.strDrink}</span><span><br></span>Category: ${element.strCategory}</p>
                    <p class="instruction">Instruction: ${element.strInstructions}</p>
                    <button id="add-to-cart-btn" class="add-to-cart-btn">Add to cart</button>
                    <button id="details-btn" class="details-btn">Details</button>
                    `
                        //details button e click korle modal er moddhe detils show koro
                        const selector = div.querySelector(".details-btn")
                        selector.addEventListener("click", (event) => {
                            //each card e click korle modal pop up hbe, then details show korbe
                            ShowDetailsThroughModal(element)
                            console.log("Details button clicked");
                        })

                        //add to cart button
                        const addtocartbutton = div.querySelector(".add-to-cart-btn")
                        addtocartbutton.addEventListener("click", (event) => {
                            if (cartItemCount == 8) {
                                alert("Cannot add items more than 7")
                            }
                            else {
                                addtocartbutton.innerText = "Already selected";
                                addtocartbutton.style.border = "2px solid pink";
                                addtocartbutton.style.color = "pink";
                                addtocartbutton.style.backgroundColor = "white";
                                addItemToCart(element)
                                cartItemCount = cartItemCount + 1;
                            }
                            addtocartbutton.disabled = true;
                        })

                        container.appendChild(div)
                    }
                }

            })
    }

}
ShowFoodsDefault()

const addItemToCart = (element) => {
    const container = document.getElementById("cart-items")
    const div = document.createElement("div")
    div.innerHTML = `
        <p>${cartItemCount}</p>
        <img src="${element.strDrinkThumb}" class="cart-img-size" alt="">
        <p>${element.strDrink}</p>
        
    `
    document.getElementById("cart-count").innerText = cartItemCount;
    div.classList.add("newcartitem")
    console.log(div);
    container.appendChild(div)

}


//add eventlistener to button
document.getElementById("search-button").addEventListener("click", (event) => {
    const inputValue = document.getElementById("input-field").value;
    console.log("Input value: ", inputValue);
    //food show koro
    ShowSearchedFood(inputValue);
    document.getElementById("input-field").value = ""
})
//get input from from keyboard pressing "enter"
document.addEventListener("keydown", (event) => {
    const inputValue = document.getElementById("input-field").value;
    if (event.key === "Enter") {
        console.log("Input value: ", inputValue);
        ShowSearchedFood(inputValue);
        document.getElementById("input-field").value = ""
    }

})



//modal er moddhe value show korar jnno method
const ShowDetailsThroughModal = (element) => {
    //ekhane modal add koro
    const modal =
        new bootstrap.Modal(
            document.getElementById("drinkModal")
        );

        document.getElementById("modal-title").innerText = element.strDrink;
        document.getElementById("modal-body").innerHTML = `
        <img src="${element.strDrinkThumb}" class="img-size" alt="">
        
        <p style="font-weight: bold;">Details</p>
        <p> Category: <span style="font-weight: bold;">${element.strCategory}</span></p>
        <p> Alcoholic: <span style="font-weight: bold;">${element.strAlcoholic}</span></p>
        <p>${element.strInstructions}</p>


        `


    modal.show();
}

//seach er basis e food show koro
const ShowSearchedFood = (value) => {
    //value fetch kore ene show korte hbe
    document.getElementById("show-all-items").innerHTML = "";
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        .then(response => response.json())
        .then(elements => {
            console.log(elements);
            if (elements.drinks) {
                for (let element of elements.drinks) {
                    //each element accessed!
                    //akhn show koro
                    const container = document.getElementById("show-all-items")
                    // container.innerHTML="";
                    const div = document.createElement("div")
                    div.classList.add("card-design")
                    div.id = "card-design"
                    div.innerHTML = `
                    <img src="${element.strDrinkThumb}" class="img-size" alt="">
                    <p><span class="name-tag">Name: ${element.strDrink}</span><span><br></span>Category: ${element.strCategory}</p>
                    <p class="instruction">Instruction: ${element.strInstructions}</p>
                    <button class="add-to-cart-btn">Add to cart</button>
                    <button class="details-btn">Details</button>
                    `
                    //details button e click korle modal er moddhe detils show koro
                    const selector = div.querySelector(".details-btn")
                    selector.addEventListener("click", (event) => {
                        //each card e click korle modal pop up hbe, then details show korbe
                        ShowDetailsThroughModal(element)
                    })
                    container.appendChild(div)
                }
            }

            else {
                //show searched drink not available
                alert("Item not found")
            }
        })
}