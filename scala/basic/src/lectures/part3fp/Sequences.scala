package lectures.part3fp

import scala.util.Random

object Sequences extends App {
 
  // Seq
  val aSequence = Seq(1, 3, 2, 4)
  
  println(aSequence)
  println(aSequence.reverse)
  println(aSequence(2))
  println(aSequence ++ Seq(7, 5, 6))
  println(aSequence.sorted)
  
  // range
  val aRange: Seq[Int] = 1 to 10 // 1 until 10
  aRange.foreach(println)
  
  (1 to 10).foreach(_ => print("hello"))
  
  // lists
  val aList = List(1, 2, 3)
  val prepended = 42 :: aList
  println(prepended)
  
  val apples5 = List.fill(5)("apple")
  println(apples5)
  println(aList.mkString("-|-"))
  
  // arrays
  val numbers = Array(1, 2, 3)
  val threeElements = Array.ofDim[Int](3)
  threeElements.foreach(println)
  
  // mutation
  numbers(2) = 0 // syntax for numbers.update(2, 0)
  println(numbers.mkString(" "))
  
  // arrays and seq
  val numbersSeq: Seq[Int] = numbers // implicit convertions
  println(numbersSeq)
  
  // vectors
  val vector: Vector[Int] = Vector(1, 2, 3)
  println(vector)
  
  // vectors vs lists
  val maxRuns = 1000
  val maxCapacity = 100000
  
  def getWriteTime(collection: Seq[Int]): Double = {
    val r = new Random
    val times = for {
      it <- 1 to maxRuns
    } yield {
      val currentTime = System.nanoTime()
      collection.updated(r.nextInt(maxCapacity), 0)
      System.nanoTime() - currentTime
    }
    times.sum * 1.0 /maxRuns
  }
  
  val numbersList = (1 to maxCapacity).toList
  val numbersVector = (1 to maxCapacity).toVector
  
  print(getWriteTime(numbersList))
  print(getWriteTime(numbersVector))
  
}
