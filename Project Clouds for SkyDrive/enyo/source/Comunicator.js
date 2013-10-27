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
/*
 *Deleted Client ID: Must add your own clientID (Developer ID) to use this application. 
 **/


enyo.kind({
    name: "Com",
    kind: "enyo.Object",
	
    statics: {
        token: null,
        refreshToken: null,
        callback: [],
        inSilent: [],
        inSilent2: [],
        inSilent3: [],
        nextStep: function(inValue){
            var call = Com.callback.pop();
            call(inValue);
        },
        
        silentStep: function(inValue){
            var call = Com.inSilent.pop();
            var inWeb = Com.inSilent2.pop();
            var inData = Com.inSilent3.pop();
            call(inValue, inWeb, inData);
        },
        
        splitIt: function(inString, inCode){
            //extract the query string from the url
            inCode = inCode.replace(new RegExp("\\?", 'g'), "&");
            var query = inCode;
            //split the query into separate name/value pairs
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
            
                //split each pair into separate names and values
                var pair = vars[i].split("=");
                //find the required name and return it's value
                
                if (pair[0] == inString) {
                    return pair[1];
                }
            }
            return null;
        },
        
        getQuota: function(inCall){
            
            
            var url = "https://apis.live.net/v5.0/me/skydrive/quota?access_token=" + Com.token;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url,true);
            Com.callback.push(inCall);
                
            xmlhttp.onreadystatechange=function() {
                //manascodingtouchpad
                //manascoding
                if (xmlhttp.readyState == 4) {
                    
                    //var json = XMLObjectifier.xmlToJSON(xmlhttp.responseXML);
                    enyo.log("xmlhttp.responseXML");
                    enyo.log(xmlhttp.responseText);
                    Com.nextStep(xmlhttp.responseText);
                    
                //IDE.processDetails(json);
                }
            }
            
            xmlhttp.send();
                
            
            
            
        },
        
        getFolderData: function(inJson, inCallback){
            MainMenu.stack.push((enyo.json.parse(inJson)).upload_location);
            MainMenu.doubleStack.push((enyo.json.parse(inJson)).id);
            var url = (enyo.json.parse(inJson)).upload_location+ "?access_token=" + Com.token;
        
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url,true);
            Com.callback.push(inCallback);
                
            xmlhttp.onreadystatechange=function() {
                //manascodingtouchpad
                //manascoding
                if (xmlhttp.readyState == 4) {
                    
                    //var json = XMLObjectifier.xmlToJSON(xmlhttp.responseXML);
                    enyo.log("xmlhttp.responseXML");
                    enyo.log(xmlhttp.responseText);
                    Com.nextStep(xmlhttp.responseText);
                    
                //IDE.processDetails(json);
                }
            }
            
            xmlhttp.send();
        },
        
        
        back: function(inCallback){
            if(MainMenu.stack.length > 1){
                var url =  MainMenu.stack[MainMenu.stack.length -2] + "?access_token=" + Com.token;
        
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", url,true);
                Com.callback.push(inCallback);
                
                xmlhttp.onreadystatechange=function() {
                    
                    if (xmlhttp.readyState == 4) {
                    
                        MainMenu.stack.pop();
                        MainMenu.doubleStack.pop();
                        Com.nextStep(xmlhttp.responseText);
                        
                    }
                }
            
                xmlhttp.send();
            }
            
        },
        
        
        refresh: function(inCallback){
            if(MainMenu.stack.length > 0){        
            
                var url =  MainMenu.stack[MainMenu.stack.length -1] + "?access_token=" + Com.token;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", url,true);
                Com.callback.push(inCallback);
                
                xmlhttp.onreadystatechange=function() {
                    //manascodingtouchpad
                    //manascoding
                    if (xmlhttp.readyState == 4) {
                                        
                        Com.nextStep(xmlhttp.responseText);
                    }
                }
            
                xmlhttp.send();
            }
            
        },
        
        
        createFolder: function(inCallback, inName, inDescription){
            var url =  "https://apis.live.net/v5.0/" + MainMenu.doubleStack[MainMenu.doubleStack.length - 1] + "?access_token=" + Com.token;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", url,true);
            Com.callback.push(inCallback);
                
            xmlhttp.onreadystatechange=function() {
                    
                if (xmlhttp.readyState == 4) {
                    Com.nextStep(xmlhttp.responseText);
                }
            }
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            if(inDescription ==  null){
                var json = '{name: "'+ inName+ '"}';
            }
            else{
                var json = '{name: "'+ inName+ '", description: "'+inDescription + '"}';
            }
            xmlhttp.send(json);           
        },
        
        
        renameFile: function(inCallback, inName, inId, inDescription){
            var url =  "https://apis.live.net/v5.0/" + inId + "?access_token=" + Com.token;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("PUT", url,true);
            Com.callback.push(inCallback);
            
            xmlhttp.onreadystatechange=function() {
                    
                if (xmlhttp.readyState == 4) {
                    enyo.log("In Rename Folder");
                    enyo.log(xmlhttp.responseText);
                    Com.nextStep(xmlhttp.responseText);
                }
            }
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            if(inDescription != null){
                var json = '{name: "'+ inName+ '" , description: "'+ inDescription +'"}';
            }
            else{
                var json = '{name: "'+ inName+ '"}';
            }
            
            xmlhttp.send(json);           
        },
        
        removeFile: function(inCallback, inId){
            var url =  "https://apis.live.net/v5.0/" + inId + "?access_token=" + Com.token;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("DELETE", url,true);
            Com.callback.push(inCallback);
            xmlhttp.onreadystatechange=function() {
                    
                if (xmlhttp.readyState == 4) {
                    enyo.log("In Remove Folder or File");
                    enyo.log(xmlhttp.responseText);
                    Com.nextStep(xmlhttp.responseText);
                }
            }
            xmlhttp.send();           
        },
        
        
        refreshSilent: function(inCallback, inWeb, inData){
            if(MainMenu.stack.length > 0){        
            
                var url =  MainMenu.stack[MainMenu.stack.length -1] + "?access_token=" + Com.token;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", url,true);
                Com.inSilent.push(inCallback);
                Com.inSilent2.push(inWeb);
                Com.inSilent3.push(inData);
                
                xmlhttp.onreadystatechange=function() {
                    //manascodingtouchpad
                    //manascoding
                    if (xmlhttp.readyState == 4) {
                                        
                        Com.silentStep(xmlhttp.responseText);
                    }
                }
            
                xmlhttp.send();
            }
            
        },
        
        reToken: function(inCallback, inToken){
            var url = "https://login.live.com/oauth20_token.srf"
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", url,true);
            Com.callback.push(inCallback);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.onreadystatechange=function() {
                //manascodingtouchpad
                //manascoding
                if (xmlhttp.readyState == 4) {
                                        
                    Com.nextStep(xmlhttp.responseText);
                }
            }
            var xml = "client_id=YOURCLIENTCODE&redirect_uri=https://login.live.com/oauth20_desktop.srf&grant_type=refresh_token&refresh_token=" + inToken;
            xmlhttp.send(xml);
        }
        
        
        /*paste: function(inCallback, inType, inUrl){
            var destination = enyo.string.trim(MainMenu.doubleStack[MainMenu.doubleStack.length -1]);
            var url =  inUrl+ "?access_token=" + Com.token;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("PUT", url,true);
            Com.callback.push(inCallback);
            
            xmlhttp.onreadystatechange=function() {
                    
                if (xmlhttp.readyState == 4) {
                    enyo.log("In Paste Folder");
                    enyo.log(xmlhttp.responseText);
                    Com.nextStep(xmlhttp.responseText);
                }
            }
            enyo.log(destination.split("!")[0]);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            var json = '{parent_id: "'+ destination.split("!")[0]+ '"}';
            xmlhttp.send(json);
            
            
        },
        
        
        getImage: function(inCallback, inUrl){
            var url =  inUrl+ "/picture?type=thumbnail&access_token=" + Com.token;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url,true);
            Com.callback.push(inCallback);
            
            xmlhttp.onreadystatechange=function() {
                    
                if (xmlhttp.readyState == 4) {
                    enyo.log("In Paste Folder");
                    enyo.log(xmlhttp.responseText);
                    Com.nextStep(xmlhttp.responseText);
                }
            }
            
            xmlhttp.send();
            
        }*/
        
        
        
        
            
    }
	

})