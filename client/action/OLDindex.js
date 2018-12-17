import * as actyp from '../constants/action-types';



    //START FOR SAVE
    export const newSave = (empobj) =>
        ({
            type:actyp.EMPLOYEE_SAVE,
            payload:fetch('http://localhost:3000/employees/save',{
                method:'POST',
                
                headers:new Headers({
                    //'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                body:"emp="+JSON.stringify(empobj)
            })
    });
    
    export const doneSaved = (empobj) =>
    ({
            type:actyp.EMPLOYEE_SAVED,
            payload:empobj
    });
    
    export const showAll = () =>
        ({
            type:actyp.EMPLOYEE_SHOWALL,
            payload:fetch('http://localhost:3000/employees',{
                method:'GET',
                headers:new Headers({
                    //'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
                
            })
    });
    
    export const doneShowed = (emplist) =>
    ({
            type:actyp.EMPLOYEE_SHOWED,
            payload:emplist
    });
    
