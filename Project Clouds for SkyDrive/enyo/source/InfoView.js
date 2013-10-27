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
	name: "InfoView",
	kind: "enyo.ModalDialog",
	lazy: false,
	width:"700px", 
        height:"700px",
        data: null,
        create: function() {
            this.inherited(arguments);           
            
        },
        
        events: {
            onRename: ""
        },
        
        published: {
            oldName: ""
        },
	components: [
                {kind: "enyo.Control", style: "heigth: 620px; width: 600px;",layoutKind: "VFlexLayout", components:[
                
                {kind: enyo.Scroller,name: "Scroller", style: "height: 500px; width: 660px; text-align: center; margin-top: 50px;",components: [
			{content: "Name:", name: "o1", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "firstline", style: "font-size: 130%;"},
                        {content: "Type:", name: "o2", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "secondline", style: "font-size: 130%;"},
                        {content: "Shared With:", name: "o3", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "thirdline", style: "font-size: 130%;"},
                        {content: "Size:", name: "o4", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "fourthline", style: "font-size: 130%;"},
                        {content: "From:", name: "o5", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "fifthline", style: "font-size: 130%;"},
                        {content: "Description:", name: "o6", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "sixthline", style: "font-size: 130%;"},
                        {content: "Created At:", name: "o7", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "seventhline", style: "font-size: 130%;"},
                        {content: "Updated At:", name: "o8", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "eightline", style: "font-size: 130%;"},
                        {content: "Link:", name: "o9", style: "font-size: 130%; font-weight: bold;"},
                        {content: "", name: "ninethline", style: "font-size: 130%;", allowHtml: true},
                        
                        
		]},
                ]},
                {kind: "Button", name: "renameBtn",caption: "Rename", onclick: "renameFile", style: "background-color: green; color: white; width: 94%;"},
                {kind: "enyo.Control",style: "margin-top: 10px;", layoutKind: "HFlexLayout",  components:[
                        {kind: "Button", name: "cncldBtn",caption: "Close", onclick: "closePopup", style: "background-color: blue; color: white; width: 94%;"}
                        
                ]}
                
                
                
                
                
                
     ],
     
     closePopup: function(){
         this.close();
     },
     
     
     display: function(inData){
         this.data = inData;
         this.$.firstline.setContent(inData.name);
         this.$.secondline.setContent(inData.type);
         this.$.thirdline.setContent(inData.shared_with.access);
         this.$.fourthline.setContent((Validator.fileSize(inData.size) || "N/A B"));
         this.$.fifthline.setContent((inData.from.name || "N/A"));
         this.$.sixthline.setContent((inData.description || "N/A"));
         this.$.seventhline.setContent((Validator.parseDate(inData.created_time) || "N/A"));
         this.$.eightline.setContent((Validator.parseDate(inData.updated_time) || "N/A"));
         this.$.ninethline.setContent(("<a  target='_newtab' href = '" +inData.link + "'>" + inData.link + "</a>" || "No Link Available"));
     },
     
     
     renameFile: function(){
         this.oldName = this.data;
         this.close();
         this.doRename();
         
     }

})