//server usage - to render view
module.exports.fileNames = {
    index: './web-api/view/index.html',
    list: './web-api/view/employeeList.html',
    addNew: './web-api/view/employeeCreate.html',
    update: './web-api/view/employeeUpdate.html',
    remove: './web-api/view/employeeRemove.html',
    detail: './web-api/view/employeeDetail.html'
}


//client usage - to request view
module.exports.view = {
    index: 'index',
    list: 'employeeList',
    addNew: 'employeeCreate',
    update: 'employeeUpdate',
    remove: 'employeeRemove',
    detail:'employeeDetail'
}

// client usage - to request data from api endpoints
module.exports.url = {
    index: 'index',
    list: 'employeeList',
    addNew: 'employeeCreate',
    update: 'employeeUpdate',
    remove: 'employeeRemove',
    detail:'employeeDetail'
}