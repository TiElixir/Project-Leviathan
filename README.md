# Project Leviathan
Project Leviathan is a educational project made to explore ways of obfuscation while demonstrating cookie stealing capabilities of chrome extensions.

This steals the users session tokens via cookies and localstorage data. This is activated when the user clicks on the extension icon (as its for educational purposes) and sends it to a discord webhook.
From where the attacker can copy it and use Injector from Utils to use the stolen data.

**NOTE** This project is purely for educational purposes.

## Utils
Utils contains two extra tools which can be used to inject the cookies and localstorage data which was recieved to use the cookie properly.
It also contains various attempts which were made to try to obfuscate the code
