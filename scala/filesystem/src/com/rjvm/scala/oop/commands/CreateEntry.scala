package com.rjvm.scala.oop.commands

import com.rjvm.scala.oop.filesystem.State
import com.rjvm.scala.oop.files.Directory
import com.rjvm.scala.oop.files.DirEntry

abstract class CreateEntry(name: String) extends Command {
  
  override def apply(state: State): State = {
    val wd = state.wd
    
    if (wd.hasEntry(name)) 
      return state.setMessage("Entry " + name + " already exists")
    
    if (name.contains(Directory.SEPARATOR)) 
      return state.setMessage(name + " must not contain separators")
    
    if (checkIllegal(name)) 
      return state.setMessage(name + ": illegal entry name")
    
    doCreateEntry(state, name)
  }
  
  def checkIllegal(name: String): Boolean = 
    name.contains(".")
  
  def  doCreateEntry(state: State, name: String): State = {
    def updateStructure(currentDirectory: Directory, path: List[String], newEntry: DirEntry): Directory = 
      if (path.isEmpty) currentDirectory.addEntry(newEntry)
      else {
        val oldEntry = currentDirectory.findEntry(path.head).asDirectory
        currentDirectory.replaceEntry(oldEntry.name, updateStructure(oldEntry, path.tail, newEntry))
      }
    
    val wd = state.wd
    
    val allDirsInPath = wd.getAllFoldersInPath
    
    val newEntry: DirEntry = createSpecificEntry(state)
    
    val newRoot = updateStructure(state.root, allDirsInPath, newEntry)
    
    val newWd = newRoot.findDescendant(allDirsInPath)
    
    State(newRoot, newWd)
  }
  
  def createSpecificEntry(state: State): DirEntry
  
}