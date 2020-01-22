export interface Actividad {
    
    coll: string,
    doc: string,
    user: string,
    userColl: string,
    act: string,
    tipo: 'finanzas' | 'personal' | 'datos'
        
}