({	
    searchWaitTime : null,
    
    standardIcons : ['opportunity','user','account','contact','campaign','product','lead','case','task'],
    
    callApexMethod : function(component,searchStr,objectApiName,callback){
        var params = {
            'searchStr' : searchStr === undefined ? null : searchStr,
            'objectApiName':objectApiName === undefined ? null : objectApiName
        }
        var action  = component.get('c.searchResultApex'); 
        action.setParams(params);
        $A.enqueueAction(action);
        action.setCallback(this,$A.getCallback(function(response){
            callback(response.getReturnValue());
        }));
    },
    
    callApexObjectName : function(component,recordId,callback){
        var action  = component.get('c.getObjectApiName');
        action.setParam('recordId',recordId === undefined ? null : recordId);
        $A.enqueueAction(action);
        action.setCallback(this,$A.getCallback(function(response){
            callback(response.getReturnValue());
        }));
    },
})