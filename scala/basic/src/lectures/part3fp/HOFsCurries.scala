package lectures.part3fp

object HOFsCurries extends App {
  
 val superFunction: (Int, (String, (Int => Boolean)) => Int) => (Int => Int) = null
 // higher order function (HOF)
 
 // function that applies a function n times over a value x
 // nTimes(f, n, x)
 // nTimes(t, 3, x) = f(f(f(x)))
 
 def nTimes(f: Int => Int, n: Int, x: Int): Int =
   if (n >= 0) x
   else nTimes(f, n-1, f(x))
   
 val plusOne = (x: Int) => x + 1
 println(nTimes(plusOne, 10, 1))
 
 
 // ntb(f, n) = x => f(f(f...(x)))
 // increment10 = ntb(plusOne, 10) = x => plusOne(plusOne....(x))
 // val y = incremenr10(1)
 def nTimesBetter(f: Int => Int, n: Int): (Int => Int) =
   if (n <= 0) (x: Int) => x
   else (x: Int) => nTimesBetter(f, n-1)(f(x))

 val plus10 = nTimesBetter(plusOne, 10)
 println(plus10(1))

 
 // curried functions
 val superAdder: Int => Int => Int = x => y => x + y
 val add3 = superAdder(3)  // y => 3 + y
 println(add3(10))
 println(superAdder(3)(10))
 
 
 // functions with multiple parameters lists
 def curriedFormatter(c: String)(x: Double): String = c.format(x)
 
 val standardFormat: (Double => String) = curriedFormatter("%4.2f")
 val preciseFormat: (Double => String) = curriedFormatter("%10.8f")
 
 println(standardFormat(Math.PI))
 println(preciseFormat(Math.PI))
 
}
