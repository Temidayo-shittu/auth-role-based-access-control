const Shipment = require('../../models/Shipment')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors')
const { checkPermissions } = require('../../utils/checkPermissions');
const User = require('../../models/User');
const { trackingNumber } = require('../../utils/randomString');

const createShipment = async (req,res)=>{
    req.body.user = req.user.userId;
    const validUser = await User.findById(req.user.userId);
    if(!validUser) throw new CustomError.NotFoundError(`User with ID:${req.user.userId} does not exist`);
    req.body.tracking_number = trackingNumber();
    const shipment = await Shipment.create(req.body);
    await shipment.save();
    res.status(StatusCodes.CREATED).json({shipment})
};

const getAllShipments = async (req,res)=>{
    const shipments = await Shipment.find({}).populate('user', 'fullname email')
    res.status(StatusCodes.OK).json({shipments, count:shipments.length})
};

const getSingleShipment = async (req,res)=>{
    const validUser = await User.findById(req.user.userId);
    if(!validUser) throw new CustomError.NotFoundError(`User with ID:${req.user.userId} does not exist`);
    const { id:shipmentId } = req.params
    const shipment = await Shipment.findById(shipmentId).populate('user', 'fullname email')
    if(!shipment) throw new CustomError.NotFoundError(`No shipment with ID:${shipmentId} exists`);
    //checkPermissions(req.user, shipment.user._id);
    res.status(StatusCodes.OK).json({shipment})
};

const updateShipmentStatus = async (req, res) => {
    const validUser = await User.findById(req.user.userId);
    if(!validUser) throw new CustomError.NotFoundError(`User with ID:${req.user.userId} does not exist`);
    const { id: shipmentId } = req.params;
    const { status } = req.body;

    const shipment = await Shipment.findById(shipmentId);
    if (!shipment)  throw new CustomError.NotFoundError(`No Shipment with ID: ${shipmentId} exists`);
    checkPermissions(req.user, shipment.user._id);
    // Update only the status field
    shipment.status = status;
    await shipment.save();

    res.status(StatusCodes.OK).json({ msg: 'Shipment status updated successfully', shipment });
};

const deleteShipment = async (req,res)=>{
    const validUser = await User.findById(req.user.userId);
    if(!validUser) throw new CustomError.NotFoundError(`User with ID:${req.user.userId} does not exist`);
    const { id:shipmentId } = req.params
    const shipment = await Shipment.findById(shipmentId);
    if(!shipment) throw new CustomError.NotFoundError(`No shipment with ID:${shipmentId} exists`);
    checkPermissions(req.user, shipment.user._id);
    await shipment.deleteOne(); 
    res.status(StatusCodes.OK).json({msg:'Shipment have been succesfully removed!!'})
};

module.exports= {
    createShipment,
    getAllShipments,
    getSingleShipment,
    updateShipmentStatus,
    deleteShipment
};