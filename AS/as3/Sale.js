import React from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap'

class Sale extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sale: {},
            loading: true
        }
    }
    componentDidMount(){
    
       fetch("https://web422-bk-as1.herokuapp.com/api/sales/"+this.props.id)
        .then(res=> res.json())
        .then(myJson => {
            console.log(myJson.data);
            this.setState({sale: myJson.data, loading: false});
            this.props.viewedSale(myJson.data._id)
            
        })
        .catch(err=>console.log(`Error happened when retrieving data:${err}`))
       
    }
    
    componentDidUpdate(prevProps){
       

        if(prevProps.id !== this.props.id){
            this.setState({
                loading : true
            })
            fetch("https://web422-bk-as1.herokuapp.com/api/sales/"+this.props.id)
            .then(res=> res.json())
            .then(myJson => {
                this.setState({sale: myJson.data, loading: false});
                this.props.viewedSale(myJson.data._id)
                
            })
            .catch(err=>console.log(`Error happened when retrieving data:${err}`))
        }
    }
    
    itemTotal(items){
        let total = 0;
      //  items.push(this.sale.data.items);
        items.forEach(function(item){ 
        total += item.quantity*item.price;  // getting the total price for sale
        
    });
    return total;
}

render()
    {                      
        if (this.state.loading) 
        {
        return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        } else  {
                    if (this.state.sale._id)
                    {
                        let data = this.state.sale;
                        return (<div>
                        <h1>Sale: { data._id } </h1>
                        <h2>Customer</h2>
                        <ListGroup>
                        <ListGroupItem><strong>email:</strong> {data.customer.email} </ListGroupItem>
                        <ListGroupItem><strong>age:</strong> {data.customer.age}</ListGroupItem>
                        <ListGroupItem><strong>satisfaction:</strong> {data.customer.satisfaction} /5
                        </ListGroupItem>
                        </ListGroup>
                        <h2> Items: ${this.itemTotal(data.items).toFixed(2)} </h2>
                        <Table>
                        <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.items.map(item =>
                                                                <tr>
                                                                <td>  {item.name} </td>
                                                                <td>  {item.quantity} </td>
                                                                <td> ${item.price} </td>
                                                                </tr>
                                                                )} 
                        </tbody>
                        </Table>
                        </div>)
                    } 
                else 
                {
                    return (<div><br><br></br></br> <h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>)
                }
        }
    }
}
export default Sale;