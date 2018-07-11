package com.rjvm.scala.oop.commands

import com.rjvm.scala.oop.filesystem.State

class UnknownCommand extends Command {
  
  override def apply(state: State): State = 
    state.setMessage("Command is not found")
  
}