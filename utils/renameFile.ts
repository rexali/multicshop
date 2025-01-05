/**
 * Rename a given filename
 * @param filename : a given file name
 * @returns new name
 */
const renameFile = (filename:string) => {
    // get the current tim
    const currentTime = Date.now();
    // regular expression to get the _-
    const regex = /[\s_-]/gi;
    // replace _- with .
    const fileTemp = filename.replace(regex, ".");
    // split the result by .
    const  arrTemp = [fileTemp.split(".")];
    // slice and join
    const newname = `${arrTemp[0].slice(0, arrTemp[0].length - 1).join("_")}${currentTime}.${arrTemp[0].pop()}`;

    return newname;
};

export{
    renameFile
}