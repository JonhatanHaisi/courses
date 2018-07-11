package lectures.part2oop.OOBasics

object AnonymousClasses extends App {
  
  trait Animal { // or abstract class
     def eat: Unit
  }
  
  val funnyAnimal: Animal = new Animal {
    override def eat: Unit = println("ahahahahahaha") 
  }
  /*
   equivalent with
   
   class AnonymousClasses$$anon$1 extends Animal {
      override def eat: Unit = println("ahahahahahaha")
   }
   val funnyAnimal: Animal = new AnonymousClasses$$anon$1
   */
  
  println(funnyAnimal.getClass) 
  
  class Person(name: String) {
    def sayHi: Unit = println(s"Hi, my name is $name, how can I help?")
  }
  
  val jim = new Person("Jim") {
    override def sayHi: Unit = println(s"Hi, my name is Jim, how can I help?")
  }
}