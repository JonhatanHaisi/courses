package lectures.part4pm

object PatternsEverywhere extends App {
  
  try {
    // code
  } catch {
    case e: RuntimeException => "runtime"
    case npe: NullPointerException => "npe"
    case _ => "something else"
  }
  
  // catches are actually MATCHES
  /*
   try {
     // code
   } catch (e) {
     case e: RuntimeException => "runtime"
     case npe: NullPointerException => "npe"
     case _ => "something else" 
   }
   */
  
  val list = List(1, 2, 3, 4)
  val evenOnes = for {
    x <- list if x % 2 == 0 
  } yield 10 * x
  
  // generators are also based on PATTERN MATCHING
  val tuples = List((1, 2), (3, 4))
  val filterTuples = for {
    (first, second) <- tuples
  } yield first * second
  // case classes, :: operators, ...
  
  val tuple = (1, 2, 3)
  val (a, b, c) = tuple
  println(b)
  // multiple value definition based on PATTERN MATCHING
  // ALL THE POWER
  
  val head :: tail = list
  println(head)
  println(tail)
  
  // partial function
  val mappedList = list.map {
    case v if v % 2 == 0 => v + "is even"
    case 1 => "The one"
    case _ => "something else"
  } // partial function literal
  
  val mappedList2 = list.map { x => x match {
      case v if v % 2 == 0 => v + "is even"
      case 1 => "The one"
      case _ => "something else"
    }
  }

  println(mappedList)
  
}