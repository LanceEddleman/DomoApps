var myMultiArray = [
            [1,2,3,4,5      , [1,2,3,4,5] ],
            [6,7,8,9,10     , [1,2,3,4,6] ],
            [11,12,13,14,15 , [1,2,3,4,5] ],
            [16,17,18,19,20 , [1,2,3,4,5] ]
            ];

console.log( myMultiArray[1][5][4] ); // 6
console.log( myMultiArray[1][5][0] ); // 1
console.log( myMultiArray[2][5][3] ); // 4


console.time("My Math");
var x = 5 + 5;
console.log("answer: " + x);
console.timeEnd("Time Spent " + "My Math");
console.log("Done with math.");
