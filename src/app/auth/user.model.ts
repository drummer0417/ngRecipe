export class User {

    constructor(
        public email: string, 
        public id: string, 
        private token: string,
        private tokenExpirationDate: Date
        ) {}

    getToken(){
        if (this.tokenExpirationDate > new Date() ) {
            return this.token;
        } else {
            return null;
        }
    }
}