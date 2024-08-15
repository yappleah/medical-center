export class PatientModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    gender: string;
    address: string;
    username: string;
    password: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        dob: string,
        gender: string,
        address: string,
        username: string,
        password: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.gender = gender;
        this.address = address;
        this.username = username;
        this.password = password;
    }
}
