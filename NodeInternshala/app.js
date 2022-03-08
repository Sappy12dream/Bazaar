const friends = [{
    firstName:"Sapna",
    lastName:"Singh"
},{
    firstName:"Sam",
    lastName:"Singh"
},{
    firstName:"Spua",
    lastName:"Singh"
},{
    firstName:"Saun",
    lastName:"Singh"
}]

friends.push({firstName:"Ginny",lastName:"gin"})

friends.forEach(friend =>{
    console.log(`Hello ${friend.firstName} ${friend.lastName}`)
})