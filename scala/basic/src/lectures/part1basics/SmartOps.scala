package lectures.part1basics

object SmartOps extends App {
  
  val str: String = "Hello, I am learning scala"
  
  println(str.charAt(2))
  println(str.substring(7, 11))
  println(str.split(" ").toList)
  println(str.startsWith("Hello"))
  println(str.replace(" ", "-"))
  println(str.toUpperCase())
  println(str.toLowerCase())
  println(str.length)
  
  val aNumberString = "2"
  val aNumber = aNumberString.toInt
  println('a' +: aNumberString :+ 'z')
  println(str.reverse)
  println(str.take(2))
  
  val name = "Jonhatan"
  val age = 28
  
  // s interpolator
  val greeting = s"Hello, my name is $name and I am $age years old"
  val anotherGreeting = s"Hello, my name is $name and I will be turning ${age+1} years old"
  println(anotherGreeting)
  
  // f interpolator
  val speed = 1.2f
  val myth = f"$name can eat $speed%2.2f burgers per minute"
  
  // raw interpolator
  println(raw"This is a \n newline")
  val escaped = "This is a \n newline"
  println(raw"$escaped")
}


