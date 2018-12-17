import React, { Component } from 'react'
import {Button,Popover,FormLayout,Select,TextField,ButtonGroup,DisplayText,Modal} from '@shopify/polaris';


class EditRentalProductPopup extends Component {

  

  constructor(props) {
      super(props);
      this.editdetails=props.paramseditdetails;  

      this.state = {
        
        tagValue: '',
        active: this.editdetails.active,
        rate:this.editdetails.rate,
        deposit:this.editdetails.deposit,
        minrentalweeks:this.editdetails.minrentalweeks,
        maxrentalweeks:this.editdetails.maxrentalweeks,
        isautorenewcharge:this.editdetails.isautorenewcharge,
        location:'',
        item:this.props.item
      };
      
      
  }

  componentDidMount(){
      console.log('componentDidMount');
      this.loadItUp();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');

    // if(nextProps.item && this.state.active==false){
    //   console.log('componentWillReceiveProps item changed=',nextProps.item);
    //   this.loadItUp();
    // }
  }
  
  loadItUp(){
    // const arr_rentify_metafields=this.props.item['rentify_metafields'];
    const obj_rentify_metafields=this.props.item['rentify_metafields'];
      if(obj_rentify_metafields){
        
          // arr_rentify_metafields.forEach(element => {
            
            // if(element.key=='rentify_rate'){
              this.setState({
                rate:obj_rentify_metafields['rentify_rate'].value
              });      
            // }
            // if(element.key=='rentify_minrental'){
              this.setState({
                minrentalweeks:obj_rentify_metafields['rentify_minrental'].value
              });
            // }
            // if(element.key=='rentify_maxrental'){
              this.setState({
                maxrentalweeks:obj_rentify_metafields['rentify_maxrental'].value
              });
            // }
            // if(element.key=='rentify_autorenewcharge'){
              this.setState({
                isautorenewcharge:obj_rentify_metafields['rentify_autorenewcharge'].value//element.value
              });
            // }
            // if(element.key=='rentify_inventory'){
              this.setState({
                rentify_inventory:obj_rentify_metafields['rentify_inventory'].value //element.value
              });
            // }

          // });
      }
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   console.log('editrentalproductpopup getDerivedStateFromProps START',nextProps);
  //   if(nextProps.item){
  //     nextProps.item['rentify_metafields'].forEach(a=>{
  //       console.log('editrentalproductpopup getDerivedStateFromProps',a.key,a.value);
  //     });
  //     return {
  //       item:nextProps.item
  //     }
  //   }
  //   return null;
  // }


  updateProductMetafields(typeofstate,value){
    var theitem=this.state.item;
    var rentify_metafields=theitem['rentify_metafields'];
    if(rentify_metafields){
      rentify_metafields[typeofstate].value=value;
      // rentify_metafields.map(a=>{
      //   if(a.key===typeofstate){
      //     a.value=value;
      //   }
      // });
      theitem['rentify_metafields']=rentify_metafields;
      this.setState({
        item:theitem
      });
    }
  }

  handleTagChange(typeofstate,value) {
    this.updateProductMetafields(typeofstate,value);
    switch (typeofstate) {
      case 'rentify_rate':
        this.setState({
          rate: value,

        });    
        break;
        case 'deposit':
        this.setState({
          deposit: value,
        });    
        break;
        case 'rentify_minrental':
        this.setState({
          minrentalweeks: value,
        });    
        break;
        case 'rentify_maxrental':
        this.setState({
          maxrentalweeks: value,
        });    
        break;
        case 'rentify_autorenewcharge':
        // alert(value);
        this.setState({
          isautorenewcharge: value,
        });    
        break;
        case 'rentify_inventory':
        this.setState({
          rentify_inventory: value,

        });    
        break;
      default:
        break;
    }
    
  }
  
  togglePopover  (val) {
    
    this.setState({active:val});
  }

  messagefrompopup(){
    this.props.callback(this.state.item);
    this.togglePopover(false);
  }

  deleteProduct(){
    this.props.callbackDelete(this.props.item.id);
    this.togglePopover(false);
  }
 

  render() {
    if(this.props.typeofpopup=='dispatch'){
      return this.renderDispatchProduct();
    }
    if(this.props.typeofpopup=='manageproduct'){
      return this.renderManageProduct();
    }
  }
  renderManageProduct() {
    const activator = (
        <Button onClick={()=>this.togglePopover(true)} >Edit</Button>
      );

    const options = [
      {label: 'Yes', value: 'yes'},
      {label: 'No', value: 'no'},
      
    ]

    

    return (
      // <div >  
      //   <Button onClick={()=>this.togglePopover(true)} >Edit</Button>

      //   <Modal
      //     open={this.state.active}
      //     onClose={()=>this.togglePopover(false)}
      //     title="Rentify Rental Product"
      //     src=""
      //     sectioned
      //     primaryAction={{
      //       content: 'Close',
      //       onAction: ()=>this.togglePopover(false)
      //     }}
      //     secondaryActions={[
      //       {
      //         content: 'Test',
      //         onAction: ()=>this.togglePopover(false)
      //       },
      //     ]}
      //   >
      //   <Modal.Section>
      //       <FormLayout >
      //           <DisplayText size="medium">Edit Rental Product</DisplayText>
      //           <DisplayText size="medium">{this.props.item.title}</DisplayText>
                
      //           <TextField
                    
      //               label="Weekly Rental Rate"
      //               value={this.state.rate}
      //               onChange={(val)=>this.handleTagChange('rentify_rate',val)}
      //           />
      //           <TextField
                    
      //               label="Deposit"
      //               value={this.state.deposit}
      //               onChange={(val)=>this.handleTagChange('deposit',val)}
      //           />
      //           <TextField
                    
      //               label="Minimum Rental Weeks"
      //               value={this.state.minrentalweeks}
      //               onChange={(val)=>this.handleTagChange('rentify_minrental',val)}
      //           />
      //           <TextField
                    
      //               label="Maximum Rental Weeks"
      //               value={this.state.maxrentalweeks}
      //               onChange={(val)=>this.handleTagChange('rentify_maxrental',val)}
      //           />
 
      //           <Select label="Auto Renew charge" options={options} value={this.state.isautorenewcharge} 
      //             onChange={(val)=>this.handleTagChange('rentify_autorenewcharge',val)}/>
      //           <ButtonGroup>
      //               <Button onClick={()=>this.deleteProduct()} destructive size="slim">Remove from Rental</Button>
      //               <Button size="slim">Cancel</Button>
      //               <Button onClick={()=> this.messagefrompopup()} primary size="slim">Save Changes</Button>
      //           </ButtonGroup>
      //       </FormLayout>
      //   </Modal.Section>
      // </Modal>
      // </div>

        <Popover
            active={this.state.active}
            activator={activator}
            onClose={()=>this.togglePopover(false)}
            sectioned
            
            >
            <FormLayout >
                <DisplayText size="medium">Edit Rental Product</DisplayText>
                <DisplayText size="medium">{this.props.item.title}</DisplayText>
                
                <TextField
                    
                    label="Weekly Rental Rate"
                    value={this.state.rate}
                    onChange={(val)=>this.handleTagChange('rentify_rate',val)}
                />
                <TextField
                    
                    label="Deposit"
                    value={this.state.deposit}
                    onChange={(val)=>this.handleTagChange('deposit',val)}
                />
                <TextField
                    
                    label="Minimum Rental Weeks"
                    value={this.state.minrentalweeks}
                    onChange={(val)=>this.handleTagChange('rentify_minrental',val)}
                />
                <TextField
                    
                    label="Maximum Rental Weeks"
                    value={this.state.maxrentalweeks}
                    onChange={(val)=>this.handleTagChange('rentify_maxrental',val)}
                />
                <TextField
                    
                    label="Inventory"
                    value={this.state.rentify_inventory}
                    onChange={(val)=>this.handleTagChange('rentify_inventory',val)}
                />
 
                <Select label="Auto Renew charge" options={options} value={this.state.isautorenewcharge} 
                  onChange={(val)=>this.handleTagChange('rentify_autorenewcharge',val)}/>
                <ButtonGroup>
                    <Button onClick={()=>this.deleteProduct()} destructive size="slim">Remove from Rental</Button>
                    <Button size="slim">Cancel</Button>
                    <Button onClick={()=> this.messagefrompopup()} primary size="slim">Save Changes</Button>
                </ButtonGroup>
            </FormLayout>
    </Popover>
    );
  }
  renderDispatchProduct() {
    const activator = (
        <Button onClick={()=>this.togglePopover(true)} >Checkout</Button>
      );

    const options = [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
      
    ]

    return (

        <Popover
            active={this.state.active}
            activator={activator}
            onClose={()=>this.togglePopover(false)}
            sectioned
            
            >
            <FormLayout >
                <DisplayText size="medium">Edit Dispatch Product</DisplayText>
                <TextField
                    
                    label="Location/Shelf"
                    value={this.state.location}
                    onChange={()=>this.handleTagChange('location',this.state.location)}
                />
                <TextField
                    
                    label="Deposit"
                    value={this.state.deposit}
                    onChange={()=>this.handleTagChange('deposit',this.state.deposit)}
                />
  
                 <ButtonGroup>
                    <Button destructive size="slim">Remove from Rental</Button>
                    <Button size="slim">Cancel</Button>
                    <Button onClick={()=> this.messagefrompopup()} primary size="slim">Save Changes</Button>
                </ButtonGroup>
            </FormLayout>
    </Popover>);
  }
}

export default EditRentalProductPopup
