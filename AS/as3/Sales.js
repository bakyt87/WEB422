import React from 'react';
import { withRouter } from 'react-router-dom'
import  { Table, Pagination } from 'react-bootstrap';

class Sales extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sales: [],
            currentPage: 1
        }
        this.previousPage=this.previousPage.bind(this);
        this.NextPage = this.NextPage.bind(this);
    }
                    getData(page){
                     
                        fetch("https://web422-bk-as1.herokuapp.com/api/sales?page="+page.currentPage+"&perPage=10")
                        .then(res=>res.json())
                        .then(sale=>{
                           // alert(sale.data);
                            this.setState({
                               sales : sale.data
                            })
                        })
                    }
                    componentDidMount(){
                       this.getData({currentPage: this.state.currentPage});
                         //alert("saledata" + saledata); // 
                        //this.setState({ sales: saledata })
                    }

                    previousPage(){
                    if(this.state.currentPage > 1){
                    this.getData({currentPage:this.state.currentPage -1})
                    this.setState({currentPage: this.state.currentPage-1})
                    this.setState({ sales: this.state.sales })
                    }
                    }

                    NextPage(){
                        this.getData({currentPage: this.state.currentPage +1})
                        this.setState({currentPage: this.state.currentPage+1})
                        this.setState({ sales: this.state.sales })
                        
                    }


    render(){
        if(this.state.sales.length > 0){
            return (
            <div>
            <Table hover>
            <thead>
            <tr>
            <th>Customer</th>
            <th>Store Location</th>
            <th>Number of Items</th>
            <th>Sale Date</th>
            </tr>
            </thead>
            <tbody>
            
            {this.state.sales.map(data=>
                                     <tr key={data._id} onClick={()=>{this.props.history.push(`/Sale/${data._id}`)}}>
                                     <td>{ data.customer.email } </td>
                                     <td> {data.storeLocation } </td>
                                     <td>{ data.items.length} </td>
                                     <td> {new Date(data.saleDate).toLocaleDateString() }</td>
                                     </tr>
            )}
            </tbody>
            </Table>
            <Pagination>
            <Pagination.Prev onClick={this.previousPage}/>
            <Pagination.Item>{this.state.currentPage}</Pagination.Item>
            <Pagination.Next onClick={this.NextPage}/>
            </Pagination>
            </div>
            );
           }else{
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
           }
           
    }
}
export default withRouter(Sales);