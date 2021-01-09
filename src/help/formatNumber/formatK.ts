export const formatK = (num: number)=>{
  let number = '';
  if (num % 100 !== 0){
    number = `${num}`
  } else {
    number = `${num /1000}K`
  }
  return number;
};
