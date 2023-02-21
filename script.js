import { v4 as uuid } from "uuid";

export const script = () => {
  const container = document.querySelector(".container");

  const price = [150, 200, 300];
  
  const form = document.createElement("form");

  form.innerHTML = `<button type="submit">Reserve seats</button>
        <p class="choosen-seats"></p>
        <p class="total-price"></p>
    `;

  document.body.appendChild(form);
    
    
    let arrayLetters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
    ];

    let arrayNumbers = ["1", "2", "3", "4", "5", "6"];

    let newConcatArray = [];

    for (let i = 0; i < arrayLetters.length; i++) {
      let arrayLetter = arrayLetters[i];
      for (let i = 0; i < arrayNumbers.length; i++) {
        let arrayNumber = arrayNumbers[i];
        const arrayTogether = arrayLetter + arrayNumber;
        newConcatArray.push(arrayTogether);
      }
    }

  
  let totalAmount = 0;
  
  
  let arraySeats = [];
    
  
    for (let i = 0; i < 90; i++){
        let randomNumber = Math.floor(Math.random() * price.length);
        console.log(price[randomNumber]);
        const id = uuid();
        const element = document.createElement("div");
        let attr = document.createAttribute("data-id");
        let attrPrice = document.createAttribute("data-price");
        attrPrice.value = price[randomNumber];
        attr.value = id;
        element.setAttributeNode(attrPrice);
        element.setAttributeNode(attr);
        element.classList.add('seat');
        container.appendChild(element);
        let reserved = false;
        element.textContent = newConcatArray[i];
        const choosenSeats = document.querySelector(".choosen-seats");
        const totalPrice = document.querySelector(".total-price");
        totalPrice.textContent = "Wybierz miejsce, aby poznać kwotę za miejsca!"
        element.addEventListener("click", (e) => {
          if (e.target.classList.contains("occupied")) {
            return
          }
            // console.log(e.target.innerHTML);
          
          if (!element.classList.contains("selected")) {
            if (arraySeats.length > 4) {
              alert(
                "Nie możesz zarezerwować większej ilości miejsc za jednym razem"
                );
                return;
              }
              arraySeats.push(e.target.innerHTML);
              choosenSeats.textContent += ` ${arraySeats[arraySeats.length - 1]}`;
              console.log(arraySeats)
              element.classList.add("selected");
              reserved = true;
              
              totalAmount = totalAmount + parseInt(e.target.getAttribute("data-price"));
              totalPrice.textContent =
                totalAmount === 0
                  ? `Nie ma jeszcze żadnej kwoty za miejsca`
                  : `Kwota za miejsca wynosi: ${totalAmount}zł`;
              console.log(totalAmount);
              
            } else {
              element.classList.remove("selected");
              reserved = false;
              for (let m = 0; m < arraySeats.length; m++){
                if (arraySeats[m] === e.target.innerHTML) {
                  arraySeats.splice(m, 1);
                  totalAmount =
                    totalAmount - parseInt(e.target.getAttribute("data-price"));
                  totalPrice.textContent = `Kwota za miejsca wynosi: ${totalAmount}zł`;
                }
              }
              choosenSeats.textContent = "";
              choosenSeats.textContent += ` ${arraySeats} `
            }
          
          
          
        })
        
    }

    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const active = document.querySelectorAll(".selected");
      if (active.length === 0) {
        alert("no seats reserved");
        return
      }
      
      console.log(active);
      if (active.length > 0) {
        active.forEach((element) => {
          element.classList.remove("selected");
        })
        active.forEach((element) => {
          element.classList.add("occupied");
        })
        arraySeats = [];
        const choosenSeats = document.querySelector(".choosen-seats");
        choosenSeats.textContent = "";
        totalAmount = 0;
        const totalPrice = document.querySelector(".total-price");
        totalPrice.textContent = `Gratulacje! Możesz zarezerwować następne miejsca`;
      }
    })
};
