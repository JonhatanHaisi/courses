package lectures.part3fp

object MapFlatmapFilterFor extends App {
 
  val list = List(1, 2, 3)
  
  println(list)
  println(list.head)
  println(list.tail)
  
  // map
  println(list.map(_ + 1))
  println(list.map(_ + " is a number"))
  
  // filter
  println(list.filter(_ % 2 == 0))
  
  // flatmap
  val toPair = (x: Int) => List(x, x + 1)
  println(list.flatMap(toPair))
  
  // print all combinations between two lists
  val numbers = List(1, 2, 3, 4)
  val chars = List('a', 'b', 'c', 'd')
  // List("a1", "a2", ..., "d3", "d4")
  
  // iterating
  val combinations = numbers.flatMap(n => chars.map(c => "" + c + n))
  println(combinations)
 
  // foreach
  list.foreach(println)
  
  // for-comprehensions
  val forCombinations = for {
    n <- numbers if n % 2 == 0
    c <- chars
  } yield "" + c + n
  println(forCombinations)
  
  for {
    n <- numbers
  } println(n)
  
  // syntax overload
  list.map { x => x * 2 }
  
  

}

