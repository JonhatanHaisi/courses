package lectures.part2oop.OOBasics

object CaseClasses extends App {
  
  /*
   equals, hashCode, toString
   */
  
  case class Person(name: String, age: Int)
  
  // 1. class parameters are fields
  val jim = new Person("Jim", 34)
  println(jim.name)
  
  // 2. sensible toString
  // println(instance) = println(instance.toString) // syntactic sugar
  println(jim)
  
  // 3. equals and hashCode implemented OOTB
  val jim2 = new Person("Jim", 34)
  println(jim == jim2)
  
  // 4. CCs have handy copy method
  val jim3 = jim.copy(age = 45)
  println(jim3)
  
  // 5. CCs have companion objects
  val thePerson = Person
  val mary = Person("Mary", 23)
  
  // 6. CCs are serializable
  
  // 7. CCs have extractor patterns = CCs can be used in PATTERN MATCHING
  
  case object UnitedKingdom {
    def name: String = "The UK of GB and NI"
  }
  
  // ================================================
  // expand my list to use case objects
  
  abstract class MyList {
    
    /*
    	 head = first element
     	 tail = remainder of the list 
       isEmpty = is this list empty
       add(int) = new list with this element added
       toString = a string representation of the list 
    */
  
    def head: Int
    def tail: MyList
    def isEmpty: Boolean
    def add(element: Int): MyList
    def printElements : String
    override def toString: String = "[" + printElements + "]"
	 
  }

  case object Empty extends MyList {
    def head: Int = throw new NoSuchElementException
    def tail: MyList = throw new NoSuchElementException
    def isEmpty: Boolean = true
    def add(element: Int): MyList = new Cons(element, Empty)
    def printElements: String = ""
  }

  case class Cons(h: Int, t: MyList) extends MyList {
    def head: Int = h
    def tail: MyList = t
    def isEmpty: Boolean = false
    def add(element: Int): MyList = new Cons(element, this)
    def printElements: String =
      if (t.isEmpty) "" + h
      else h + " " + t.printElements
  }

}