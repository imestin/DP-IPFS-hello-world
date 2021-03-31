# DP-IPFS-hello-world
Hello World application for the DP-IPFS Library research

Clicking "Upload Image" will run the equivalent of `ipfs add picture.jpg` in a temporary node that is created in the NodeJS application.
The IPFS network is not obligated to store the file, so the picture might not be accessible after upload.

If we add the same file to our local IPFS repository the application will be able to load the picture, but it might take some 10-15 minutes for _ipfs-desktop_ or other IPFS client to be fully functional.

The data contract creation is written in the README of the server folder.

There is a [known bug](https://github.com/dashevo/dapi-grpc/issues/103) about, limit parameter is used in _utils/getDocument.js_. I rewrote `limit: 2` to `limit: 1` (the docs says limit: 2), it does not seem to cause problems.