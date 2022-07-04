var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BlogPost__id;
export class BlogPost {
    constructor(displayOrder, author, title, body) {
        _BlogPost__id.set(this, void 0);
        __classPrivateFieldSet(this, _BlogPost__id, "", "f");
        this.displayOrder = displayOrder;
        this.author = author;
        this.title = title;
        this.body = body;
    }
    //METHODS
    //getter and setter for _id
    get _id() {
        return __classPrivateFieldGet(this, _BlogPost__id, "f");
    }
    set _id(internalId) {
        __classPrivateFieldSet(this, _BlogPost__id, internalId, "f");
    }
}
_BlogPost__id = new WeakMap();
export class BlogManager {
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
    getblogList() {
        this.orderCounter = 0;
        return this.blogList;
    }
    //adds a blogPost
    addPost(blogPost) {
        this.blogList.push(blogPost);
    }
    //creates new blogPost and inserts it in list
    addNewPost(_id, author, title, body) {
        let blogPost = new BlogPost(this.orderCounter++, author, title, body);
        if (_id !== "") {
            blogPost._id = _id;
        }
        this.blogList.push(blogPost);
        return blogPost;
    }
    //create Posts for testing
    testPostsOne() {
        let newBlogBody = "Testi Testus Testorum Testosteron testet Testinger und überhaupt und so weiter und so fort. Citation needed!";
        let newBlogPost1 = new BlogPost(this.orderCounter++, "TestBert", "Über den Testblog", newBlogBody);
        this.addPost(newBlogPost1);
    }
    testPostThree() {
        this.testPostsOne();
        let newBlogPostBody2 = "Earl Grey: DER Klassiker. Darjeeling: Sanft und sehr angenehm. Assam: Rau und voll. Ceylon Orange Pekoe: herrlich holzig. Englisch Breakfast:";
        let newBlogPost2 = new BlogPost(this.orderCounter++, "TeeTrinker", "Schwarztee - eine Geschichte voller Missverständnisse", newBlogPostBody2);
        this.addPost(newBlogPost2);
        let newBlogPostBody3 = "Oh? And when the last law was down, and the Devil turned 'round on you, where would you hide, Roper, the laws all being flat?";
        let newBlogPost3 = new BlogPost(this.orderCounter++, "Thomas Moore", "A Man For All Seasons", newBlogPostBody3);
        this.addPost(newBlogPost3);
    }
    displayBlogPosts() {
    }
}
