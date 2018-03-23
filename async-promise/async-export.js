async function exportToExcel(data,path){
    console.log('in async fn - call back');
     //path = data;
    var path1 = await loopFn(path) ;
    return path1;
}


function loopFn(path){
    console.log('in loop fn -async');
    for (let index = 0; index < 500; index++) {
        if(index==499){
            console.log("Path from async fn" + path+ "/fileName.exc");
            return "Path from async fn" + path+ "/fileName.exc";
        }
    }
}

function exportToExcelSync(data,path){
    console.log('in sync fn');
        //path = data;
        
        for (let index = 0; index < 300; index++) {
            if(index==300){
                return path+ "/fileName.exc";
            }
            
        }
        
}

function callback(error,result){
    if(err) {
        console.log(err);
        return;
    }
      console.log(data);
}

module.exports = {
    exportToExcel : exportToExcel,
    exportToExcelSync : exportToExcelSync
}