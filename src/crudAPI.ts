import { BlogPost, BlogManager } from "./blogManager.js";

export class CrudAPI {
    crudUrl: string;
    apiUrl: string;
    blogManager: BlogManager;
    constructor(crudUrl:string, blogManager:BlogManager) {
        this.crudUrl = crudUrl;
        this.apiUrl = crudUrl + "/blogPost";
        this.blogManager = blogManager;
        console.log(`${this.constructor.name} is instanced with URL ${this.crudUrl}`);
        
    }
    //METHODS
    //POST
    async apiPOST(blogPost:BlogPost) {
        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // important!!!
            },
            body: JSON.stringify(blogPost)
        });
        console.log(response);
    }
    //GET
    async apiGET() {

        try {
            // fetch GET request
            const response = await fetch(this.apiUrl); 

            // check if fetch was successful
            if (!response.ok) {
                throw new Error("Fetch request not successful");
            }
            const data = await response.json(); 

            //element ist any, macht noch mehr probleme, wenn man data oder zb. element.title als string deklariert
            data.forEach((element:any) => {
                this.blogManager.addNewPost(element._id, element.author, element.title, element.body);
            });
        
        } catch (err) {
            throw err;
        }
    }
    //DELETE
    async apiDELETE(_id:string) {
        try {
            const response = await fetch(`${this.apiUrl}/${_id}`, {
                // request options
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error("DELETE unsucsessful!")
            }
        } catch (err) {
            throw err;
        }
    }

    //UPDATE
    async apiPUT(blogPost:BlogPost) {

        try {
            const response = await fetch(`${this.apiUrl}/${blogPost._id}`, {
                // request options
                method: 'PUT',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogPost)
            })
            console.log(response);

            if (!response.ok) {
                throw new Error("PUT not successful, try again.");
            }
        } catch (err) {
            throw err;
        }

    }

}