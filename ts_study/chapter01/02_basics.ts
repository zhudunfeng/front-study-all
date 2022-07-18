//声明一个变量a,同时指定它的类型为number
let a: number;
// a 的类型设置为了number，在以后的使用过程中a的值只能是数字
a = 10;
// a = 'hello';此行代码会报错

function sum(a: number,b: number): number {
  return a + b;
}

let result = sum(11,12)