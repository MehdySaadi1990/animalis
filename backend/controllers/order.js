const Order = require('../models/order')
const sendEmail = require('../utils/email')

exports.orderItem= async (req,res,next)=>{
    try {
        const orderObject = req.body
        delete orderObject._id
        const order = await new Order({
        ...orderObject,
        userId:req.auth.userId,
    }).save()
    const orderNumber = (await Order.find()).length
    const message = `<h1>Commande N°${orderNumber}</h1>
                    <p>Order : ${req.body.order}</p><br/>
                    <p>Name : ${req.body.name}</p><br/>
                    <p>Surname : ${req.body.surname}</p><br/>
                    <p>Email : ${req.body.email}</p><br/>
                    <p>Phone : ${req.body.phone}</p><br/>
                    <p>Livraison : ${req.body.delivery}</p><br/>
                    <p>Remarques : ${req.body.notice}</p>
                    `
    await sendEmail(process.env.USER_EMAIL,`Commande N°${orderNumber}`, message )
    res.status(200).json({orderNumber:orderNumber})
    } catch (error) {
        res.status(400).json({message : "An error occured"});
    }
    
}