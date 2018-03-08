function calculateTotal() {
    var finalCart = JSON.parse(localStorage.getItem("shoppingCartLS"));
    var finalCounter = localStorage.getItem("firstCounter");
    const counter = document.getElementById('counterItems');
    counter.innerHTML = finalCounter;
    console.log(finalCounter);
    console.log(finalCart);
    getPriceTitle(finalCart);
}

function getPriceTitle(finalCart) {
    let template = '';
    let arrayNumbers = [];
    finalCart.forEach(element => {
        template += `
        <tr>
        <th scope="row">${element.title}</th>
        <td>${element.price}</td>
        </tr>
        `
        //   console.log(template);
        arrayNumbers.push(element.price);
    });
    const tableCont = document.getElementById("tableContainer");
    tableCont.innerHTML = template;
    console.log(arrayNumbers);
    let totalSum = arrayNumbers.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
console.log(totalSum);

let template2 = 
`<td></td>
<td></td>
<td id>${totalSum}</td>
`
tableCont.insertAdjacentHTML('beforeEnd', template2);
}




calculateTotal();