-----------------------------
About DomoApps Design Clean Up Tool
------------------------------
Version: 1.2.0

Welcome to the DomoApps Design Clean Up Tool!

This program was designed to bulk delete old and duplicate designs on a server.

This program runs on the terminal.

Please read the following information.

---------------
Getting Started
---------------
Open terminal

Navigate to the scripts folder in the folder structure for this tool

-- example: cd Users/me/Desktop/DesignCleanUpTool/scripts

Run the domoLogin.sh bash script from your terminal

-- bash domoLogin.sh

Login to your server

Select 0 to continue to the clean up tool

Select 1 to retry your Login

Select 2 to quit

-----------------------------
Design Clean Up Tool Options
-----------------------------
This tool gives you 3 different options for deleting designs off of your server:

####Option 1:###
Shows you your list of designs on that server.
Enter the line numbers of the designs you wish to delete.
Enter 'X' once you're finished selecting.

The tool will delete only the designs you selected, even if they are attached to cards.

####Option 2:###
This will delete all the designs on the server that do *not* have cards
attached to them.

You will also be shown a list of which designs were deleted and which ones
could not be deleted because they were attached to cards.

####Option 3:###
This option will delete *every* design on your server, regardless of
whether or not they are attached to cards.

You will also be shown a list of which designs were successfully deleted and which designs were not.

####Option 4:###
Don't want to delete IDs yet? Select this option to just take a look
at the list of designs that are currently on your server.

This option will take you back to the main menu.
