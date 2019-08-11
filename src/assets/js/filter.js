export const  moneyFormat = function(money){
    return money? money.toFixed(2): new Number(0).toFixed(2);
}
export const  fixTitle = function(title){
    if(title.length>13){
       let arr = title.split('')
       let flg = Math.floor(arr.length/2)
       var arr2 = arr.slice(0,flg)
       for(let i = 0;i<3;i++){
           arr2.push('.');
       }
       arr2 = arr2.join('');
       return arr2
    }else {
        return title
    }
    
}