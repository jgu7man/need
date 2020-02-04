import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentacionService {
    
    @Output() indice$: EventEmitter<any> = new EventEmitter()
    constructor() {
        
    }

    setIndice(indice) {
        this.indice$.emit(indice)
    }
}