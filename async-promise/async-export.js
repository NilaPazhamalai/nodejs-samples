function exportToExcel(data,path,callback){
    console.log('in async fn - call back');
     //path = data;
     for (let index = 0; index < 300; index++) {
        if(index==300){
            callback(null,path+ "/fileName.exc");
        }
        
    }
    callback(new Error('exception'),'');
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