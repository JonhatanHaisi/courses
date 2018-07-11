package lectures.part1basics

object Expressions extends App {
  
  val x = 1 + 2
  println(x)
  
  println(2 + 3 * 4)
  // + - * / & | ^ << >> >>> (right shift with zero extension)
  
  println(1 == x)
  // == != > >= < <=
  
  println(!(1 == x))
  // ! && ||
  
  var aVariable = 2
  aVariable += 3
  println(aVariable)
  
  // Instructions (DO) vs Expressions (VALUE)
  
  // IF expression
  val aCondition = true
  val aConditionValue = if (aCondition) 5 else 3
  println(aConditionValue)
  
  var i = 0
  while (i < 10) {
    println(i)
    i += 1
  }
  // NEVER WRITE THIS AGAIN
  
  // EVERYTHING in Scala is an Expression!
  
  val aWeirdValue = (aVariable = 3) // Unit === void
  println(aWeirdValue) // == ()
  
  // side effects: println(), whiles, reassigning
  // Code blocks
  
  val aCodeBlock = {
    val y = 2
    val z = y + 1
    
    if (z > 2) "hello" else "goodbye"
  }
  
  // 1. difference between "hello world" vs println("hello world)?
  // "hello world" is a value of type String
  // println("hello world) is an expression with side effect
  
  // 2.
  val someValue = { // true
    2 < 3
  }
  
  val someOtherValue = { // 42
    if(someValue) 239 else 986
    42
  }
}

