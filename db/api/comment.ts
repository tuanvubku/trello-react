
import * as express from "express";
import * as MESSAGE from '../utils/constant';
import Comment from '../Models/Comment';
const router = express.Router();
const CommentModel = new Comment().getModelForClass(Comment);
// API for testing
//show all comment,just for test
router.get('/', (req, res) => {
    (async () => {
        const comment = await CommentModel.find({}); //WHY NOT SHOW REF        
        res.send(comment);
    })();
});
// api delete all comment
router.get('/delete-all', (req, res) => {
    (async () => {
        const comment = await CommentModel.remove({});
        res.send({status:MESSAGE.DELETE_COMMENT_OK});
    })();
});


//end API for test ///////////////////////////////

// api delete by _id
router.post('/delete', (req, res) => {
    var { _id } = req.body;
    (async () => {
        const comment = await CommentModel.deleteOne({ _id });
        res.send({
            status: MESSAGE.DELETE_COMMENT_OK
        });
    })();
});

router.post('/add', (req, res) => {   
    var { content,ownerId,cardId,fileUrl } = req.body; 
    (async () => {
        var obj={};
        if(fileUrl !== null && fileUrl!== undefined)obj['fileUrl']=fileUrl;
        obj['content']=content;
        obj['ownerId']=ownerId;
        obj['cardId']=cardId;
        const c = new CommentModel(obj );
        var comment = await c.save();
        comment=await CommentModel.findOne({ _id: comment._id });
        res.send({
            status: MESSAGE.ADD_COMMENT_OK, comment
        });
    })();
});

//update info comment: content, fileUrl
router.post('/edit', (req, res) => {
    const { _id, content, fileUrl} = req.body;
    var existcomment;
    (async () => {
        existcomment = await CommentModel.findOne({ _id });
        if(existcomment===null)res.send({status: MESSAGE.NOT_FOUND})
        var obj = {};
         //field which was modified will update, else not update
        if (content !== null &&  content !== undefined)
            obj['content'] = content;
        if (fileUrl !== null &&  fileUrl !== undefined)
            obj['fileUrl'] = fileUrl;
        await CommentModel.update({ _id }, { $set: obj });
        const comment = await CommentModel.findOne({ _id });
        res.send({
            status: MESSAGE.EDIT_COMMENT_OK, comment
        });
    })();
});

export default router;

