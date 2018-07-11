package com.rjvm.scala.oop.commands

import com.rjvm.scala.oop.files.DirEntry
import com.rjvm.scala.oop.filesystem.State
import com.rjvm.scala.oop.files.Directory

class Mkdir(name: String) extends CreateEntry(name) {
  

  override def createSpecificEntry(state: State): DirEntry =
    Directory.empty(state.wd.path, name)
  
  
}