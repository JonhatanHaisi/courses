package lectures.part2oop.OOBasics

object AbstractDataTypes extends App {
  
  // abstract
  abstract class Animal {
    val creatureType: String;
    def eat: Unit
  }
  
  // val animal = new Animal // error
  
  class Dog extends Animal {
    override val creatureType: String = "Canine"
    def eat: Unit = println("Cruch cruch")
  }
  
  // traits
  trait Carnivore {
    def eat(animal: Animal): Unit
    val preferredMeal: String = "fresh meat"
  }
  
  trait ColdBlooded
  
  class Crocodile extends Animal with Carnivore with ColdBlooded {
    val creatureType: String = "croc"
    def eat: Unit = println("nomnomnom")
    def eat(animal: Animal): Unit = println(s"I'm a croc and I'm eating ${animal.creatureType}")
  }
  
  val dog = new Dog
  val croc = new Crocodile
  croc.eat(dog)
  
  // traits vs abstract classes
  // 1 - trais do not have constructor parameters
  // 2 - multiple traits may be inherited by the same class
  // 3 - behavior, abstract class = "thing"
}

