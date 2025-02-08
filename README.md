# Symbol-Linker
SymbolLinker is a simple command allowing you to link the graphics frames of multiple symbols together, so that each symbol’s frame will update when the parent is updated. Currently, the program only works with graphics symbols. One symbol can be linked to as many others as you wish. The child linked object will follow the symbol frame of the parent layer - you don’t have to use the same symbol, it works via the frame number.

# Installation:
Unzip the SymbolLinker zip file
Drag all of the .jsfl files into C:\Users<YOUR USERNAME>\AppData\Local\Adobe\Animate 2024\en_US\Configuration\Commands (Your version and language may be different)

# Usage:
Hover over Commands and run the SymbolLinker_CREATE_LINK command
Follow the instructions in the popup (make sure you’re in the symbol/scene that you wish to create the link in.) This will not work if any of the selected layers shares a name with another layer.
To remove a link, hover over Commands and run SymbolLinker_REMOVE_LINK, and select the link you wish to remove. 
When redistributing your rigs that use SymbolLinker, be sure to include the SymbolLinker data (found in in your project’s library, as this is what stores the data of what is being linked)
