import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class IndexService {

    @Output() dataIndexed: EventEmitter<any> = new EventEmitter()
    public collection
    public field
    
    public collectionSize
    public queryCant
    public pageContent = []
    
    public first
    public last 
    public pageAnchors = []
    public fieldSort
    constructor(
        private fs: AngularFirestore
    ) { }



    async initIndex(CollectionToSort: string, FieldToSort: string, queryCant: number) {
        // Define docs to query
        this.collection = CollectionToSort
        this.field = FieldToSort
        this.queryCant = queryCant
        this.first = 1 
        this.last = this.first + 9


        // Get the collection size to index
        var queryCollection = this.fs.collection(this.collection).ref.orderBy(this.field)
        this.collectionSize = (await queryCollection.get()).size

        // Define limit and get query
        var query = await queryCollection.limit(this.queryCant).get()
        
            
        await query.forEach(async doc => { return this.pageContent.push(doc.data()) })
        this.sendQuery()
        
        
        // Define anchors
        this.pageAnchors.push({
          page: this.first,
          first: this.pageContent[0][this.field],
          last: this.pageContent[9][this.field]
        })
    }




    async getNextPage() {
        let pageAnchor = this.pageAnchors.find(page => page.page == this.first)
        let anchor = pageAnchor.last
        this.first = this.first + 10
        this.last = this.first + 9
        this.collectionSize < this.last ?
            this.last = (this.first - 1) + (this.collectionSize % 10) :
            this.last = this.first + 9

        var queryCollection = await this.fs.collection(this.collection).ref.orderBy(this.field)
        let query = await queryCollection.startAfter(anchor).limit(10).get()
        
        this.pageContent = []
        await query.forEach(async doc => { return this.pageContent.push(doc.data()) })
        this.sendQuery()

        // Define anchors
        this.pageAnchors.push({
          page: this.first,
          first: this.pageContent[0][this.field],
          last: this.pageContent[this.pageContent.length-1][this.field]
        })
    }




    async getPrevPage() {
        let prev = this.first - 10
        let pageAnchor = this.pageAnchors.find(page => page.page == prev)
        let anchor = pageAnchor.first

        this.first = this.first - 10;
        ((this.last - this.first) > 10) ?
            this.last = this.last - (this.last % 10) :
            this.last = this.first + 9

        var queryCollection = await this.fs.collection(this.collection).ref.orderBy(this.field)
        let query = await queryCollection.startAt(anchor).limit(10).get()
        
        this.pageContent = []
        await query.forEach(async doc => { return this.pageContent.push(doc.data()) })
        this.sendQuery()
    }


    sendQuery() {
        
        this.dataIndexed.emit({
            pageContent: this.pageContent,
            firstIndex: this.first,
            lastIndex: this.last,
            collectionSize: this.collectionSize
        })

    }

    
}