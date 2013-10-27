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
	name: "Validator",
	kind: "enyo.Object",
	
        statics: {
            validateDir: function(dir){
                if(dir.indexOf("/") != -1){
                    return null;
                }
                dir = dir.replace(new RegExp(" ", 'g'),"\\ ");
                            
                
                return dir;
            },
            
            addQuotes: function(value){
                return "\"" + value + "\"";
            },
            
            addAddress: function(inString){
                if(inString.charAt(0) != "/"){
                    inString = "/" + inString;
                }
                if(inString.charAt(inString.length -1) == "/"){
                    return inString.substring(0, inString.length -1);
                }
                return inString;
            },
            
            
            getName: function(vrr){
                var part = vrr.split("/");
                return part[part.length -1];
            },
            
            
            fileSize: function(inStr){
                if(inStr == null){
                    return "N/A";                    
                }
                var count = 0;
                while(inStr > 1024){
                    
                    inStr /= 1024;
                    count++;
                }
                inStr = Math.round(inStr * 100) /100;
                switch (count){
                    case 0:
                        inStr += "B";
                        break;
                    case 1:
                        inStr += "KB";
                        break;
                    case 2:
                        inStr += "MB";
                        break;
                    case 3:
                        inStr += "GB";
                        break;
                }
                return inStr;
            },
            
            
            parseDate: function(inStr){
                if(inStr == null){
                    return "N/A";                    
                }
                var date = new Date(inStr);
                return date.toLocaleDateString() + " "+ date.toLocaleTimeString();
            
            }
            
        }
	

})