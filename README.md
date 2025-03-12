# Overview
FoCus is a desktop app able to help you stay focused while doing on screen activities. It uses your laptop camera to track your facial movements and therefore detect how productive you are.

# How to run:

1) clone this repo

2) open the command line, and type: **cd FoCus**

3) **For developement purposes only**, you need to deploy a mock server with mock data; for this type open a new command line tab and type: **json-server --watch db.json --port 3000** (you need to be on the path FoCus/src)

3) Now that your mock server is up and running, type: **npm run build** 

4) A small tweak to fix, go to this path: FoCus\dist\index.html and update 

the following lines (you just need to add a "." before assets in both src and href, it should look something like): 

    <script type="module" crossorigin src="./assets/index-Bf79nDdV.js"></script>
    <link rel="stylesheet" crossorigin href="./assets/index-DTBcgHq-.css">

5) run **npm start**

6) The desktop app should have started. Enjoy!
