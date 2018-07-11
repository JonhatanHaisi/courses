package lectures.part2oop.OOBasics

object MethodNotations extends App {
  
  class Person(val name: String, favoriteMovie: String, val age: Int = 0) {
    def likes(movie: String): Boolean = movie == favoriteMovie
    def hangOutWith(person: Person): String = s"${this.name} is hanging out with ${person.name}"
    def +(person: Person): String = s"Now ${this.name} and ${person.name} are new friends!"
    def unary_! : String = s"$name, What the heck?!"
    def isAlive : Boolean = true
    def apply(): String = s"Hi, my name is $name and I like $favoriteMovie"
    
    // exercises responses
    def +(nickName: String): String = s"$name ($nickName)"
    def unary_+(): Person = new Person(name, favoriteMovie, age + 1)
    def learns(learned: String): String = s"$name learns $learned"
    def learnsScala : String = learns("Scala")
    def apply(times: Int): String = s"$name watched $favoriteMovie $times times"
  }
  
  var jonhatan = new Person("Jonhatan", "Toy Story")
  
  println(jonhatan.likes("Toy Story"))
  print(jonhatan likes "Toy Story") // infix notation = operator notation (syntatic sugar)
  
  // "operators" in Scala
  val tom = new Person("Tom", "Fight Club")
  println(jonhatan hangOutWith tom)
  println(jonhatan + tom)
  
  
  // prefix notation
  val x = -1 // equivalent with 1.unary_-
  val y = 1.unary_-
  //unary_ only works with - + ~ !
  
  println(!jonhatan)
  println(jonhatan.unary_!)
  
  // postfix notation
  println(jonhatan.isAlive)
  println(jonhatan isAlive)
  
  // apply
  println(jonhatan.apply())
  println(jonhatan())
  
  /*
   1. Overload the + operator
     jonhatan + "the rockstar" => new person "Mary (the rockstar)"
     
   2. Add an age to the Person class
     Add a unary + operator => new person with the age + 1
     +jonhatan => mary with the age incrementer
     
   3. Add a "learns" method in the Person class => "Jonhatan learns Scala"
      Add a learnsScala method, calls learns method with "Scala"
      
   4. Overload the apply method
      jonhatan.apply(2) => "Jonhatan watched Toy Story 2 times"  
   */
  
  println(jonhatan + "Developer")
  println((+jonhatan).age)
  println(jonhatan learns "Scala")
  println(jonhatan learnsScala)
  println(jonhatan(6))
}