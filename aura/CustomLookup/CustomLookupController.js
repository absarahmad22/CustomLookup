({
    doInit : function(component, event, helper) {
        var Id = component.get('v.value');
        var searchStr = component.get('v.searchStr');
        component.set('v.objectNames',component.get('v.objectApiNames').split(','));
        if(!searchStr && Id){
            var spinner = component.find('spinner');
            $A.util.removeClass(spinner,'slds-hide');
            helper.callApexMethod(component,Id,undefined,$A.getCallback(function(data){
                if(data && data.length > 0){
                    component.set('v.searchStr',data[0].Name);
                }
                component.set('v.showIconName',true);
                $A.util.addClass(spinner,'slds-hide');
            }));
            helper.callApexObjectName(component,Id,$A.getCallback(function(apiName){
                component.set('v.selectedObject',apiName);
                if(helper.standardIcons.indexOf(apiName.toLowerCase()) !== -1){
                    component.set('v.iconName','standard:'+apiName.toLowerCase());
                }else{
                    component.set('v.iconName','custom:custom'+parseInt(Math.random()*100));
                }
                component.set('v.showIconName',true);
                $A.util.addClass(spinner,'slds-hide');
            }));
        }else{
            component.set('v.showIconName',true);
        }
    },
    
    searchResult : function(component, event, helper){
        var value = event.getSource().get('v.value');
        var objectApiName = component.get('v.selectedObject');
        var spinner = component.find('spinner');
        var searchIcon = component.find('searchIcon');
        var combobox = component.find('mycombobox');
        
        window.clearInterval(helper.searchWaitTime);
        
        $A.util.removeClass(spinner,'slds-hide');
        $A.util.addClass(searchIcon,'slds-hide');
        $A.util.addClass(component.find('errormsg'),'slds-hide');
        if(value === ''){
            component.set('v.records',[]);
            $A.util.addClass(spinner,'slds-hide');
            $A.util.removeClass(searchIcon,'slds-hide');
            $A.util.removeClass(combobox,'slds-is-open')
            return;
        }
        component.set('v.value','');
        
        
        helper.searchWaitTime = window.setInterval($A.getCallback(function () {
            window.clearInterval(helper.searchWaitTime);
            helper.callApexMethod(component,value,objectApiName,$A.getCallback(function(records){
                component.set('v.records',records);
                records.length === 0 ? $A.util.removeClass(combobox,'slds-is-open') : $A.util.addClass(combobox,'slds-is-open'); ;
                $A.util.addClass(spinner,'slds-hide');
                $A.util.removeClass(searchIcon,'slds-hide');
            }));
        }), 500);
        
    },
    
    selectValue : function(component, event, helper){
        var selectedItem = event.currentTarget;
        var value = selectedItem.dataset.id;
        var name = selectedItem.dataset.name;
        var combobox = component.find('mycombobox');
        if(!value) return;
        
        component.set('v.value',value);
        component.set('v.searchStr',name);
        $A.util.removeClass(combobox,'slds-is-open');
    },
    
    hideResult : function(component, event, helper){
        setTimeout($A.getCallback(function(){
            $A.util.removeClass(component.find('mycombobox'),'slds-is-open');     
            var input = component.find("searchInput");
            $A.util.removeClass(component.find('errormsg'),'slds-hide');
            var recordId = component.get('v.value');
            if(recordId === "" || recordId === null){
                $A.util.addClass(input,'slds-has-error'); 
                $A.util.removeClass(component.find('errormsg'),'slds-hide');
            }else{
                $A.util.removeClass(input,'slds-has-error');
                $A.util.addClass(component.find('errormsg'),'slds-hide');
            }
        }),300);
    },
    
    clearLookup :function(component, event, helper){
        var value = component.get('v.selectedObject');
        component.set('v.value','');
        component.set('v.searchStr','');
        helper.standardIcons.indexOf(value.toLowerCase()) !== -1 ?
            component.set('v.iconName','standard:'+value.toLowerCase()) : component.set('v.iconName','custom:custom'+parseInt(Math.random()*100));
    }
    
    
    
})