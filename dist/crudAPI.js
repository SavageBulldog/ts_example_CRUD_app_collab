var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CrudAPI {
    constructor(crudUrl, blogManager) {
        this.crudUrl = crudUrl;
        this.apiUrl = crudUrl + "/blogPost";
        this.blogManager = blogManager;
        console.log(`${this.constructor.name} is instanced with URL ${this.crudUrl}`);
    }
    //METHODS
    //POST
    apiPOST(blogPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' // important!!!
                },
                body: JSON.stringify(blogPost)
            });
            console.log(response);
        });
    }
    //GET
    apiGET() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // fetch GET request
                const response = yield fetch(this.apiUrl);
                // check if fetch was successful
                if (!response.ok) {
                    throw new Error("Fetch request not successful");
                }
                const data = yield response.json();
                //element ist any, macht noch mehr probleme, wenn man data oder zb. element.title als string deklariert
                data.forEach((element) => {
                    this.blogManager.addNewPost(element._id, element.author, element.title, element.body);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    //DELETE
    apiDELETE(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiUrl}/${_id}`, {
                    // request options
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error("DELETE unsucsessful!");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    //UPDATE
    apiPUT(blogPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiUrl}/${blogPost._id}`, {
                    // request options
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(blogPost)
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error("PUT not successful, try again.");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
