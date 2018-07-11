package lectures.part2oop.OOBasics

object Generics extends App {
  
  class MyList[A] {
    // use the type A
  }
  
  /*
  class MyList[+A] {
    // use the type A
    def add(element: A): MyList[A] = ???  // error
    def add[B >: A](element: B): MyList[B] = ??? // works
  } 
  */
  
  class MyMap[Key, Value]
  
  trait MyTrait[Type]
  
  val listOfIntegers = new MyList[Int]
  val listOfStrings = new MyList[String]
  
  // generic methods
  object MyList {
    def empty[A]: MyList[A] = ???
  }
  val emptyListOfIntegers = MyList.empty[Int]
  
  // variance problem
  class Animal
  class Cat extends Animal
  class Dog extends Animal
  
  // 1. yes, List[Cat] extends List[Animal] = COVARIANCE
  class CovariantList[+A]
  val animal: Animal = new Cat
  val animalList: CovariantList[Animal] = new CovariantList[Cat]
  // animalList.add(new Dog) ??? HARD Question - we return a lit of animal
  
  // 2. NO = INVARIANCE
  class  InvariantList[A]
  // val invariantAnimalList: InvariantList[Animal] = new InvariantList[Cat] - error
  val invariantAnimalList: InvariantList[Animal] = new InvariantList[Animal]
  
  // 3. Hell, no! CONTRAVARIANCE
  class ContravariantList[-A]
  val contravariantList: ContravariantList[Cat] = new ContravariantList[Animal]
  
  
  // bounded types
  class Cage[A <: Animal](animal: A)
  val cage = new Cage(new Dog)
  
  /*
  class Cage[A >: Dog](animal: A)
  val cage = new Cage(new Animal) 
  
  =====================================
  class Car
  val newCage = new Cage(new Car) - error
   */
  
  // expand MyList to be generic
  
  
}

abstract class MyList[+T] {
    
  /*
     head = first element
     tail = remainder of the list 
     isEmpty = is this list empty
     add(int) = new list with this element added
     toString = a string representation of the list 
   */
  
  def head: T
  def tail: MyList[T]
  def isEmpty: Boolean
  def add[B >: T](element: B): MyList[B]
  def printElements : String
  override def toString: String = "[" + printElements + "]"
	
}

object Empty extends MyList[Nothing] {
  def head: Nothing = throw new NoSuchElementException
  def tail: MyList[Nothing] = throw new NoSuchElementException
  def isEmpty: Boolean = true
  def add[B >: Nothing](element: B): MyList[B] = new Cons(element, Empty)
  def printElements: String = ""
}

class Cons[+T](h: T, t: MyList[T]) extends MyList[T] {
  def head: T = h
  def tail: MyList[T] = t
  def isEmpty: Boolean = false
  def add[B >: T](element: B): MyList[B] = new Cons(element, this)
  def printElements: String =
    if (t.isEmpty) "" + h
    else h + " " + t.printElements
}


