/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ____Bakyt Kurmanov______ Student ID: _____150582179_____ Date: _______2020-06-13________
*
*
********************************************************************************/

let saleData = [];
let page=1;
const perPage=10;
let resultData =null;

const saleTableTemplate = _.template(`
                                     <% sales.forEach(function(data){ %>
                                     <tr data-id = "<%- data._id %>" >
                                     <td> <%- data.customer.email %> </td>
                                     <td> <%- data.storeLocation %> </td>
                                     <td> <%- data.items.length %> </td>
                                     <td> <%- moment(data.saleDate).format('LLLL') %> </td>
                                     </tr>


                                 <% }) %>`

);
const saleModalBodyTemplate = _.template(`

                                         <h4> Customer </h4>
                                         <strong> email: <%-data.customer.email %> </strong><br>
                                         <strong> age: <%-data.customer.age %></strong> <br>
                                         <strong> satisfaction: <%-data.customer.satisfaction %> /5 </strong><br>
                                         
                                         </strong> <br>
                                         <br><br>
                                         <h4 id="total"> </h4>
                                         <table class="table">
                                         <thead>
                                         <tr>
                                         <th> Product Name </th>
                                         <th> Quantity </th>
                                         <th> Price </th>
                                         </tr>
                                         </thead>
                                         <tbody>
                                         
                                         <% data.items.forEach(function(item){ %>
                                          <tr>
                                         <td> <%- item.name %></td>
                                         <td> <%- item.quantity %></td>
                                         <td> $ <%- item.price %></td>
                                         
                                         </tr>
                                         <% }) %>
                                         </tbody>
                                         </table>
                                         `
);


function loadSaleData(){   // load the table of all sales
fetch("https://web422-bk-as1.herokuapp.com/api/sales?page="+page+"&perPage="+perPage+"")
         .then(res=>res.json())
         .then(result=>{
           resultData = result.data;
         saleData = saleTableTemplate({sales: result.data});
         $('.table tbody').html(saleData);
         $('#current-page').html(page);
         
})
}

$(function(){    // go to next page 
     loadSaleData(); // invoke 
     $('.pagination #next-page').on("click", function(){
      page=page+1;
      
      loadSaleData();  //refresh
    })
    
    $('.pagination #previous-page').on("click", function(){  // go to previous page
      page=page-1;
      if(page < 1){
        page = 1;
      }
     loadSaleData();  // refresh
    })

$('.table tbody').on("click", "tr", function(){

     let clickedId = $(this).attr("data-id");   // get the clicked sale ID

     let clickedSale = $('.table tbody').find("[data-id=" + clickedId + "]")

     let item = null;
     resultData.forEach(function(data){
       
       if(data._id == clickedId){
        item = data;
      }
    });

     let x = {data: item};
     let output = saleModalBodyTemplate({data: x.data});

     $('#sale-modal #modal-body').html(output); 

     let total = 0;
     x.data.items.forEach(function(item){ 
     total += item.quantity*item.price;  // getting the total price for sale
     });
     $('.modal-title').html("Sale:" +x.data._id);
     $('#sale-modal #total').html(" Items: $"+total.toFixed(2));

     $('#sale-modal').modal({   // show the modal programmatically
      backdrop: 'static',      // disable clicking on the backdrop to close
      keyboard: false         // disable using the keyboard to close
   });

     })
})

