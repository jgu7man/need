export class CategoriaModel {
    constructor(
        public id: string,
        public name: string,
        public subCategorias: string[],
        public imagen: string
    ) {
    
    }
}