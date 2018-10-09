import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    message: String;

    constructor() { }

    setMessage(msg: String) {
        this.message = msg;
    }
}
