import mongoose from 'mongoose'
const connectDB = async ()=>{
    try{
        mongoose.connection.on('connected', ()=>console.log('Mongo Db Connected'))
        await mongoose.connect(process.env.MONGODB_URL as string)
    }catch(error){
        console.log('Error connectiong to MongoDB:', error)
    }
}
export default connectDB