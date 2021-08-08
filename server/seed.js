const User = require('./models/user')

const cities = ['Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'jaipur', 'Pune']

const seed = async () => {
    // const users = await User.deleteMany()
    // const refBy = await User.findOne({email:'syed.zaid525@gmail.com'}).exec();
    // console.log(refBy)
    // const delU = await user.findOneAndDelete({email:'syed.zaid98@gmail.com'})
    // console.log(delU)
    // const refBy = await User.findOneAndUpdate({ referral:{code :'dpac9525-hSmn8le7-50'} }, { $inc: { "referral.p_count": 1 } }, { new: true }).exec();
    // const fusers = await User.find()
    // console.log(fusers)
    // console.log(fusers.length)
    // // console.log(fusers.length)
    // const user = await User.findOne({email:'syed.zaid98@gmail.com'})
    // console.log('All user: ')
    // console.log(user)
    // allUser.map(async each => {
    //     console.log(each.referral)
    // })


    // const newTypes = await Type.find()
    // console.log(newTypes)

    // const newUser = await new User({ name: `both chekc`, email: `zcheck12@gmail.com`, emailVerified: true, role:'agent', response: true, request: true, city: 'Bangalore', type: '60ab1fe67725f63a6c9d9348' }).save()
    // console.log(newUser)
    // const newUsers = await User.findOne({email:'dpac9525@gmail.com'})
    // console.log(newUsers)
    // newUsers.map(each=>{
    //     console.log(each.type)
    // })
    // const fUser = await User.find({city:'Bangalore' });
    // console.log(fUser)
    // console.log(fUser.length)
    // const fUser = await User.findOneAndUpdate({ email: `dpac9525@gmail.com` },{role:'admin'},{new:true} );
    // console.log("fUser")
    // console.log(fUser)

    // console.log(newUsers.length)
    // const deletedUsers = await User.deleteMany({ response: true })
    // console.log("deletedUsers")
    // console.log(deletedUsers)
    // const newUser = await new User({ name: `Zaid`, email: `syed.zaid525@gmail.com`, emailVerified: true, response: true, request: true, city: 'Bangalore', role: 'admin', type: newTypes[0]._id }).save();
    // for (let i = 10; i < 14; i++) {
    //      const newTypes = await new Type({name:`type${i}`}).save()
    //   console.log(newTypes)
    //     const city = Math.floor(Math.random() * 7)
    //     const newUser = await new User({ name: `z${i}`, email: `z${i}@gmail.com`, emailVerified: true, response: true, request: false, city: cities[city], type: newTypes[city]._id }).save();
    //     console.log(`newUser${[i + 1]}`)
    //     console.log(newUser)
    // }
}

module.exports = seed;