Microsoft has a program called Steps Recorder that helps you record the exact steps you take when a problem occurs. 
It generates a .mht file which will contain step details along with a screenshot which is encoded in base64.

The application in this repository lets you upload one of such .mht file generated by Steps Recorder, extracts all the base64 encoding of the images and uploads them into a folder called 'uploads' which is present in the 'backend' folder.

The 'frontend' folder has a UI, written using Angular, for uploading the file and the 'backend' has node.js code to upload all the .jpeg converted images to the 'uploads' folder which resides inside it.  
