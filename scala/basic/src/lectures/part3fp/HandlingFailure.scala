package lectures.part3fp

import scala.util.Success
import scala.util.Failure
import scala.util.Try

object HandlingFailure extends App {
  
  // create success and Failure
  val aSuccess = Success(3)
  val aFailure = Failure(new RuntimeException("Super Failure"))
  
  println(aSuccess)
  println(aFailure)
  
  def unsafeMethod(): String = throw new RuntimeException("NO STRING FOR YOU BUSTER")

  val potentialFailure = Try(unsafeMethod())
  println(potentialFailure)
  
  // syntax sugar
  val anotherPotentialFailure = Try {
    // code that might throw
  }
  
  // utilities
  println(potentialFailure.isSuccess)
  
  // orElse
  def backupMethod(): String = "A valid result!"
  val fallbackTry = Try(unsafeMethod()).orElse(Try(backupMethod()))
  
  // IF you design the API
  def betterUnsafeMethod(): Try[String] = Failure(new RuntimeException)
  def betterBackupMethod(): Try[String] = Success("A valid result")
  val betterFallback = betterUnsafeMethod() orElse betterBackupMethod()
  
  // map, flatMap, filter
  println(aSuccess.map(_ * 2))
  println(aSuccess.flatMap(x => Success(x * 10)))
  println(aSuccess.filter(_ > 10))
}