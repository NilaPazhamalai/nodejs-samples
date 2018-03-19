var defaultFolderPath = "C://temp";

var getDefaultOutputFilePath = () => {
    return defaultFolderPath + "//" + "output.txt";
}

var gettOutputFilePath = (fileName) => {
    return defaultFolderPath + "//" + fileName + ".txt";
}

// named export
exports.defaultFolderPath = defaultFolderPath;
exports.getDefaultOutputFilePath = getDefaultOutputFilePath;
exports.gettOutputFilePath = gettOutputFilePath;



