package lectures.part2oop.OOBasics

object Inheritance extends App {
  
  sealed class Animal {
    val creatureType = "wild"
    //private def eat = println("nomnom")
    //protected def eat = println("nomnom")
    final def eat = println("nomnom")
  }
  
  
  class Cat extends Animal {
    def crunch = {
      eat
      println("crunch crunch")
    }
  }
  
  val cat  = new Cat
  //cat.eat
  cat.crunch
  
  // constructors
  class Person(name: String, age: Int) {
    def this(name: String) = this(name, 0)
  }
  class Adult(name: String, age: Int, idCard: String) extends Person(name)
  
  // overriding
  /*
  class Dog(override val creatureType: String) extends Animal {
    //override val creatureType = "domestic"
    override def eat = println("crunch, crunch")
  }
  val dog = new Dog("K9")
  dog.eat
  println(dog.creatureType)
  */
  
  class Dog(dogType: String) extends Animal {
    override val creatureType = dogType
  }
  val dog = new Dog("K9")
  println(dog.creatureType)

  // type substitution (broad: polymorphism)
  val unknownAnimal: Animal = new Dog("K9")
  unknownAnimal.eat
  
  // super
  /*
  class Dog(override val creatureType: String) extends Animal {
    override def eat = {
      super.eat
    	println("crunch, crunch")
    }
  }
  */
  
  // super
  
  // preventing overrides
  // 1 - use final on member
  // 2 - use final on the entire class
  // 3 - seal the class = extend classes in THIS FILE, prevent extension in other files
  
  
  
}

