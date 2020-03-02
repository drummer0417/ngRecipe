export class User {

    constructor(
        public email: string, 
        public id: string, 
        private _token: string,
        private _tokenExpirationDate: Date
        ) {}

    get token(){
        if (this._tokenExpirationDate > new Date() ) {
            return this._token;
        } else {
            return null;
        }
    }
    
    public get tokenExpirationDate(){
        return this._tokenExpirationDate;
    }
}