function fn(i){
    /*   AAAFFF111 */
    return function (n){
       console.log(n+(++i));
    }
 }
 var f=fn(10);// i=10==>11==>12; f= AAAFFF111
 f(20);// n=20; 20+ 11=31
 fn(20)(40);//i=20==>21 n=40 40+21=61
 fn(30)(50);//i=30==>31  n=50 50+31=81
 f(30);// n=30 30+12=42