package lectures.part1basics

import scala.annotation.tailrec

object Recursion extends App {
  
  def factorial(n: Int): Int =
    if (n <= 1) 1
    else {
      println("Computing factorial of " + n + " - I first need factorial of " + (n-1))
      val result = n * factorial(n - 1)
      println("Computed factorial of " + n)
      
      result
    }

  // println(factorial(5000)) // StackOverflowException
    
  def anotherFactorial(n: Int): BigInt = {
    @tailrec
    def facHelper(x: Int, accumulator: BigInt): BigInt =
      if (x <= 1) accumulator
      else facHelper(x - 1, x * accumulator)
        
      facHelper(n, 1)
   }
  
  println(anotherFactorial(1000))
  
  /*
   1. Concatenate a string n times
   2. IsPrime function tail recursive
   3. Fibonacci function, tail recursive
   */
  
  def concatenate(n: Int, t: String): String = {
    
    @tailrec
    def _concatenate(x: Int, accumulator: String): String =
      if (x <= 1) accumulator
      else _concatenate(x -1 , t + accumulator)
      
      _concatenate(n, t)
  }
  
  println(concatenate(3, "hello"))
  
  def isPrime(n: Int): Boolean = {
    
    @tailrec
    def _isPrime(x: Int): Boolean =
      if (x <= 1) true
      else n % x != 0 && _isPrime(x - 1)
      
      _isPrime(n / 2)
  }
  
  println(isPrime(7))
  println(isPrime(6))
  
  def fibonacci(n: Int): Int = {
    @tailrec
    def _fib(pos: Int, min: Int, maj: Int): Int =
      if (pos >= n) maj
      else _fib(pos + 1, maj, maj + min)
      
     _fib(2, 1, 1)
  }
  
  println(fibonacci(8))
}


