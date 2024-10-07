
const countDown = () => {
    let num = 3;
    const clockId = setInterval(() => {
        if(num <= 1){
            clearInterval(clockId);
        }
        console.log(num);
        num--;
    }, 1000)
}

countDown();