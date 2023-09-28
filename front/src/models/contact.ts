export class Contact {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phonenumber: string;
    age: number | undefined;
    errors: { firstname: boolean; lastname: boolean; email: boolean; address: boolean; phonenumber: boolean; age: boolean; }

    constructor(firstname: string = '',
        lastname: string = '',
        email: string = '',
        address: string = '',
        phonenumber: string = '',
        age: number | undefined = undefined) {
        this.id = '';
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.address = address;
        this.phonenumber = phonenumber;
        this.age = age;
        this.errors = { firstname: false, lastname: false, email: false, address: false, phonenumber: false, age: false }
    }
}