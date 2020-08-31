@isTest
public class CustomLookupControllerTest {
	@isTest
    public static void test_one(){
        Account account = new Account(
            Name = 'Burlington Textiles Corp of America',
            Phone = '(336) 222-7000',
            Website = 'http://www.burlington.com',
            NumberOfEmployees = 9000,
            Rating = 'Warm',
            AnnualRevenue = 35000000
        );

        INSERT account;

        Contact contact = new Contact(
            Salutation = 'Mr',
            FirstName = 'Jack',
            LastName = 'Rogers',
            AccountId = account.Id,
            MobilePhone = '(336) 222-7000',
            Email = 'jrogers@burlington.com'
        );

        INSERT contact;

        System.assertEquals(null,CustomLookupController.searchResultApex(null,null));
        System.assertEquals('Burlington Textiles Corp of America',CustomLookupController.searchResultApex(account.Id,null)[0].get('Name'));
        System.assertEquals(contact.Id,CustomLookupController.searchResultApex('jack','Contact')[0].get('Id'));
        System.assertEquals('Contact',CustomLookupController.getObjectApiName(contact.Id));
    }
}