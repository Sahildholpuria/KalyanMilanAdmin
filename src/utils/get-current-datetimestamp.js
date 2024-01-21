export const getFormatedDateTimeStamp = (date) => {
    // Get the current time
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    
    // Format the current time
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Format the current date and time
    let formattedOpenDate = date + ' ' + formattedTime;
    return new Date(formattedOpenDate).toString();
}
