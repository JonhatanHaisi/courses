package com.rjvm.scala.oop.filesystem

import java.util.Scanner
import com.rjvm.scala.oop.files.Directory
import com.rjvm.scala.oop.commands.Command

object Filesystem extends App {
  
  val root = Directory.ROOT
  
  io.Source.stdin.getLines.foldLeft(State(root, root))((currentState, newLine) => {
    currentState.show
    Command.from(newLine).apply(currentState)
  })
  
//	def go: Unit = {
//			state.show
//			val input = scanner.nextLine
//			state = Command.from(input).apply(state)
//			go    
//  }
//	
//  val root = Directory.ROOT
//  var state = State(root, root)
//  val scanner = new Scanner(System.in)
//  
//  go
}