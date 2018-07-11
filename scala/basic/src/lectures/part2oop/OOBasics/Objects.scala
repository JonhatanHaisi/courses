package lectures.part2oop.OOBasics

object Objects extends App {
  
  // SCALA DOES NOT HAVE CLASS-LEVEL FUNCTIONALITY ("static")
  
  object Person { // type + its only instance
    // "static"/"class" - level functionality
    val N_EYES = 2;
    def canFly: Boolean = false
    
    // factory methods
    //def from(mother: Person, father: Person): Person = new Person("Bob")
    def apply(mother: Person, father: Person): Person = new Person("Bob")
  }
  
  class Person(val name: String) {
    // instance-level functionality
  }
  // object Person and class Person are COMPANIONS
  
  
  println(Person.N_EYES)
  println(Person.canFly)
  
  // Scala object = Singleton Instance
  val jonhatan = Person
  val aline = Person
  println(jonhatan == aline) // true
  
  val mary = new Person("Mary")
  val jhon = new Person("Jhon")
  println(mary == jhon) // false
  // println(mary == Person) // false
  // println(jhon == Person) // false
  
  // val bobbie = Person.from(mary, jhon)
  val bobbie = Person(mary, jhon)
  
  // Scala Applications = Scala object with
  // def main(args: Array[String]): Unit
}