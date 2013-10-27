/*
* Copyright (c) 2013, Marek Kunz (Manas Coding)
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*    * Redistributions of source code must retain the above copyright
*      notice, this list of conditions and the following disclaimer.
*    * Redistributions in binary form must reproduce the above copyright
*      notice, this list of conditions and the following disclaimer in the
*      documentation and/or other materials provided with the distribution.
*    * Neither the name of the Manas Coding nor the
*      names of its contributors may be used to endorse or promote products
*      derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL Marek Kunz BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE
*
*/

enyo.kind({
	name: "HelpView",
	kind: "enyo.ModalDialog",
	lazy: false,
	width:"600px", 
        height:"700px",
        
        create: function() {
            this.inherited(arguments);           
            
        },
	components: [
                {kind: "enyo.Control", style: "heigth: 620px; width: 600px;",layoutKind: "VFlexLayout", components:[
                
                {kind: enyo.Scroller,name: "Scroller", style: "height: 500px; width: 560px; text-align: center; margin-top: 50px;",components: [
			
                        {content: "Help:", name: "secondline", style: "font-size: 130%; font-weight: bold;"},
                        {content: "Project Clouds for SkyDrive", name: "firstline", style: "font-size: 130%; font-weight: bold;"},
                        
                        {kind: "enyo.RichText", style: "-webkit-text-fill-color: black;color: blue; background-color: white;",disabled: true,value: "<b>Settings</b><br><img src = \"images/settingsIcon.png\" ><br> In the settings menu you can set the default download location. To save your settings just hit save and the settings will be saved. Deleting the Re-Login token will delete the stored token that allows instant login. You will still be logged in until either you press the re-login button, close the app, or the current token expires.  Press the key to re-login. <br><br><br>" 
                                + "<b>Move Back</b><br><img src = \"images/backIcon.png\" ><br> Move back in your SkyDrive storage.<br><br><br>" +
                                 "<b>Move Forward/ Download a File</b><br><img src = \"images/forwardIcon.png\" ><br> To move forward, select a folder and press forward or double tab to open the folder. Pressing forward on a file will start download of the file.<br><br><br>" +
                                 "<b>Home</b><br><img src = \"images/homeIcon.png\" ><br> Go to the home folder in the SkyDrive.<br><br><br>" +
                                 "<b>Refresh</b><br><img src = \"images/refreshIcon.png\" ><br> Refresh the current view.<br><br><br>" +
                                 "<b>Information</b><br><img src = \"images/infoIcon.png\" ><br> In the Information you can view folder/file information and rename or add/change decription of the file or folder. <br><br><br>" +
                                 "<b>New Folder</b><br><img src = \"images/newFolderIcon.png\" ><br> To create a new folder write the folder name. Note: Some folder names may not be allowed on SkyDrive.<br><br><br>" +
                                 "<b>Delete Folder/File</b><br><img src = \"images/deleteIcon.png\" ><br> Press this to delete a file/folder. Note: This action is not reversable. <br><br><br>" +
                                  "<b>Download Selected</b><br><img src = \"images/downloadIcon.png\" ><br> Downloads the selected file. You can change the file name. The default download location is used and can be changed in the Settings.<br><br><br>" +
                                 "<b>Upload File</b><br><img src = \"images/uploadIcon.png\" ><br> Select the file to upload to your SkyDrive folder. Note: Some files may take a while to upload. Some uploads might fail so try them again. Supported formats are: <br>.3g2<br>.3gp<br>.ai<br>.bmp<br>.chm<br>.doc<br>.docm<br>.docx<br>.dot<br>.dotx<br>.epub<br>.gif<br>.jpeg<br>.jpg<br>.mp4<br>.one<br>.pdf<br>.png<br>.pot<br>.potm<br>.potx<br>.pps<br>.ppsm<br>.ppsx<br>.ppt<br>.pptm<br>.pptx<br>.psd<br>.tif<br>.tiff<br>.txt<br>.xls<br>.xlsb<br>.xlsm<br>.xlsx<br>.wav<br>.webp<br>.wmv<br>Other formats will never finish uploading as they are not supported by SkyDrive at the moment. There is nothing Manas Coding can do about this.<br><br><br>" +
                                 "<b>Re-Login</b><br><img src = \"images/loginIcon.png\" ><br> After some time you will be disconnected from SkyDrive. Press this to re-login. <br><br><br>" +
                                 "<b>Image Viewer</b><br><img src = \"images/copyIcon.png\" ><br> By clicking this button you can view the images/photos in the current directory. The images will be downloaded to a new folder \"downloads/skydrive/\" and then immediately deleted. <br><br><br>" +
                                
                                 "Still have unanswered questions? Email Manas Coding at: <br> manas.coding@gmail.com <br><br><br>&copy; 2012 Marek Kunz <br>"  }
                        
		]},
                ]},
                
                {kind: "enyo.Control",style: "margin-top: 10px;", layoutKind: "HFlexLayout",  components:[
                        {kind: "Button", name: "cncldBtn",caption: "Close", onclick: "closePopup", style: "background-color: blue; color: white; width: 92%;"}
                        
                ]}
                
                
                
                
                
                
     ],
     
     closePopup: function(){
         this.close();
     }

})