const Message = require('../../dbModels/messageSchema');


exports.messageController = (req, res) => {
    const message = new Message({
        user : req.user._id,
        name: req.body.name,
        message: req.body.message
    })

    message.save((error) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }else{
            return res.status(200).json({
                message:"We Got Your Message.."
            })
        }
    })
}