import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SidenavService {
    
    menu = [
        { id: 'administradores', name: 'administradores' },
        { id: 'colaboradores', name: 'colaboradores' },
        { id: 'usuarios', name: 'usuarios' },
    ]
}