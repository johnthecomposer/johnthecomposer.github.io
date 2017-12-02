/*
EquityZen Programming Challenge - solution by John Celentano - john.celentano@gmail.com
*/

function get_letters(sentence){
  let u = [];
  for(let l = 0; l < sentence.length; l++){
    let char = sentence[l];
    if(char.match(/^[A-Za-z]+$/)){
      if(!u.includes(char.toLowerCase())){
        u.push(char.toLowerCase());
      }
    }
  }
  return u.sort().join('');
}
// console.log(get_letters("A quick brown fox jumps over the lazy dog") === "abcdefghijklmnopqrstuvwxyz");
// console.log(get_letters("A slow yellow fox crawls under the proactive dog") === "acdefghilnoprstuvwxy");
// console.log(get_letters("Lions, and tigers, and bears, oh my!") === "abdeghilmnorsty");
