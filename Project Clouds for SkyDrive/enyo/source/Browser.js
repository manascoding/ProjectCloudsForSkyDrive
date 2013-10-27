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
	name: "Browser",
	kind: "enyo.VFlexBox",
	style: "width: 100%; height: 100%;padding 10px; text-align: center;",
	loading: false,
        events: {
            onQuit: ""
            
        },
        
        create: function() {
           
            this.inherited(arguments);
        },      
        
        components: [
           {kind: "enyo.Toolbar", pack: "left", components: [
             {kind: "enyo.GrabButton"},
             {icon: "images/backIcon.png", onclick: "backUrl", align: "left", style: "margin-left: 50px;"},
             {icon: "images/forwardIcon.png", onclick: "forwardUrl", align: "left", style: "margin-left: 10px;"},
             {kind: "enyo.Input", alwaysLooksFocused: true, onfocus: "handleFocus",name: "urlInput",inputType: "url", spellcheck: false, onkeydown: "acceptKey",autoCapitalize: "lowercase",autocorrect: false, style: "margin-left: 30px; width: 450px;"},
             {icon: "images/refreshIcon.png", name: "chageIcon",onclick: "refreshUrl", align: "left", style: "margin-left: 10px;"},
             
             
             
        ]
        },
     

        {
        name: "launchBrowserCall",
        kind: "PalmService",
        service: "palm://com.palm.applicationManager/",
        method: "launch",
        onSuccess: "launchFinished",
        onFailure: "launchFail",
        onResponse: "gotResponse",
        subscribe: true
    },
     
     
         
         
     
        {kind: "enyo.Control", layoutKind: "VFlexLayout", flex: 1,  components:[
             {kind: "WebView",name : "Web", url: "", flex: 1,style: "min-height: 90%;", 
                 onEditorFocusChanged: "handleChange", onLoadStopped: "loadStopped",onLoadStarted: "loadStarted", 
                 onLoadComplete: "loadComplete", onPageTitleChanged: "handlePageTitleChanged", 
                 onNewPage: "openNewCardWithIdentifier",onSingleTap: "handleSingleTap"}
                
                
        ]},
         {kind: enyo.Toolbar, pack: "justify", components: [
             {kind: enyo.GrabButton}
         ]}
            
        ],
        
        
        
        
        ready: function(){
           
            //enyo.log("Does");            
        },
        newPage: function(){
            this.sitesVisited++;
            this.$.headerContent.setContent(this.sitesVisited);
            //enyo.log(this.sitesVisited);
        },
        
        clicked: function(){
            //enyo.log("clicked")
            this.doQuit();
        },
        
        acceptKey: function(c, v){
           
            if(v.keyCode == 13){
                
                enyo.keyboard.hide();
                this.$.Web.setUrl(this.$.urlInput.getValue());
            }
            
        },
        
        
        handleFocus: function(){
            this.$.urlInput.forceSelect();
            enyo.keyboard.show(7);
        },
        
        setUrl: function(inValue){
            this.$.Web.setUrl(inValue);
            this.$.urlInput.setValue(inValue);
        },
        
        backUrl: function(){
            this.$.Web.goBack();
        },
        
        forwardUrl: function(){
            this.$.Web.goForward();
        },
        
        refreshUrl: function(){
            if(this.loading){
                this.$.Web.stopLoad();
                this.$.chageIcon.setIcon("images/stopIcon.png");
                this.loading = false;
            }
            else{
                this.$.Web.reloadPage();
                this.loading = true;
                this.$.chageIcon.setIcon("images/refreshIcon.png");
            }
            
        },
        
        handleChange: function(){
            
            enyo.keyboard.show();
        },
        
        loadStarted: function(){
            this.$.chageIcon.setIcon("images/stopIcon.png");
        },
        
        loadStopped: function(inSender, inEvent){
            this.$.chageIcon.setIcon("images/refreshIcon.png");
            this.loadComplete();
            //enyo.log(inEvent);
            //enyo.log(inSender);
            
        },
        
        
        loadComplete: function(){
            var url = this.$.Web.getUrl();
            //enyo.log(url);
            //this.$.urlInput.setValue(url);
        },
        
        handlePageTitleChanged: function(inSender, inEscapedTitle, inUrl, inCanGoBack, inCanGoForward){
            this.$.urlInput.setValue(inUrl);
        },
        
        
        handleSingleTap: function(){
            this.$.urlInput.forceBlur();
            enyo.keyboard.hide();
        },
        
        
    openNewCardWithIdentifier: function(inSender, inIdentifier) {
       
 	this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target":this.$.urlInput.getValue()}}); 	
        
 	 	
    },
        
    launchFinished: function(inSender, inResponse) {
        enyo.log("Launch browser success, results=" + enyo.json.stringify(inResponse));
    },
    launchFail: function(inSender, inResponse) {
        enyo.log("Launch browser failure, results=" + enyo.json.stringify(inResponse));
    }
        
        
	

	

})