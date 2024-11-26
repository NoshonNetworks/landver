export function formatDate(date:Date){
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthIndex = date.getMonth()
    const dayIndex = date.getDate()
  
    return `${monthNames[monthIndex]} ${dayIndex}`
  }

export function formatTimestampToDate(timestamp:number) {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2,   
   '0');
    const year = date.getFullYear().toString().slice(-2);   
   // Get the last two digits of the year
  
    return `${day}/${month}/${year}`;
  }
  