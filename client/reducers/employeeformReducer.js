import * as actyp from '../constants/action-types';
import {Map,List} from 'immutable';
import {doneSaved,doneShowed} from '../action/OLDindex';
import store from '../store/index';
const initState = 
     {
        employeelist:[
            {
                "_id":"-12",
                "name":"mith",
                "address":"thn",
                "position":"man",
                "salary":120000    
            }
        ]
        
    };

const EmployeeformReducer = (state = Map(initState), action) => {
    switch (action.type) {
        case actyp.EMPLOYEE_SAVE:
            //alert("EMPLOYEE save CORE"+JSON.stringify(action.payload));    
            return Map(state);

        case actyp.EMPLOYEE_SAVED:
            console.log("The actual data here:",action.payload);            
            state=Map(state);
            var employeelist=List(state.get('employeelist'));
            employeelist=employeelist.push(action.payload);
            state=state.set('employeelist',employeelist);
        return state;

        case actyp.EMPLOYEE_SAVE_PENDING:
              alert("EMPLOYEE SAVE PENDING");
              return Map(state);
        
        case actyp.EMPLOYEE_SAVE_REJECTED:
             alert("EMPLOYEE SAVE REJECTED");
             return Map(state);
        
        case actyp.EMPLOYEE_SAVE_FULFILLED:

            processPostLogic(action.payload,doneSaved);        
            return Map(state);
            
        ///////////////SHALL ALL////////////////    
        case actyp.EMPLOYEE_SHOWALL:
            return Map(state);
        
        case actyp.EMPLOYEE_SHOWALL_PENDING:
            alert("EMPLOYEE SHOWALL PENDING");
            return Map(state);
      
        case actyp.EMPLOYEE_SHOWALL_REJECTED:
           alert("EMPLOYEE SHOWALL REJECTED");
           return Map(state);
          
        case actyp.EMPLOYEE_SHOWALL_FULFILLED:
            processPostLogic(action.payload,doneShowed);
            return Map(state);
            case actyp.EMPLOYEE_SAVE_PENDING:
            alert("EMPLOYEE SAVE PENDING");
            return Map(state);
      
        case actyp.EMPLOYEE_SHOWED:
           alert("EMPLOYEE SAVE REJECTED");
           state=Map(state);
           state=state.set('employeelist',List(action.payload));
           return Map(state);
                     
        default:
        return Map(state);
    }
};

export function processPostLogic(load,myfunc) {
    console.log("INSIDE PROCESSPOSTLOGIC");
    // store.dispatch=>{
        console.log("INSIDE DISPATCH");
          load.json().then((data)=>{
                
                store.dispatch(myfunc(data));
            }
        );

    // }


}


export default EmployeeformReducer;
