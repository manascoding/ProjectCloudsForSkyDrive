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
    kind: "ModalDialog",
    lazy: false,
    name: "UploadView",
    layoutKind:"VFlexLayout", 
    onOpen: "directoryChanged",
    width:"500px", 
    height:"550px",
    directory: "/media/internal",
    files: [],
    fileToSave: null,
    published: {
        callback: null,
        silentData: null,
        silentWeb: null
        
    },
    events: {
        onRefresh: ""
    },
    components: [
    
    {
        kind: "FileTreePlugin", 
        name: "plugin"
    }, 
    
       

    {
        
        kind: "enyo.Control", 
        style: "heigth: 400px; width: 500px;",
        layoutKind: "VFlexLayout", 
        components:[

        {
            kind: "enyo.Input",
            onkeydown: "handlekeydown",
            onfocus: "handleFocus",
            name: "fileInput", 
            style: "margin-top: 10px;",
            hint: "Tap here to type",
            autocorrect: false, 
            spellcheck: false, 
            autoWordComplete: false, 
            autoCapitalize: "lowercase"
        },

        {
            kind: enyo.Scroller,
            name: "Scroller", 
            style: "height: 370px; width: 460px;",
            components: [

            {
                content: "", 
                name: "directoryContent"
            },

            {
                name: "list", 
                kind: "enyo.VirtualRepeater", 
                onSetupRow: "listGetItem", 
                onclick: "changeDirectory",
                components: [{
                    name: "item", 
                    kind: "IconButton", 
                    allowHtml: true, 
                    allowDrag: true,
                    caption: "", 
                    icon: "images/fileIconSmall.png"
                }]
            }
            ]
        },
        ]
    },
                

    {
        kind: "enyo.Control",
        style: "margin-top: 10px;", 
        layoutKind: "HFlexLayout",  
        components:[

        {
            kind: "Button", 
            name: "cncldBtn",
            caption: "Cancel", 
            onclick: "closePopup", 
            style: "background-color: red; color: white; width: 27%;"
        },
        
        {
            kind: "Button", 
            name: "bckdirBtn",
            caption: "Back DIR", 
            onclick: "gotoParent", 
            style: "background-color: blue; color: white;width: 27%; "
        },
        

        {
            kind: "Button", 
            name: "opnflBtn",
            caption: "Upload", 
            onclick: "uploadFile", 
            style: "background-color: green; color: white;width: 27%; "
        },
        ]
    }     
                
                
                
    ],
    
    
    //@ Override
    afterOpen: function() {
        if (this.openClassName) {
            this.addClass(this.openClassName);
        }
        this.inherited(arguments);
        this.handleOpen();
    },
     
    handleOpen: function(){
        this.$.plugin.getFiles(this.directory, "*", enyo.bind(this, this.updateFileList));
                
    },
    
    closePopup: function(){
        this.close();
            
    },
    
    updateFileList: function(files) {
        enyo.log(files || "null");
        this.files = files;
        this.$.list.render();
        this.$.directoryContent.setContent("Current DIR: " + this.directory);
        this.$.fileInput.setValue("");
       
        this.$.Scroller.setScrollTop(0);
    },
    
    listGetItem: function(inSender, inIndex) {
        //enyo.log("here");
        if (inIndex < this.files.length) {
            if (this.$.item) {
                // important to escape this, as filenames are user-generated content
                //enyo.log(this.files[inIndex]);
                var fileType =enyo.string.trim(this.files[inIndex].name.substring(this.files[inIndex].name.lastIndexOf('.') +1, this.files[inIndex].name.length));
                enyo.log(fileType);
                this.$.item.setCaption(this.files[inIndex].name);
                if (fileType == "html"){
                    this.$.item.setIcon("images/htmlIconSmall.png");
                }
                if (fileType == "mp3"){
                    this.$.item.setIcon("images/mp3IconSmall.png");
                }
                
                if (fileType == "txt"){
                    this.$.item.setIcon("images/txtIconSmall.png");
                }
                
                if (fileType == "doc" ||fileType == "docx" ){
                    this.$.item.setIcon("images/docIconSmall.png");
                }
                
                if (fileType == "pdf"){
                    this.$.item.setIcon("images/pdfIconSmall.png");
                }
                
                
                if (this.files[inIndex].type === "directory") {
                    this.$.item.setStyle("font-weight: bold");
                    this.$.item.setIcon("images/folderIconSmall.png");
                }
                
                
            }
            return true;
        }
        return false;
    },
    
    changeDirectory: function(inSender, inEvent) {
        if(inEvent.rowIndex != null){
            if (this.files[inEvent.rowIndex].type === "directory") {
                if (this.directory !== "/media/internal/" && this.directory !== "/" ) {
                    this.directory += "/";
                }
                this.directory += this.files[inEvent.rowIndex].name;
                this.handleOpen();
            }
            else{
                
                if (this.directory !== "/media/internal/" && this.directory !== "/" ) {
                        
                    this.$.fileInput.setValue(this.directory +"/" +this.files[inEvent.rowIndex].name);
                    if(this.fileToSave != null && this.fileToSave == this.directory  +"/"+this.files[inEvent.rowIndex].name){
                        this.uploadFile();
                    }
                    this.clickOne(this.directory +"/" +this.files[inEvent.rowIndex].name);
                }
                else{
                    this.$.fileInput.setValue(this.directory +this.files[inEvent.rowIndex].name);
                    if(this.fileToSave != null && this.fileToSave == this.directory +this.files[inEvent.rowIndex].name){
                        this.uploadFile();
                    }
                        
                    this.clickOne(this.directory +this.files[inEvent.rowIndex].name);
                }             
                    
            }           
            
        }
        
    },
    
    clickOne: function(inFile){
        this.fileToSave = inFile;
        setTimeout(enyo.bind(this,this.unSave), 500);
    },
    unSave: function(){
        this.fileToSave = null;
    },
    
    
    uploadFile: function(){
        var vrr = enyo.string.trim(this.$.fileInput.getValue()||"");
        if(vrr != ""){
            var name = Validator.getName(vrr);
            enyo.log(name);
            var url = "https://apis.live.net/v5.0/" + MainMenu.doubleStack[MainMenu.stack.length -1] + "/files/"+ name +"?access_token=" + Com.token;
            enyo.windows.addBannerMessage("File Uploading "  , "{}");
            this.silentWeb = MainMenu.stack[MainMenu.stack.length -1] + "?access_token=" + Com.token;
            enyo.log(this.silentData);
            enyo.asyncMethod(this, function(){this.silentRefresh(this.silentWeb, this.silentData)});
            this.close();
            this.$.plugin.uploadFile(url, vrr, enyo.bind(this, this.callback));
            
        }
        
    },
    
    gotoParent: function() {
        
        if (this.directory !== "/") {
            this.directory = this.directory.replace(/\/[^\/]*$/, "");
            if (this.directory === "") {
                this.directory = "/";
            }
            if(this.directory.charAt(this.directory.length -1) != '/'){
                this.direcotry += "/"; 
            }
            this.handleOpen();
        }
    },
    
    uploadHandler: function(inText){
       enyo.windows.addBannerMessage("File Uploaded: " +inText , "{}");
       this.doRefresh();
       
       
   },
   
   
   silentRefresh: function(inWeb, inData){
       Com.refreshSilent(enyo.bind(this, this.silentHandler), inWeb, inData);
   },
   
   
   silentHandler: function(inNew, inWeb, inData){
       if(inNew != null){
           var dataJson = enyo.json.parse(inNew);
           var data = dataJson.data;
           if(data != null){
               if(data.length != inData){
                   enyo.log("Downloaded");
                   enyo.windows.addBannerMessage("File Uploaded ", "{}");
                   this.callback();
               }
               else{
                   enyo.log("Still need to refresh");
                   this.silentRefresh(inWeb, inData);
               }
           }
           
       }
   }
    
    
    
})