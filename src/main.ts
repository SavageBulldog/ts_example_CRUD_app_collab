//IMPORTS
import { BlogPost, BlogManager } from "./blogManager.js";
import { CrudAPI } from "./crudAPI.js";


//VARIABLES
//URLS one for default hardcoded CRUD URL, one to set via user input
const defaultURL = "https://crudcrud.com/api/8c72de25e03e4de7b2d1f07451cc7eab";

let apiURL = "";

//FUNCTIONS
//set CRUD Url via input, else set it default
function setURL(): void {
    let inputUrl = document.getElementById("inputURL") as HTMLInputElement;

    if (inputUrl.value == "") {
        inputUrl.value = defaultURL;
    } else {
        apiURL = inputUrl.value;
        uiHandler.setCrudURL(apiURL);
    }
}
//TEST FUNCTION für Funktionalität des BlogManagers
function testPOST(): void {
    let testBlog = blogManager.addNewPost("", inputAuthor.value, inputTitle.value, inputBody.value);
    console.log(testBlog);
    uiHandler.uiDisplayBlogPosts();
}

//CLASSES
//UIHANDLER handles user input 
class UIhandler {
    crudURL: string;
    blogManager: BlogManager;
    constructor(crudUrl: string, blogManager:BlogManager) {
        this.crudURL = crudUrl;
        this.blogManager = blogManager;
    }
    //set crudUrl
    setCrudURL(crudURL: string):void {
        this.crudURL = crudURL;
        console.log(this.crudURL);

    }
    //TEST Input
    testInput(): void {
        inputAuthor.value = "Stanislav Lemtest";
        inputTitle.value = "Testaris";
        inputBody.value = "Um neunzehn Uhr Bordzeit stieg ich, vorbei an den Leuten, die den Schacht umstanden, über die Metallsprossen ins Innere der Kapsel hinab.";
    }
    testInput2(): void {
        inputAuthor.value = "Rudi";
        inputTitle.value = "Über das Renntier";
        inputBody.value = "Rudi	Über das Renntier	Das Renntier, ja das Renntier, wohin rennt das Tier, das Renntier rennt das Renntier rennt hier.";
    }

    //DELETES selected Post
    async uiDELETE() {
        let id = inputID.value;
        await crudAPI.apiDELETE(id);
        this.uiGETserverData();
    }
    //UPDATE selected Post
    async uiUPDATE() {
        let id = inputID.value;
        let author = inputAuthor.value;
        let title = inputTitle.value;
        let body = inputBody.value;
        let blogPostUpdate = this.blogManager.addNewPost(id, author, title, body);
        await crudAPI.apiPUT(blogPostUpdate);
        this.uiGETserverData();
    }

    //GET all Serverdata, store it in blogManager and display it
    async uiGETserverData() {
        this.blogManager.clearList();
        await crudAPI.apiGET();
        this.uiDisplayBlogPosts();
    }

    //POST to server
    async uiPOST() {
        //get User Inputs
        if (inputTitle.value == "") {
            console.log("INPUT ERROR: TITLE EMPTY");
        }
        if (inputBody.value == "") {
            console.log("INPUT ERROR: BODY EMPTY");
        }
        const newBlogPost = blogManager.addNewPost("", inputAuthor.value, inputTitle.value, inputBody.value);
        
        await crudAPI.apiPOST(newBlogPost).then();
        this.uiGETserverData();
        //clear inputfields (to avoid update or delete errors)
        inputAuthor.value = "";
        inputBody.value = "";
        inputBody.value = "";

    }
    //show one selected Post in the Inputfields
    uiShowSelectedPost(id:string):void {
        let blogList = this.blogManager.getblogList();

        //gets list and "loads" it into the input fields
        for (let i = 0; i < blogList.length; i++) {
            let blogPost:BlogPost = blogList[i];
            if (blogPost._id == id) {
                inputAuthor.value = blogPost.author;
                inputID.value = blogPost._id;
                inputTitle.value = blogPost.title;
                inputBody.value = blogPost.body;
                break;
            }
        }

    }
    //show all blogPosts in a table
    uiDisplayBlogPosts(): void {
        const blogList: BlogPost[] = blogManager.getblogList();

        let table = document.getElementById("table1")!;

        table.innerHTML = "";

        let headerRow = document.createElement("tr");
        let headerAuthor = document.createElement("td");
        let headerTextNode = document.createTextNode("Author");
        headerAuthor.appendChild(headerTextNode);
        headerRow.appendChild(headerAuthor);

        let headerTitle = document.createElement("td");
        let headerTitleTextNode = document.createTextNode("Title");
        headerTitle.appendChild(headerTitleTextNode);
        headerRow.appendChild(headerTitle);

        let headerBody = document.createElement("td");
        let headerBodyTextNode = document.createTextNode("Preview");
        headerBody.appendChild(headerBodyTextNode);
        headerRow.appendChild(headerBody);

        table.appendChild(headerRow);

        for (let i = 0; i < blogList.length; i++) {
            let newRow = document.createElement("tr");
            newRow.id = blogList[i]._id;

            let TDauthor = document.createElement("td");
            let authorName = blogList[i].author;
            let TextNodeAuthor = document.createTextNode(`${authorName}`);
            TDauthor.appendChild(TextNodeAuthor);
            newRow.appendChild(TDauthor);

            let TDtitle = document.createElement("td");
            let titleName = blogList[i].title;
            let TextNodeTitle = document.createTextNode(`${titleName}`);
            TDtitle.appendChild(TextNodeTitle);
            newRow.appendChild(TDtitle);

            let TDbody = document.createElement("td");
            let fullbody: string = blogList[i].body;
            if (fullbody.length > 100) {
                fullbody = fullbody.substring(0, 99);
            }
            let TextNodeBody = document.createTextNode(`${fullbody}`);
            TDbody.appendChild(TextNodeBody);
            newRow.appendChild(TDbody);

            //newRow.addEventListener("click", selectPostFromTable(`${blogList[i]._id}`));
            newRow.addEventListener("click", ()=> {
                this.uiShowSelectedPost(`${blogList[i]._id}`);
            });

            table.appendChild(newRow);
        }
        output.appendChild(table);
    }
}

//INSTANCES
const blogManager = new BlogManager();
const uiHandler = new UIhandler(defaultURL, blogManager);

const crudAPI = new CrudAPI(uiHandler.crudURL, blogManager);

const inputAuthor = document.getElementById("inputAuthor")! as HTMLInputElement;
const inputTitle = document.getElementById("inputTitle")! as HTMLInputElement;
const inputBody = document.getElementById("inputBody")! as HTMLInputElement;
const inputID = document.getElementById("inputID")! as HTMLInputElement;
const output = document.getElementById("divOutput")! as HTMLDivElement;

//EVENT LISTENERS
document.getElementById("btnURL")!.addEventListener("click", setURL);
document.getElementById("btnTestInput")!.addEventListener("click", uiHandler.testInput.bind(uiHandler));
document.getElementById("btnPOST")!.addEventListener("click", uiHandler.uiPOST.bind(uiHandler));
document.getElementById("btnGET")!.addEventListener("click", uiHandler.uiGETserverData.bind(uiHandler));
document.getElementById("btnDELETE")!.addEventListener("click", uiHandler.uiDELETE.bind(uiHandler));
document.getElementById("btnUPDATE")!.addEventListener("click", uiHandler.uiUPDATE.bind(uiHandler));


