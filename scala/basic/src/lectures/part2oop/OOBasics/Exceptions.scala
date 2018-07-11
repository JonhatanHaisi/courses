package lectures.part2oop.OOBasics

object Exceptions extends App {
  
  val x: String = null
  // println(x.length) // this will crash with a NullPointerException
  
  // throwing and catching exceptions
  //val aWeirdValue: String = throw new NullPointerException
  
  // throwable classes extend the Throwable class
  // Exception and Error are the major Throwable subtypes
  
  // 2. how to catch exception
  def getInt(withExceptions: Boolean): Int =
    if (withExceptions) throw new RuntimeException("No int for you!")
    else 42
    
  val potentialFail = try {
    // code that might throw
    getInt(true)
  } catch {
    // case e: RuntimeException => println("caught a Runtime exception")
    case e: RuntimeException => 43
  } finally {
    // use only for side effects
    println("finally")
  }
  
  println(potentialFail)
  
  // how to define your own exceptions
  class MyException extends Exception
  val exception = new MyException
  
  // throw exception
  
  /*
     1. Carsh your program with an OutOfMemoryError
     2. Crash with StackOverflowError
     3. PocketCalculator
        - add(x, y)
        - subtract(x, y)
        - multiply(x, y)
        - divide(x, y)
        
        throw
          - OverflowException if add(x, y) exceeds Int.MAX_VALUE
          - UnderflowException if subtract(x, y) exceeds Int.MIN_VALUE
          - MathCalculationException for division by 0
   */
  
  // val array = Array.ofDim(Int.MaxValue)
  
  /*
  def go(): Unit = {
    go()
    val x = 0
  }
  go()
  */
  
  object PocketCalculator {
    class OverflowException extends Exception
    class UnderflowException extends Exception
    class MathCalculationException extends Exception
    
    def add(x: Int, y: Int) = {
      val result = x + y
      if (x > 0 && y > 0 && result < 0) throw new OverflowException
      else x + y
    }
      
    def subtract(x: Int, y: Int) = {
      val result = x - y
      if (x < 0 && y < 0 && result > 0) throw new UnderflowException
      else x - y
    }
      
    def multply(x: Int, y: Int) = x * y
    
    def divide(x: Int, y: Int) =
      if (y == 0) throw new MathCalculationException
      else x / y
  }
  
}