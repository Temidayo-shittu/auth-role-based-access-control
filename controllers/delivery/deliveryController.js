const Delivery = require('../../models/Delivery');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors')
const { checkPermissions } = require('../../utils');
const User = require('../../models/User');
const { generateDeliveryNumber } = require('../../utils/randomString');

const createDelivery = async (req,res)=>{
    req.body.user = req.user.userId;
    const validUser = await User.findById(req.user.userId);
    if(!validUser) throw new CustomError.NotFoundError(`User with ID:${req.user.userId} does not exist`);
    req.body.delivery_reference = generateDeliveryNumber();
    const delivery = await Delivery.create(req.body);
    await delivery.save();
    res.status(StatusCodes.CREATED).json({delivery})
};

const getAllDeliveries = async (req,res)=>{
    const deliveries = await Delivery.find({}).populate('user', 'fullname email')
    res.status(StatusCodes.OK).json({deliveries, count:deliveries.length})
};

const getSingleDelivery = async (req,res)=>{
    const validUser = await User.findById(req.user.userId);
    if(!validUser) throw new CustomError.NotFoundError(`User with ID:${req.user.userId} does not exist`);
    const { id:deliveryId } = req.params
    const delivery = await Delivery.findById(deliveryId).populate('user', 'fullname email')
    if(!delivery) throw new CustomError.NotFoundError(`No delivery with ID:${deliveryId} exists`);
    res.status(StatusCodes.OK).json({delivery})
};

const updateDeliveryStatus = async (req, res) => {
    const validUser = await User.findById(req.user.userId);
    if(!validUser) throw new CustomError.NotFoundError(`User with ID:${req.user.userId} does not exist`);
    const { id: deliveryId } = req.params;
    const { status } = req.body;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery)  throw new CustomError.NotFoundError(`No delivery with ID: ${deliveryId} exists`);
    checkPermissions(req.user, delivery.user._id);
    // Update only the status field
    delivery.status = status;
    await delivery.save();

    res.status(StatusCodes.OK).json({ msg: 'Delivery status updated successfully', delivery });
};

const deleteDelivery = async (req,res)=>{
    const validUser = await User.findById(req.user.userId);
    if(!validUser) throw new CustomError.NotFoundError(`User with ID:${req.user.userId} does not exist`);
    const { id:deliveryId } = req.params
    const delivery = await Delivery.findById(deliveryId);
    if(!delivery) throw new CustomError.NotFoundError(`No delivery with ID:${deliveryId} exists`);
    checkPermissions(req.user, delivery.user._id);
    await delivery.deleteOne(); 
    res.status(StatusCodes.OK).json({msg:'Delivery have been succesfully removed!!'})
};

module.exports= {
    createDelivery,
    getAllDeliveries,
    getSingleDelivery,
    updateDeliveryStatus,
    deleteDelivery
};