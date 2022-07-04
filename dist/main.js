var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//IMPORTS
import { BlogManager } from "./blogManager.js";
import { CrudAPI } from "./crudAPI.js";
//VARIABLES
//URLS one for default hardcoded CRUD URL, one to set via user input
const defaultURL = "https://crudcrud.com/api/8c72de25e03e4de7b2d1f07451cc7eab";
let apiURL = "";
//FUNCTIONS
//set CRUD Url via input, else set it default
function setURL() {
    let inputUrl = document.getElementById("inputURL");
    if (inputUrl.value == "") {
        inputUrl.value = defaultURL;
    }
    else {
        apiURL = inputUrl.value;
        uiHandler.setCrudURL(apiURL);
    }
}
//TEST FUNCTION für Funktionalität des BlogManagers
function testPOST() {
    let testBlog = blogManager.addNewPost("", inputAuthor.value, inputTitle.value, inputBody.value);
    console.log(testBlog);
    uiHandler.uiDisplayBlogPosts();
}
//CLASSES
//UIHANDLER handles user input 
class UIhandler {
    constructor(crudUrl, blogManager) {
        this.crudURL = crudUrl;
        this.blogManager = blogManager;
    }
    //set crudUrl
    setCrudURL(crudURL) {
        this.crudURL = crudURL;
        console.log(this.crudURL);
    }
    //TEST Input
    testInput() {
        inputAuthor.value = "Stanislav Lemtest";
        inputTitle.value = "Testaris";
        inputBody.value = "Um neunzehn Uhr Bordzeit stieg ich, vorbei an den Leuten, die den Schacht umstanden, über die Metallsprossen ins Innere der Kapsel hinab.";
    }
    testInput2() {
        inputAuthor.value = "Rudi";
        inputTitle.value = "Über das Renntier";
        inputBody.value = "Rudi	Über das Renntier	Das Renntier, ja das Renntier, wohin rennt das Tier, das Renntier rennt das Renntier rennt hier.";
    }
    //DELETES selected Post
    uiDELETE() {
        return __awaiter(this, void 0, void 0, function* () {
            let id = inputID.value;
            yield crudAPI.apiDELETE(id);
            this.uiGETserverData();
        });
    }
    //UPDATE selected Post
    uiUPDATE() {
        return __awaiter(this, void 0, void 0, function* () {
            let id = inputID.value;
            let author = inputAuthor.value;
            let title = inputTitle.value;
            let body = inputBody.value;
            let blogPostUpdate = this.blogManager.addNewPost(id, author, title, body);
            yield crudAPI.apiPUT(blogPostUpdate);
            this.uiGETserverData();
        });
    }
    //GET all Serverdata, store it in blogManager and display it
    uiGETserverData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.blogManager.clearList();
            yield crudAPI.apiGET();
            this.uiDisplayBlogPosts();
        });
    }
    //POST to server
    uiPOST() {
        return __awaiter(this, void 0, void 0, function* () {
            //get User Inputs
            if (inputTitle.value == "") {
                console.log("INPUT ERROR: TITLE EMPTY");
            }
            if (inputBody.value == "") {
                console.log("INPUT ERROR: BODY EMPTY");
            }
            const newBlogPost = blogManager.addNewPost("", inputAuthor.value, inputTitle.value, inputBody.value);
            yield crudAPI.apiPOST(newBlogPost).then();
            this.uiGETserverData();
            //clear inputfields (to avoid update or delete errors)
            inputAuthor.value = "";
            inputBody.value = "";
            inputBody.value = "";
        });
    }
    //show one selected Post in the Inputfields
    uiShowSelectedPost(id) {
        let blogList = this.blogManager.getblogList();
        //gets list and "loads" it into the input fields
        for (let i = 0; i < blogList.length; i++) {
            let blogPost = blogList[i];
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
    uiDisplayBlogPosts() {
        const blogList = blogManager.getblogList();
        let table = document.getElementById("table1");
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
            let fullbody = blogList[i].body;
            if (fullbody.length > 100) {
                fullbody = fullbody.substring(0, 99);
            }
            let TextNodeBody = document.createTextNode(`${fullbody}`);
            TDbody.appendChild(TextNodeBody);
            newRow.appendChild(TDbody);
            //newRow.addEventListener("click", selectPostFromTable(`${blogList[i]._id}`));
            newRow.addEventListener("click", () => {
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
const inputAuthor = document.getElementById("inputAuthor");
const inputTitle = document.getElementById("inputTitle");
const inputBody = document.getElementById("inputBody");
const inputID = document.getElementById("inputID");
const output = document.getElementById("divOutput");
//EVENT LISTENERS
document.getElementById("btnURL").addEventListener("click", setURL);
document.getElementById("btnTestInput").addEventListener("click", uiHandler.testInput.bind(uiHandler));
document.getElementById("btnPOST").addEventListener("click", uiHandler.uiPOST.bind(uiHandler));
document.getElementById("btnGET").addEventListener("click", uiHandler.uiGETserverData.bind(uiHandler));
document.getElementById("btnDELETE").addEventListener("click", uiHandler.uiDELETE.bind(uiHandler));
document.getElementById("btnUPDATE").addEventListener("click", uiHandler.uiUPDATE.bind(uiHandler));
