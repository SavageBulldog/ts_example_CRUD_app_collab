export class BlogPost {
    #_id: string;
    displayOrder: number;
    author: string;
    title: string;
    body: string;
    constructor(displayOrder:number, author:string, title:string, body:string) {
        this.#_id = "";
        this.displayOrder = displayOrder;
        this.author = author;
        this.title = title;
        this.body = body;
    }
    //METHODS
    //getter and setter for _id
    get _id():string {
        return this.#_id;
    }
    set _id(internalId) {
        this.#_id = internalId;
    }
}

export class BlogManager {
    orderCounter:number;
    blogList:BlogPost[];
    constructor() {
        this.orderCounter = 0;
        this.blogList = [];
        //report to Console
        console.log(`${this.constructor.name} is instanced and ready`);
    }
    //METHODS
    clearList() {
        this.blogList = [];
        console.log(`${this.constructor.name} List is now cleared`);
    }
    //returns blogList
    getblogList():BlogPost[] {
        this.orderCounter = 0;
        return this.blogList;
    }
    //adds a blogPost
    addPost(blogPost:BlogPost) {
        this.blogList.push(blogPost);
    }
    //creates new blogPost and inserts it in list
    addNewPost(_id:string, author:string, title:string, body:string):BlogPost {
        let blogPost = new BlogPost(this.orderCounter++, author, title, body);
        if(_id !== "") {
            blogPost._id = _id;
        }
        this.blogList.push(blogPost);
        return blogPost;
    }

    //create Posts for testing
    testPostsOne() {
        let newBlogBody = "Testi Testus Testorum Testosteron testet Testinger und überhaupt und so weiter und so fort. Citation needed!"
        let newBlogPost1 = new BlogPost(this.orderCounter++, "TestBert", "Über den Testblog", newBlogBody);
        this.addPost(newBlogPost1);
    }
    testPostThree() {
        this.testPostsOne();
        let newBlogPostBody2 = "Earl Grey: DER Klassiker. Darjeeling: Sanft und sehr angenehm. Assam: Rau und voll. Ceylon Orange Pekoe: herrlich holzig. Englisch Breakfast:";
        let newBlogPost2 = new BlogPost(this.orderCounter++, "TeeTrinker", "Schwarztee - eine Geschichte voller Missverständnisse", newBlogPostBody2)
        this.addPost(newBlogPost2);
        let newBlogPostBody3 = "Oh? And when the last law was down, and the Devil turned 'round on you, where would you hide, Roper, the laws all being flat?"; 
        let newBlogPost3 = new BlogPost(this.orderCounter++, "Thomas Moore", "A Man For All Seasons", newBlogPostBody3);
        this.addPost(newBlogPost3);
    }
    displayBlogPosts() {
        
    }
}