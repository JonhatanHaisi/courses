package lectures.part1basics

object ValuesVariablesTypes extends App {
  
  val x: Int = 42
  val x2 = 42
  
  println(x)
  
  
  // Vals are immutable
  
  // Compiler can  infer types
  
  val aString: String = "Hello"
  val anotherString = "goodbye"
  
  val aBoolean: Boolean = false
  val aChar: Char = 'a'
  val aShort: Short = 5613
  val aLong: Long = 25754236547653265L
  val aFloat = 2.0f
  val aDouble: Double = 3.14
  
  // Variables
  var aVariable: Int = 4
  
  aVariable = 5 // side effects
}