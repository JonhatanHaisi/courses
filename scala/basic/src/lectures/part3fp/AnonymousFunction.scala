package lectures.part3fp

object AnonymousFunction extends App {
  
  // anonymous function (LAMBDA)
  val doubler: Int => Int = (x: Int) => x * 2
 
  // multiple params in a lambda
  val adder: (Int, Int) => Int = (a, b) => a + b
 
  // no params
  val justDoSomething: () => Int = () => 3
  
  println(justDoSomething) // print object name
  println(justDoSomething()) // 3
  
  val stringToInt = { (str: String) => str.toInt }
  
  // MOAR syntactic sugar
  val niceIncrementer: Int => Int = _ + 1 // equivalent to x => x + 1
  val niceAdder: (Int, Int) => Int = _ + _// equivalent to (a,b) => a + b
    
  
}