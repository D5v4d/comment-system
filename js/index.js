"use strict";
class CommentBlog {
    storage;
    profile;
    sendingComment;
    messag;
    filter;
    constructor() {
        this.storage = new Storag();
        this.profile = new Profile(this.storage);
        this.sendingComment = new SendingComment(this.storage);
        this.messag = new Messag(this.storage, this.profile);
        this.filter = new Filter(this.storage, this.messag);
    }
}
const commentBlog = new CommentBlog();
