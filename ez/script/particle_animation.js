
let a, init, val, len, speed;

class Animation {
  constructor(init) {
    this.init = init;
    this.speed = 1;
    this.arr = this.init.split('');
    this.l = this.init.replace(/R/g, '.').split('');
    this.r = this.init.replace(/L/g, '.').split('');
    this.d = this.init.replace(/[LR]/g, 'X').split('');
  }
  animate(speed) {
    speed = parseInt(speed, 10);
    this.speed = speed;
    let len = this.arr.length
    let l, r, d, n;
    l = this.l;
    r = this.r;
    d = this.d;
    n;
    for(let i = 0; i < len; i++){
      if(l[i] === 'L'){
        n = i - speed;
        l[i] = '.';
        if(n >= 0 && n < len){
          l[n] = 'L';
        }
      }
    }
    console.log('l')
    console.log(l)
    for(let i = len - 1; i > -1; i--){
      if(r[i] === 'R'){
        n = i + speed;
        r[i] = '.';
        if(n >= 0 && n < len){
          r[n] = 'R';
        }
      }
    }
    console.log('r')
    console.log(r)
    for(let i = 0; i < len; i++){
      let v = '.'
      if(l[i] === 'L' || r[i] === 'R'){
        v = 'X';
      }
      d[i] = v;
    }
    console.log('d')
    console.log(d)
  }
  getString(){
    return this.d.join('');
  }
}
