const asyncHandler = (fn) =>async(req,res,next)=>{
    try {
        await fn(req,res,next);
    }catch(error){
        res.status(error.code || 500).json({
            success:false,
            message:err.message
        })
    }
}

export default asyncHandler;
//for promises type

// const aysncHandler = (requestHandler)=>{
//     (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next)).catch ((err)=> next(err));
//     }
// }