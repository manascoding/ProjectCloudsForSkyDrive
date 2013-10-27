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
    name: "MainMenu",
    kind: "enyo.VFlexBox",
    style: "width: 100%; height: 100%; padding 10px; text-align: center;",
        
    className: "BackGround",
    files: [],
    
    selectedValue: null,
    copyBool : false,
    moveBool: false,
    
    published:{
        imgs: [],
        imgIndex: 0
        
    },       
        
        
    create: function() {
        this.inherited(arguments);           
            
    },      
        
    events: {
        onEnter: "",
        onImages: ""
    },    
    components: [
        
    
    {
        name : "fileDownload",
        kind : "PalmService",
        service : "palm://com.palm.downloadmanager/",
        method : "download",
        onSuccess : "downloadFinished",
        onFailure : "downloadFail",
        onResponse : "gotResponse",
        subscribe : true
    },
    
    
              
           
    {
        kind: "SlidingPane", 
        flex: 1,  
        components: [

        //Left Side

        {
            name: "left", 
            width: "100%",  
            components: [                        
                        

            {
                kind: enyo.Toolbar, 
                pack: "left", 
                components: [

                
                
                {
                    icon: "images/settingsIcon.png", 
                    onclick: "settings", 
                    align: "left"
                },
                {
                    icon: "images/homeIcon.png", 
                    onclick: "goHome", 
                    align: "left"
                },
                
                {
                    icon: "images/backIcon.png", 
                    onclick: "back", 
                    align: "left"
                },
                
                {
                    icon: "images/forwardIcon.png", 
                    onclick: "forward", 
                    align: "left"
                },
                
                {
                    icon: "images/refreshIcon.png", 
                    onclick: "refresh", 
                    align: "left"
                },
                
                {
                    icon: "images/infoIcon.png", 
                    onclick: "showInfo", 
                    align: "left"
                },                
                
                {
                    icon: "images/deleteIcon.png", 
                    onclick: "deleteFile", 
                    align: "left"
                },
                             
                {
                    icon: "images/newFolderIcon.png", 
                    onclick: "newFolder", 
                    align: "left"
                },  
                
                {
                    icon: "images/downloadIcon.png", 
                    onclick: "downloadSelected", 
                    align: "left"
                },
                
                {
                    icon: "images/uploadIcon.png", 
                    onclick: "uploadSelected", 
                    align: "left"
                },
                
                {
                    icon: "images/loginIcon.png", 
                    onclick: "reEnter", 
                    align: "left"
                },
                
                {
                    icon: "images/copyIcon.png", 
                    onclick: "viewImage", 
                    align: "left"
                },
                
                /*{
                    icon: "images/moveIcon.png", 
                    onclick: "move", 
                    align: "left"
                },
                
                {
                    icon: "images/pasteIcon.png", 
                    onclick: "paste", 
                    align: "left"
                },*/
                                                     
                ]
            },
                     
                        
                        

            {
                kind: "SlidingPane", 
                name: "FolderView", 
                flex: 1,  
                width: "100%",
                components: [
                                    

                {
                    name: "MainOne", 
                    width: "100%", 
                    showing: true,
                    dismissible: false, 
                    peekWidth: 0  ,
                    components: [

                    {
                        kind: "Items",
                        name: "Scroller", 
                        onHandleOpen: "handleOpen"
                    },
                                   
                    ]
                },   
                ]
            }           
                        
                        
                        
            ]
        },
            

        //Right Side

        {
            name: "right", 
            width: "95%", 
            showing: false,
            dismissible: true, 
            peekWidth: 0,
            components: [

            {
                kind: "Browser", 
                name: "browser", 
                flex: 1
            }
            ]
        },
                
        ]
    }    
    ,
            
    //others including scrim and popups.
        
    {
        kind: "Scrim", 
        layoutKind: "VFlexLayout", 
        align: "center", 
        pack: "center", 
        components: [

        {
            kind: "SpinnerLarge"
        }
        ]
    },
        
        
    {
        kind: "InfoView",
        name: "InfoView",
        onRename: "handleRename"
    },
        
    {
        kind: "NewFolderView",
        name: "NewFolderView",
        onSubmit: "handleNewFolderSubmit"
    },
    
    
    {
        kind: "RenameView",
        name: "RenameView",
        onSubmit: "handleNewFolderReturn"
    },
        
    {
        kind: "DeleteView",
        name: "DeleteView",
        onSubmit: "handleNewFolderReturn"
    },
    
    {
        kind: "SettingsView",
        name: "SettingsView"
        
    },
    
    
    {
        kind: "OpenView",
        name: "OpenView"
        
    },
    
    {
        kind: "DownloadView",
        name: "DownloadView"
        
    },
    
        
    {
        kind: "UploadView",
        name: "UploadView",
        onRefresh: "uploadHandler"
      
        
    }
    
                   
    ],
        
        
    ready: function(){
        enyo.log("Ready to Load Main");
            
    },        
        
        
    loadMain: function(inData){
        this.$.Scroller.loadData(inData);
            
    },       
        
        
    handleOpen: function(inSender){             
            
        var inData = inSender.getToHandle();        
        enyo.log(inData);
        this.open(inData);
                    
    },
    
    
    open: function(inData){
        if(window.PalmSystem){
            
            if(inData.type == "folder" || inData.type == "album"){
                this.scrimShow(true);
                this.$.Scroller.setSelectedRow(null);
                this.$.Scroller.setClick(null);
                Com.getFolderData(enyo.json.stringify(inData), enyo.bind(this, this.loadData));
            }
            
            else{
                this.downloadSelected();
            }
        }
        else{
                
        }
    },
    
    loadData: function(inData){
        this.scrimShow(false);
        var data = enyo.json.parse(inData).data;
        if(data != null){
            this.$.Scroller.scrollTo(0,0);
            this.$.Scroller.loadData(data);
            
        }
        else{
            this.doEnter();
        }
    },
           
           
        
        
    statics: {
        stack: [],
        doubleStack: []
    },
        
        
        
    scrimShow: function(inValue){
        this.$.scrim.setShowing(inValue);
        this.$.spinnerLarge.setShowing(inValue);
    },
    
    
    back: function(){
        
        this.$.Scroller.setSelectedRow(null);
        this.$.Scroller.setClick(null);
        if(MainMenu.stack.length > 1){
            this.scrimShow(true);
            Com.back(enyo.bind(this, this.loadData));
        }
        else{
            this.refresh();
        }
        
        
        
    },
    
    
    forward: function(){
        var vrr = this.$.Scroller.getClick();
        if(vrr != null){
            this.open(vrr);
        }
    },
    
    refresh: function(){
        this.scrimShow(true);
        this.$.Scroller.setSelectedRow(null);
        Com.refresh(enyo.bind(this, this.loadData));
    },
    
    
    newFolder: function(){
        this.$.NewFolderView.openAtCenter();
        
    },
    
    handleNewFolderSubmit: function(){
        this.$.NewFolderView.close();
        Com.createFolder(enyo.bind(this, this.handleNewFolderReturn), this.$.NewFolderView.getName(), this.$.NewFolderView.getDescription());
        this.scrimShow(true);
        
    },    
    
    handleNewFolderReturn: function(inText){
        this.refresh();
    },
    
    
    showInfo: function(){
        var vrr = this.$.Scroller.getClick();
        if(vrr != null){
            this.$.InfoView.openAtCenter();
            this.$.InfoView.display(vrr);
        }
        else{
            enyo.windows.addBannerMessage("No File or Folder Selected" , "{}");
        }
    },
    
    
    /*copy: function(){
        var vrr = this.$.Scroller.getClick();
        if(vrr != null){
            this.selectedValue = vrr;
            this.copyBool = true;
            this.moveBool = false;
            enyo.windows.addBannerMessage("Selected For Copy" , "{}");
        }
        else{
            enyo.windows.addBannerMessage("No File or Folder Selected" , "{}");
        }
        
        
    },
    
    move: function(){
        var vrr = this.$.Scroller.getClick();
        if(vrr != null){
            this.selectedValue = vrr;
            this.copyBool = false;
            this.moveBool = true;
            enyo.windows.addBannerMessage("Selected For Move" , "{}");
        }
        else{
            enyo.windows.addBannerMessage("No File or Folder Selected" , "{}");
        }
        
        
    },
    
    paste: function(){
        if(this.selectedValue != null){
            this.scrimShow(true);
            var type = "";
            
            if(this.copyBool == true){
                type = "COPY";
            }
            else{
                type = "MOVE";
            }
            Com.paste(enyo.bind(this, this.refresh), type,"https://apis.live.net/v5.0/" + this.selectedValue.id);
      
        }
        else{
            enyo.windows.addBannerMessage("Neither Copy or Move Selected" , "{}");
        }
        
    },*/
    
    
    
    
    handleRename: function(){
        var oldData = this.$.InfoView.getOldName();
        this.$.RenameView.setData(oldData);
        this.$.RenameView.openAtCenter();
    },
    
    
    reEnter: function(){
        this.doEnter();
    },
    
    
    deleteFile: function(){
        var vrr = this.$.Scroller.getClick();
        
        if(vrr != null){
            this.$.DeleteView.openAtCenter();
            this.$.DeleteView.setData(vrr);
        }
        else{
            enyo.windows.addBannerMessage("No File or Folder Selected" , "{}");
        }
        
    },
    
    
    downloadFinished : function(inSender, inResponse) {
        enyo.log("Download success, results=" + enyo.json.stringify(inResponse));
        if(inResponse.amountReceived == inResponse.amountTotal && inResponse.destFile != null){
            enyo.windows.addBannerMessage("Download Complete" , "{}");
            this.$.OpenView.setData(inResponse);
            this.$.OpenView.openAtCenter();                
            
        //inResponse.target = the area to open
        }
    },
    downloadFail : function(inSender, inResponse) {
        enyo.log("Download failure, results=" + enyo.json.stringify(inResponse));
        enyo.windows.addBannerMessage("Download Failure" , "{}");
    },

    downloadFile : function(inId, inName)
    {
        var url =  "https://apis.live.net/v5.0/" + inId + "/content?access_token=" + Com.token;
        var target = enyo.getCookie("saveAddress");
        if(target == null){
            enyo.log("Target is not set");
            enyo.setCookie("media/internal/downloads");
            target = "media/internal/downloads";
        }
        enyo.log(target);
        target = Validator.addAddress(target);
        
        this.$.fileDownload.call({
            target: url,             
            targetDir : target,
            targetFilename : inName,
            keepFilenameOnRedirect: false,
            canHandlePause: false,
            subscribe: true
        });
    },
    
    downloadSelected: function(){
        var vrr = this.$.Scroller.getClick();
        if(vrr != null){
            if(vrr.type == "folder" || vrr.type == "album"){
                enyo.windows.addBannerMessage("Only Files Can Be Downloaded" , "{}");
            }
            else{
                
                this.$.DownloadView.setData(vrr);
                this.$.DownloadView.setCallback(enyo.bind(this, this.downloadFile));
                this.$.DownloadView.openAtCenter();
            //this.downloadFile(vrr.id, vrr.name);
            }
        }
        else{
            enyo.windows.addBannerMessage("No File Selected" , "{}");
        }
    },
   
    viewImage: function(){
        enyo.log(this.$.Scroller.getFiles());
        this.imgs = this.$.Scroller.getFiles();
        var vrr = this.$.Scroller.getClick();
        this.imgIndex = 0;
        if(vrr != null && vrr.type == "photo"){
            for(var x = 0 ; x < this.imgs.length; x++){
                if(this.imgs[x].id == vrr.id){
                    this.imgIndex = x;                    
                    break;
                }
            }
        }
        //enyo.log(this.imgIndex);
        this.doImages();
        
    },
   
    uploadSelected: function(){
        this.$.UploadView.setCallback(enyo.bind(this, this.refresh));
        this.$.UploadView.setSilentData(this.$.Scroller.getFiles().length);
        this.$.UploadView.openAtCenter();
    //var url = "https://apis.live.net/v5.0/" + MainMenu.doubleStack[MainMenu.stack.length -1] + "/files/"+ "Bob.png" +"?access_token=" + Com.token;
    //this.$.plugin.uploadFile(url, "/media/internal/downloads/Untitled.png", enyo.bind(this, this.uploadHandler));
    },
   
    uploadHandler: function(inText){
    //enyo.windows.addBannerMessage("File Uploaded: " , "{}");
    //this.refresh();
       
    },
   
   
    settings: function(){
        this.$.SettingsView.openAtCenter();
    },
   
   
    goHome: function(){
        MainMenu.stack = new Array(MainMenu.stack[0]);
        MainMenu.doubleStack = new Array(MainMenu.doubleStack[0]);
        this.refresh();
       
    }
    

})