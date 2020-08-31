/*--------------------------------------------------------*/
/* Author          : Absar Ahmad                          */
/* Developed Date  : 7/10/2020 8:54 PM                    */
/* Test Class      : CustomLookupTest                     */


public class CustomLookupController {
	@AuraEnabled
    public static List<sObject> searchResultApex(String searchStr, String objectApiName){
        if(searchStr == '' || searchStr == null) return null;

        if(searchStr.length() == 15 || searchStr.length() == 18 && objectApiName == null){
            try{
                String objectName = Id.valueOf(searchStr).getSObjectType().getDescribe().getName();
                return  Database.query('Select Id,Name From '+objectName+' Where Id=\''+searchStr+ '\'');
            }catch(Exception e){ }
        }
        return Database.query('Select Id,Name From '+objectApiName+' Where Name Like '+'\'%'+searchStr+'%\''+' Order By LastModifiedDate DESC Limit 5');
    }
    
    @AuraEnabled
    public static String getObjectApiName(String recordId){
        try{
            return Id.valueOf(recordId).getSObjectType().getDescribe().getName();
        }catch(Exception e){} return null;
    }
}