import App from "./components/App"
class Index {
    constructor(rootId: string){
        App.getInstance(rootId);
    }
    
}
new Index("app");
