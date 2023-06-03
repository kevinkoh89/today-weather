export const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    

    return data;
}

export const convertDate = (unixtimestamp: number, showSec: boolean, returnType: 'dateTime' | 'time') => {
    let convertedDate = '';
    if (unixtimestamp) {
        const dateTime = new Date(unixtimestamp * 1000);
        const year = dateTime.getFullYear();
        const month = dateTime.getMonth();
        const date = dateTime.getDate();
        const minusTwelve = dateTime.getHours() - 12;
        const hours = minusTwelve < 0 ? dateTime.getHours() : minusTwelve;
        const minutes = "0" + dateTime.getMinutes();
        const seconds = "0" + dateTime.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + (minusTwelve < 0 ? ' AM' : ' PM');
        if(showSec){
            formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + (minusTwelve < 0 ? ' AM' : ' PM');
        }
        
        convertedDate = returnType === 'time' ? formattedTime : `${year}-${month}-${date} ${formattedTime}`
    }

    return convertedDate;
}
