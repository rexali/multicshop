'use client'

/**
 * Find if the checkbox is marked.
 * @param evt :an event
 * @returns a boolean value
 */
const isChecked = (evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
        // check if checkbox is checked
        if (evt.target.value === "on") {
            // return true
            return true
        }
        // return false
        return false;
    } catch (error) {
        // print error
        console.warn(error);
    }
}
export {
    isChecked
}