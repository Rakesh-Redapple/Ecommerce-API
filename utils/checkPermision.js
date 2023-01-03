const checkPermission=(reqUser,resourceUserId)=>{
    // console.log(reqUser);
    // console.log(resourceUserId);
    // console.log(typeof resourceUserId);

    if(reqUser.role==='admin') return;
    if(reqUser.userId===resourceUserId.toString()) {;

    throw new Error('not authorized to access this route');
    }

}


module.exports=checkPermission;