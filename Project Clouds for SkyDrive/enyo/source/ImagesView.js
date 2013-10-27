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
	name: "ImagesView",
	kind: "enyo.VFlexBox",
        style: "width: 100%; height: 100%; padding 10px; text-align: center;",
        
        events: {
            onClose: ""
        },
        
        create: function() {
            this.inherited(arguments);           
            
        },
        
        published: {
          index: 0,
          imageAvail: false,
          data: []
        },
	components: [
                {kind: "ImageView", flex: 1, onGetLeft: "getLeft", onGetRight: "getRight"},
                
                {kind: "enyo.Control",style: "margin-top: 10px;", layoutKind: "HFlexLayout",  components:[
                        {kind: "Button", name: "prevBtn",caption: "Previous", onclick: "prevImage", style: "background-color: blue; color: white; width: 36.5%; margin-left: 12%;"},
                        {kind: "Button", name: "nextBtn",caption: "Next", onclick: "nextImage", style: "background-color: green; color: white; width: 36.5%; "}
                        
                ]},
                
                {kind: "enyo.Control",style: "margin-top: 10px;", layoutKind: "HFlexLayout",  components:[
                        {kind: "Button", name: "downloadBtn",caption: "Download", onclick: "downloadCurrent", style: "background-color: black; color: white; width: 36.5%;  margin-left: 12%;"},
                        {kind: "Button", name: "cncldBtn",caption: "Close", onclick: "closePopup", style: "background-color: red; color: white; width: 36.5%;"}
                        
                ]},
            
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
                    name : "currentFileDownload",
                    kind : "PalmService",
                    service : "palm://com.palm.downloadmanager/",
                    method : "download",
                    onSuccess : "currentDownloadFinished",
                    onFailure : "currentDownloadFail",
                    onResponse : "gotResponse",
                    subscribe : true
                },
                
                {
                    name : "deleteDownloadFile",
                    kind : "PalmService",
                    service : "palm://com.palm.downloadmanager/",
                    method : "deleteDownloadedFile",
                    onSuccess : "deleteFinished",
                    onFailure : "deleteFail",
                    onResponse : "gotResponse",
                    subscribe : true
                },              
                
                
     ],
     
     closePopup: function(){
         this.doClose();
     },
     
     
     startDownload: function(inVrr, inIndex){
         
         if(inIndex != 0 && window.PalmSystem){
             this.data = inVrr;
             this.imageAvail = true;
             this.index = inIndex;
             this.$.imageView.setCenterSrc("images/test.png");
             this.downloadFile(this.data[this.index].id, this.data[this.index].name);
             
         }
         else if(window.PalmSystem){
             this.data = inVrr;
             this.imageAvail = false;
             var x = 0;
             while( x < this.data.length && this.imageAvail == false){
                 if(this.data[x].type == "photo") {
                     this.imageAvail = true;
                     break; 
                 }
                 x++;
             }
             if(this.imageAvail){
                 enyo.log(x);
                 this.$.imageView.setCenterSrc("images/test.png");
                 this.index = x;
                 this.downloadFile(this.data[x].id, this.data[x].name);
             }
             else{
                 this.$.imageView.setCenterSrc("images/test.png");
             }
             
         }
         else{
             this.$.imageView.setCenterSrc("images/test.png");
             
         }
         
         
     },
     
     downloadFinished : function(inSender, inResponse) {
        enyo.log("Download success, results=" + enyo.json.stringify(inResponse));
        if(inResponse.amountReceived == inResponse.amountTotal && inResponse.destFile != null){
            //enyo.windows.addBannerMessage("Download " , "{}");
            
            this.$.imageView.setCenterSrc("/media/internal/downloads/skydrive/" + inResponse.destFile);
            this.deleteFile(inResponse.ticket);
            
        //inResponse.target = the area to open
        }
    },
    
    downloadFail : function(inSender, inResponse) {
        enyo.log("Download failure, results=" + enyo.json.stringify(inResponse));
        this.$.imageView.setCenterSrc("images/test.png");
        //enyo.windows.addBannerMessage("Download Failure" , "{}");
    },
    
    downloadFile : function(inId, inName)
    {
        var url =  "https://apis.live.net/v5.0/" + inId + "/content?access_token=" + Com.token;
        enyo.log(inId);
        
        var target = "media/internal/downloads/skydrive";
        target = Validator.addAddress(target);
        
        this.$.fileDownload.call({
            target: url,
             
            targetDir : target,
            targetFilename : inName,
            keepFilenameOnRedirect: true,
            canHandlePause: false,
            subscribe: true
        });
    },
    
    downloadCurrent: function(){
        
        if(this.imageAvail && this.data[this.index].type == "photo"){
            this.currentDownloadFile(this.data[this.index].id, this.data[this.index].name);
        }
        
    },
    
    currentDownloadFile: function(inId, inName){
        var url =  "https://apis.live.net/v5.0/" + inId + "/content?access_token=" + Com.token;
        var target = enyo.getCookie("saveAddress");
        if(target == null){
            enyo.log("Target is not set");
            enyo.setCookie("media/internal/downloads");
            target = "media/internal/downloads";
        }
        enyo.log(target);
        target = Validator.addAddress(target);
        this.$.currentFileDownload.call({
            target: url,             
            targetDir : target,
            targetFilename : inName,
            keepFilenameOnRedirect: true,
            canHandlePause: false,
            subscribe: true
        });
        
    },
    
    
    currentDownloadFinished : function(inSender, inResponse) {
        enyo.log("Download success, results=" + enyo.json.stringify(inResponse));
        if(inResponse.amountReceived == inResponse.amountTotal && inResponse.destFile != null){
            enyo.windows.addBannerMessage("Download Finished: " + inResponse.destFile , "{}");
            
        }
    },
    
    currentDownloadFail : function(inSender, inResponse) {
        enyo.log("Download failure, results=" + enyo.json.stringify(inResponse));
        enyo.windows.addBannerMessage("Download Failure" , "{}");
    },
    
     nextImage: function(){
         if(this.imageAvail){
             var ind = this.index + 1;
             while(this.data[ind % this.data.length].type != "photo"){
                 ind++;
             }
             this.index = ind % this.data.length;
             this.downloadFile(this.data[this.index].id, this.data[this.index].name);
         }
         
     },
     
     prevImage: function(){
         if(this.imageAvail){
             var ind = this.index - 1;
             if(ind == -1){
                ind = this.data.length - 1;
             }
             while(this.data[ind % this.data.length].type != "photo"){
                 ind--;
                 if(ind == -1){
                     ind = this.data.length - 1;
                 }
             }
             this.index = ind % this.data.length;
             this.downloadFile(this.data[this.index].id, this.data[this.index].name);
         }
         
     },

    deleteFinished : function(inSender, inResponse) {
        enyo.log("deleteDownloadedFile success, results=" + enyo.json.stringify(inResponse));
        //enyo.windows.addBannerMessage("Delete " , "{}");
    },
    deleteFail : function(inSender, inResponse) {
        enyo.log("deleteDownloadedFile failure, results=" + enyo.json.stringify(inResponse));
    },  
    deleteFile : function(ticket)
    {
        this.$.deleteDownloadFile.call({ticket: ticket});
    }
         
     

})