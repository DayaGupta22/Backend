import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new mongooose.Schema(
    {
      videoFile:{
        type:String, // cloudinary url saves here
        required:true
      }  ,
      thumbnail:{
        type:String, // cloudinary url saves here
        required:true
      },
        title:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        description:{
            type:String,
            trim:true
        },
        duration:{
            type:Number,
            required:true
        },
        view :{
            type:Number ,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }


    },{timestamps:true}
)
// using the aggegration pipeline 
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)