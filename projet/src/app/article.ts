export class Article {
    id:number;
    name:string;
    description:string;
    price:number;
    image:FormData;
    constructor(name:string,description:string,price:number,image:FormData,id:number=0){
        this.name=name;
        this.description=description;
        this.price=price;
        this.image=image;
        this.id=id;
    }
}
