package lectures.part4pm

import scala.util.Random

object PatternMatching extends App {
  
  // switch on steroids
  val ramdom = new Random
  val x = ramdom.nextInt()
  
  val description = x match {
    case 1 => "The ONE"
    case 2 => "double or nothing"
    case 3 => "Third time is the charm"
    case _ => "something else" // _ = WILDCARD
  }
  
  println(x)
  println(description)
  
  // 1. decompose values
  case class Person(name: String, age: Int)
  val bob = Person("Bob", 20)
  
  val greeting = bob match {
    case Person(n, a) if a < 21 => s"Hi, my name is $n and I can't drink in US"
    case Person(n, a) => s"Hi, my name is $n and I am $a years old"
    case _ => "I don't know who I am"
  }
  println(greeting)
  
  sealed class Animal
  case class Dog(breed: String) extends Animal
  case class Parrot(greeting: String) extends Animal
  
  val animal: Animal = Dog("Terra Nova")
  animal match {
    case Dog(someBreed) => println(s"Matched a dog of the $someBreed breed")
  }
  
}