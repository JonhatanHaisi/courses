package exercises

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


object Test extends App {
  
  var list: MyList = new Cons(1, new Cons(2, new Cons(3, Empty)))
  println(list.toString)
  println(list.isEmpty)
  
  list = list.add(4)
  println(list.toString)
  println(list.isEmpty)
  
  println(list.head)
  println(list.tail)
}
