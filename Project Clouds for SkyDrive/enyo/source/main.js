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
    name: "Main",
    kind: "enyo.VFlexBox",
    style: "width: 100%; padding 10px; text-align: center;",
    className: "BackGround",
        
    accessToken: null,
	
    published: {
        autocorrect: false,
        spellcheck: false,
        capitalization: "lowercase",
        newline: "linux"
    },
        
        
        
    create: function() {
        this.inherited(arguments);
        if(window.PalmSystem){
            var cookie = enyo.getCookie("refreshToken");
            if(cookie != null){
                Com.reToken(enyo.bind(this, this.backRefreshed), cookie);
            }
            else{
                this.$.PaneView.selectViewByName("webb", true);
            }
            
        }
        else{
                
            this.returnMain('{ "data": [ { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!121", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "GMU_FILES", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!121/files/", "is_embeddable": true, "count": 18, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!121\u0026parid\u003d967FFA37CA78804D!105", "type": "folder", "shared_with": { "access": "Just me" }, "created_time": "2012-04-13T18:28:39+0000", "updated_time": "2012-05-08T02:31:11+0000" }, { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!132", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "SkyDrive camera roll", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!132/files/", "is_embeddable": true, "count": 0, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!132\u0026parid\u003d967FFA37CA78804D!105", "type": "album", "shared_with": { "access": "Just me" }, "created_time": "2012-04-20T17:39:37+0000", "updated_time": "2012-04-20T17:39:37+0000" }, { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!133", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "Mobile uploads", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!133/files/", "is_embeddable": true, "count": 0, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CoA78804D!133\u0026parid\u003d967FFA37CA78804D!105", "type": "album", "shared_with": { "access": "Some people" }, "created_time": "2012-04-20T17:39:38+0000", "updated_time": "2012-04-20T17:39:38+0000" }, { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!109", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "Documents", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!109/files/", "is_embeddable": true, "count": 1, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!109\u0026parid\u003d967FFA37CA78804D!105", "type": "folder", "shared_with": { "access": "Just me" }, "created_time": "2008-12-14T23:55:41+0000", "updated_time": "2012-04-23T18:28:06+0000" }, { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!106", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "Public", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!106/files/", "is_embeddable": true, "count": 0, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!106\u0026parid\u003d967FFA37CA78804D!105", "type": "folder", "shared_with": { "access": "Everyone (public)" }, "created_time": "2008-12-14T23:55:40+0000", "updated_time": "2012-04-23T18:28:07+0000" }, { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!139", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "GMU Files", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!139/files/", "is_embeddable": true, "count": 39, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!139\u0026parid\u003d967FFA37CA78804D!105", "type": "folder", "shared_with": { "access": "Just me" }, "created_time": "2012-04-23T18:31:18+0000", "updated_time": "2012-04-23T20:40:54+0000" }, { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!1319", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "Mobile", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!1319/files/", "is_embeddable": true, "count": 13, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!1319\u0026parid\u003d967FFA37CA78804D!105", "type": "folder", "shared_with": { "access": "Just me" }, "created_time": "2012-04-23T18:38:43+0000", "updated_time": "2012-04-23T19:49:58+0000" }, { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!1320", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "WebOS", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!1320/files/", "is_embeddable": true, "count": 16, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!1320\u0026parid\u003d967FFA37CA78804D!105", "type": "folder", "shared_with": { "access": "Just me" }, "created_time": "2012-04-23T18:38:43+0000", "updated_time": "2012-04-24T01:22:18+0000" }, { "id": "folder.967ffa37ca78804d.967FFA37CA78804D!10404", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "CodingForFun", "description": null, "parent_id": "folder.967ffa37ca78804d", "upload_location": "https://apis.live.net/v5.0/folder.967ffa37ca78804d.967FFA37CA78804D!10404/files/", "is_embeddable": true, "count": 13, "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!10404\u0026parid\u003d967FFA37CA78804D!105", "type": "folder", "shared_with": { "access": "Just me" }, "created_time": "2012-04-24T20:00:14+0000", "updated_time": "2012-04-24T20:05:52+0000" }, { "id": "file.967ffa37ca78804d.967FFA37CA78804D!114", "from": { "name": "Windows Live User", "id": "967ffa37ca78804d" }, "name": "Hello.jpg", "description": null, "parent_id": "folder.967ffa37ca78804d", "size": 8850005, "upload_location": "https://apis.live.net/v5.0/file.967ffa37ca78804d.967FFA37CA78804D!114/content/", "comments_count": 0, "comments_enabled": false, "is_embeddable": true, "source": "http://storage.live.com/s1prjR13_TBdKszxNva06O-2Y9cQiTNkFUW06HgDtVP4pQRlZIbaJ3pvRvrLLJvUkoBZFQyv7w6dmzEpqDfI7CuPYVKvVO_ShLWqRenjSfDhcpZX6HG6whOhg/Hello.docx:Binary,Default/Hello.docx", "link": "https://skydrive.live.com/redir.aspx?cid\u003d967ffa37ca78804d\u0026page\u003dview\u0026resid\u003d967FFA37CA78804D!114\u0026parid\u003d967FFA37CA78804D!105", "type": "photo", "shared_with": { "access": "Just me" }, "created_time": "2012-04-10T04:14:54+0000", "updated_time": "2012-04-10T04:14:54+0000" } ] }');
        }
    },      
        
    components: [
            
    {
        kind: "AppMenu", 
        name: "AppMenu",
        components: [

        {
            kind: "EditMenu"
        },

        /*{
            caption: "Open Browser", 
            name: "openBrowserBtn", 
            onclick: "openBroswer"
        },*/

        {
            caption: "About", 
            name:"aboutBtn", 
            onclick: "about"
        },

        {
            caption: "Help", 
            name:"helpBtn", 
            onclick: "help"
        },
                    
                    
                    
                    
        ]
    },
             

    {
        kind : "enyo.Pane", 
        name : "PaneView", 
        style: "height: 100%;" ,
        transitionKind: "enyo.transitions.LeftRightFlyin",
        components: [
         
        
        {
            kind: "MainMenu", 
            name: "MainMenu",
            onEnter: "handleEnter",
            onImages: "handleImages"
        },    
        
        {
            kind: "ImagesView", 
            name: "ImagesView",
            onClose: "closeImage"
            
        }, 

        {
            kind: "RichText", 
            name: "ttt"
        },
        
        {
            name: "webb",
            kind: "enyo.VFlexBox",
            lazy: true, 
            components:[
            
            {
                kind: enyo.Toolbar, 
                pack: "left", 
                components: [
                {
                    content: "Please Login Into SkyDrive",
                    onclick: "loginClick"
                },

                {
                    icon: "images/refreshIcon.png", 
                    onclick: "handleEnter", 
                    align: "left"
                },
                    
                ]
            },       

            {
                kind: "WebView", 
                name: "web",
                heigth: "100%",
                flex: 1,
                lazy: true, 
                onPageTitleChanged: "handlePageTitleChanged", 
                url: "https://login.live.com/oauth20_authorize.srf?client_id=YOURCLIENTCODE&redirect_uri=https://login.live.com/oauth20_desktop.srf&response_type=code&scope=wl.skydrive_update%20wl.offline_access"
            },
            ]
        
        },
         

                                                           
                    
        ]
    },
        

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
        kind: "AboutView", 
        name: "AboutView"
    },

    {
        kind: "HelpView", 
        name: "HelpView"
    },

    {
        kind: "SettingsView", 
        name: "SettingsView", 
        onSettings: "handleSettings", 
        onOpen: "handleSettings",
        onSaveSettings: "saveSettings"
    },
    
    {
        kind: "enyo.Popup",
        name: "loginPopup",
        width:"400px", 
        height:"400px",
        
        components: [
        {
            kind: "enyo.RichText", 
            style: "-webkit-text-fill-color: black;color: blue; background-color: white;",
            disabled: true,
            value: "<b>Login</b><br>Please Login. If you no longer want to use this application you can remove in your SkyDrive application permissions page. <a href = 'https://account.live.com'>https://account.live.com </a></a><br><br>"
        }
        ]        
        
    }
    
    
            
            
    ],
        
        
        
    handlePageTitleChanged: function(inSender, inEscapedTitle, inUrl, inCanGoBack, inCanGoForward){
        
        enyo.log(inUrl);
        if(inUrl.indexOf("https://login.live.com/oauth20_desktop.srf?code=") != -1){
            enyo.log("Came Here Done tHat2");
            var vrr = Com.splitIt("code", inUrl);
            //this.$.PaneView.selectViewByName("ttt", true);
            //this.$.ttt.setValue(inUrl);
            this.scrimShow(true);    
            this.readySetGo(vrr);
        }
    },
        
        
    
    readySetGo: function(inCode){
            
            
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "https://login.live.com/oauth20_token.srf",true);
        Main.callback.push(enyo.bind(this,this.nextStep2 ));
        xmlhttp.onreadystatechange=function() {
            //manascodingtouchpad
            //manascoding
            if (xmlhttp.readyState == 4) {
                    
                Main.nextStep(xmlhttp.responseText);
                    
            
            }
        }
        var code = inCode;
            
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var xml = "client_id=YOURCLIENTCODE&redirect_uri=https://login.live.com/oauth20_desktop.srf&code="+ code+"&grant_type=authorization_code";
            
        xmlhttp.send(xml);
    },
        
    backRefreshed: function(inValue){
        enyo.log("Used Refresh Token to Relogin");
        this.nextStep2(inValue);
    },    
    
    statics: {
        callback: [],  
        callback2: [],  
        nextStep: function(inValue){
            var call = Main.callback.pop();
            call(inValue);
        },
        nextStep2b: function(inValue){
            var call = Main.callback2.pop();
            call(inValue);
        }
          
    },
        
    nextStep2: function(inValue){
        enyo.log(inValue);
        if(inValue != null && enyo.json.parse(inValue).error == null){
            this.scrimShow(true);
            var parsed = enyo.json.parse(inValue);    
            this.accessToken = parsed.access_token;
            Com.refreshToken = parsed.refresh_token;
            enyo.setCookie("refreshToken", Com.refreshToken);
            Com.token = this.accessToken;
            var url = "https://apis.live.net/v5.0/me/skydrive?access_token=" +(enyo.json.parse(inValue)).access_token;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url,true);
            Main.callback2.push(enyo.bind(this,this.nextStep3 ));
            xmlhttp.onreadystatechange=function() {
            
                if (xmlhttp.status==200 && xmlhttp.readyState == 4) {
                
                    Main.nextStep2b(xmlhttp.responseText);
                
                }
            }
            
            xmlhttp.send();
        }
        else{
            this.scrimShow(false);  
            enyo.setCookie("refreshToken", null, { "Max-Age": 0 });
            this.$.PaneView.selectViewByName("webb", true);
            this.$.web.setUrl("https://login.live.com/oauth20_authorize.srf?client_id=YOURCLIENTCODE&redirect_uri=https://login.live.com/oauth20_desktop.srf&response_type=code&scope=wl.skydrive_update%20wl.offline_access");
            
        }
        
            
            
            
    },
        
        
    nextStep3: function(inText){
         
        Com.getFolderData(inText, enyo.bind(this, this.returnMain));
    },  
    
    
    returnMain: function(inJson){
        this.scrimShow(false);
        
        this.$.PaneView.selectViewByName("MainMenu", true);
        this.$.MainMenu.loadMain((enyo.json.parse(inJson)).data);
    },
    
    
    scrimShow: function(inValue){
        this.$.scrim.setShowing(inValue);
        this.$.spinnerLarge.setShowing(inValue);
    },
    
    
    handleEnter: function(){
        var cookie = enyo.getCookie("refreshToken");
        if(cookie != null){
            Com.reToken(enyo.bind(this, this.backRefreshed), cookie);
        }
        else{
            
            this.$.PaneView.selectViewByName("webb", true);
            this.$.web.setUrl("https://login.live.com/oauth20_authorize.srf?client_id=YOURCLIENTCODE&redirect_uri=https://login.live.com/oauth20_desktop.srf&response_type=code&scope=wl.skydrive_update%20wl.offline_access");
        }
        
    },
    
    handleImages: function(){
        var images = this.$.MainMenu.getImgs();
        var index = this.$.MainMenu.getImgIndex();
        this.$.PaneView.selectViewByName("ImagesView", true);
        this.$.ImagesView.startDownload(images, index);
        
    },
    
    closeImage: function(){
        this.$.PaneView.selectViewByName("MainMenu", true);
        
    },
    
    
    about: function(){
        this.$.AboutView.openAtCenter();
    },
    
    help: function(){
        this.$.HelpView.openAtCenter();
    },
    
    
    loginClick: function(){
        this.$.loginPopup.openAtCenter();
    }
        
        

})
