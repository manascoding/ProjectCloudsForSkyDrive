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
	name: "SettingsView",
	kind: "enyo.ModalDialog",
	lazy: false,
	width:"600px", 
        height:"700px",
                
        published: {
            autocorrect: false,
            spellcheck: false,
            capitalization: null,
            newline: null
        },
        
        create: function() {
            this.inherited(arguments);
            
            
            
        },
	components: [
                {kind: "enyo.Control", style: "heigth: 520px; width: 600px;",layoutKind: "VFlexLayout", components:[
                
                
                
                {kind: enyo.Scroller,name: "Scroller", align: "center",style: "height: 450px; width: 560px; text-align: center;",components: [
			{content: "Project Clouds for SkyDrive", name: "firstline", style: "font-size: 130%; font-weight: bold;"},
                        {content: "<br>", allowHtml: true,name: "secondline", style: "font-size: 130%; font-weight: bold;"},
                        {content: "Storage Capacity:", allowHtml: true,name: "secondline21", style: "font-size: 130%; font-weight: bold;"},
                        {kind: "ProgressBar", name: "ProgressBar", style: "width: 560px", position: 0},
                        {content: "Available: Bytes", allowHtml: true,name: "availableLine", style: "font-size: 130%; font-weight: bold;"},
                        {content: "Out Of: Bytes", allowHtml: true,name: "quotaLine", style: "font-size: 130%; font-weight: bold;"},
                        {content: "<br>", allowHtml: true,name: "secondline256", style: "font-size: 130%; font-weight: bold;"},
                        {content: "Download Files To Folder:", allowHtml: true,name: "secondline2", style: "font-size: 130%; font-weight: bold;"},
                        {content: "Current:", allowHtml: true,name: "secondline4", style: "font-size: 130%; font-weight: bold;"},                  
                        {content: "media/internal/downloads", allowHtml: true,name: "currentline", style: "font-size: 130%; font-weight: bold;"},                  
                        {content: "Must be beneath: media/internal/", allowHtml: true,name: "secondline3", style: "font-size: 130%; font-weight: bold;"},                  
                        {kind: "enyo.Input", autocorrect: false, spellcheck: false, autoWordComplete: false,name: "NameInput", hint: "ex: media/internal/downloads"},
                        
                         
		]},
                ]},
                
                
                 {kind: "Button", name: "deleteTokenBtn",caption: "Delete Re-Login Token", onclick: "deleteToken", style: "background-color: black; color: white; width: 93%; margin-top: 20px;"},
                {kind: "enyo.Control",style: "margin-top: 10px;", layoutKind: "HFlexLayout",  components:[
                        {kind: "Button", name: "saveBtn",caption: "Save Settings", onclick: "savePopup", style: "background-color: green; color: white; width: 93%; margin-top: 20px;"},
                        
                        
                ]},
            {kind: "Button", name: "cncldBtn",caption: "Close", onclick: "closePopup", style: "background-color: blue; color: white; width: 93%; margin-top: 20px;"}
                
                
                
                
                
                
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
         this.$.NameInput.setValue("media/internal/");
         this.$.NameInput.setInputClassName("larger");
         var cur = enyo.getCookie("saveAddress");
         if(cur != null){
             this.$.currentline.setContent(cur);
         }
         else{
             enyo.setCookie("saveAddress", "media/internal/downloads");
             if(window.PalmSystem){
                this.handleOpen();
             }         
             
         }
         if(window.PalmSystem){
             Com.getQuota(enyo.bind(this, this.quotaHandler));
         }
         else{
             this.quotaHandler('{"quota": 26843545600,"available": 26053190160}');
         }
         
         
     },
     
     savePopup: function(){
         var newv = this.$.NameInput.getValue();
         if(newv.match(new RegExp("^media/internal/"))){
             enyo.windows.addBannerMessage("Saved" , "{}");
             enyo.setCookie("saveAddress", newv);
             this.$.currentline.setContent(newv);

         }
         else{
             enyo.windows.addBannerMessage("Not Valid" , "{}");
         }
     },
     
     
     closePopup: function(){
         this.close();
     },
     
     quotaHandler: function(inData){
         var json = enyo.json.parse(inData);
         if(json.quota != null){
             var pos = Math.round((json.available / json.quota) * 100);
             this.$.ProgressBar.setPosition(pos);
             this.$.availableLine.setContent("Available: " + Validator.fileSize(json.available) );
             this.$.quotaLine.setContent("Out Of: " + Validator.fileSize(json.quota));
         }
     },
     
     
     deleteToken: function(){
         enyo.setCookie("refreshToken", "null", { "Max-Age": 0 });
         enyo.windows.addBannerMessage("Deleted Token, Press Key To Re-Login" , "{}");
     }

})