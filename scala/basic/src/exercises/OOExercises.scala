package exercises

object OOExercises extends App {
  
  /*
   1. Generic trait MyPredicate[-T] with a little method test(t) => Boolean
   2. Generic trait MyTransformer[-A, B] with a method transform(A) => B
   3. MyList:
      - map(transformer) => MyList
      - filter(predicate) -> MyList
      - flatMap(transformer from A to MyList[B]) => MyList[B] 
   
      [1,2,3].map(n * 2) = [2,4,6]
      [1,2,3,4].filter(n % 2) = [2,4]
      [1,2,3].flatMap(n => [n, n+1]) => [1,2,2,3,3,4]
   */
  
  
}

trait MyPredicate[-T] {
	def test(x: T): Boolean
}

trait MyTransformer[-A, B] {
	def transform(x: A): B
}

abstract class MyList2[+T] {
  
  def head: T
  def tail: MyList2[T]
  def isEmpty: Boolean
  def add[B >: T](element: B): MyList2[B]
  def printElements : String
  override def toString: String = "[" + printElements + "]"
	
  def filter(p: MyPredicate[T]): MyList2[T]
  def map[R](t: MyTransformer[T, R]): MyList2[R]
  def flatMap[R](t: MyTransformer[T, MyList2[R]]): MyList2[R]
  
  // concatenation
  def ++[B >: T](list: MyList2[B]): MyList2[B]
}

object Empty2 extends MyList2[Nothing] {
  def head: Nothing = throw new NoSuchElementException
  def tail: MyList2[Nothing] = throw new NoSuchElementException
  def isEmpty: Boolean = true
  def add[B >: Nothing](element: B): MyList2[B] = new Cons2(element, Empty2)
  def printElements: String = ""
  
  def filter(p: MyPredicate[Nothing]): MyList2[Nothing] = Empty2
  def map[R](t: MyTransformer[Nothing, R]): MyList2[R] = Empty2
  def flatMap[R](t: MyTransformer[Nothing, MyList2[R]]): MyList2[R] = Empty2
  
  def ++[B >: Nothing](list: MyList2[B]): MyList2[B] = list
}

class Cons2[+T](h: T, t: MyList2[T]) extends MyList2[T] {
  def head: T = h
  def tail: MyList2[T] = t
  def isEmpty: Boolean = false
  def add[B >: T](element: B): MyList2[B] = new Cons2(element, this)
  def printElements: String =
    if (t.isEmpty) "" + h
    else h + " " + t.printElements
    
  def filter(p: MyPredicate[T]): MyList2[T] = 
      if (p.test(head)) new Cons2(h, t.filter(p))
      else t.filter(p)
  
  def map[R](tr: MyTransformer[T, R]): MyList2[R] = 
      new Cons2[R](tr.transform(h), t.map(tr))
  
  def flatMap[R](tr: MyTransformer[T, MyList2[R]]): MyList2[R] = 
      tr.transform(h) ++ t.flatMap(tr)
  
  def ++[B >: T](list: MyList2[B]): MyList2[B] =
      new Cons2(h, t ++ list)
  
}
