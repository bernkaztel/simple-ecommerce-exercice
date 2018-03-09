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
    getPayPal(totalSum);
}


calculateTotal();



//Maddie
function getPayPal(totalSum) {
    paypal.Button.render({

        env: 'sandbox', // sandbox | production

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
            sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: ''
        },

        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,

        // payment() is called when the button is clicked
        payment: function (data, actions) {

            // Make a call to the REST api to create the payment
            return actions.payment.create({
                payment: {
                    transactions: [{
                        amount: {
                            total: `${totalSum}`,
                            currency: 'MXN'
                        }
                    }]
                }
            });
        },

        // onAuthorize() is called when the buyer approves the payment
        onAuthorize: function (data, actions) {

            // Make a call to the REST api to execute the payment
            return actions.payment.execute().then(function () {
                window.alert('Payment Complete!');
            });
        }

    }, '#paypal-button-container');

}
