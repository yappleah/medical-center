export class AuthModel {
    username: string;
    authority: string;

    constructor(
        username: string,
        authority: string
    ) {
        this.username = username;
        this.authority = authority;
    }
}
