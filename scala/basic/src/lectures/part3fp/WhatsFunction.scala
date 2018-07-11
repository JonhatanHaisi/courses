package lectures.part3fp

object WhatsFunction extends App {
  
  val doubler = new MyFunction[Int, Int] {
    override def apply(element: Int): Int = element + 2
  }
  
  println(doubler(2))
  
  // function types = Function[A, B]
  val stringToIntConverter = new Function1[String, Int] {
    override def apply(string: String): Int = string.toInt
  }
  
  println(stringToIntConverter("3") + 4)
  
  val adder: ((Int, Int) => Int) = new Function2[Int, Int, Int] {
    override def apply(a: Int, b: Int): Int = a + b
  }
  
  /*
   1. a function which takes 2 strings and concatenates them
   2. transform the MyPredicate and MyTransformer into function types
   3. define a function which takes an int and returns another function which takes an Int and returns an Int 
      - what's the type of this function
      - how to do it
   */
  val concat: ((String, String) => String) = (a, b) => a + b
  
  trait MyPredicate[T] extends Function1[T, Boolean]
  
  trait MyTransformer[A, B] extends Function1[A, B]
  
  // high order function
  trait myFunc extends Function1[Int, ((Int) => Int)]
  
  // myFunc(1)(2) // curried function
}

trait MyFunction[A, B] {
  def apply(element: A): B
}