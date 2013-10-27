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
    name: "Items",
    kind: "enyo.Scroller",
	
    horizontal: false,
    
    className: "BackGround",
    
    published: {
        files: [],
        clickOneName: null,
        toHandle: null,
        selectedRow: null,
        click: null        
    },       
        
    create: function() {
        this.inherited(arguments);           
            
    },      
    
    events: {
        onHandleOpen: "",
        onLoading: ""
    },
        
        
    components: [        
        
    {
        content: "", 
        name: "directoryContent"
    },

    {
        name: "list", 
        kind: "enyo.VirtualRepeater", 
        onSetupRow: "listGetItem", 
        onclick: "showInfo",
        components: [{
            name: "item", 
            kind: "Button", 
            allowHtml: true, 
            allowDrag: true,
            components:[
                {kind: "enyo.Control",style: "margin-top: 10px;", layoutKind: "HFlexLayout",  components:[
                        {kind: "Image", src: "images/fileIcon.png", name: "Icon"},
                        {name: "captionTag", style: "font-size: 160%; margin-left: 30px;"}
                ]}
            ]
        }]
    }
                   
    ],
        
        
    ready: function(){
        this.doLoading();
    },
        
        
        
    loadData: function(inData){
        this.files = inData;
        this.$.list.render();
    },
        
        
    listGetItem: function(inSender, inIndex){
        
        if (inIndex < this.files.length) {
            if (this.$.item) {
                if(this.selectedRow == inIndex){
                    this.$.item.setDepressed(true);
                }
                else{
                    this.$.item.setDepressed(false);
                }
                
                this.$.captionTag.setContent(this.files[inIndex].name);
                if(this.files[inIndex].type == "folder"){
                    this.$.item.setStyle("font-weight: bold");
                    this.$.Icon.setSrc("images/folderIcon.png");
                }
                
                if(this.files[inIndex].type == "album"){
                    this.$.item.setStyle("font-weight: bold");
                    this.$.Icon.setSrc("images/folderImageIcon.png");
                }
                
                if(this.files[inIndex].type == "video"){
                    this.$.Icon.setSrc("images/videoIcon.png");
                }
                
                if(this.files[inIndex].type == "audio"){
                    this.$.Icon.setSrc("images/audioIcon.png");
                }
                
                if(this.files[inIndex].type == "photo"){
                    this.$.Icon.setSrc("images/photoIcon.png");
                }
                
            }
            return true;
        }
             
        return false;
                        
    },
    
    
    showInfo: function(inSender, inEvent){
        if(inEvent.rowIndex != null && this.files != null){
             
             enyo.log(this.files[inEvent.rowIndex].name);
             this.selectedRow = inEvent.rowIndex;
             this.$.list.render();
             if(this.clickOneName != null && this.clickOneName.name != null && this.clickOneName.name == this.files[inEvent.rowIndex].name){
                 this.open(this.files[inEvent.rowIndex]);
             }
             
             this.clickOne(this.files[inEvent.rowIndex]);
             this.click = this.files[inEvent.rowIndex];
             
        }
    },
    
    
    clickOne: function(inFile){
          this.clickOneName = inFile;
          setTimeout(enyo.bind(this,this.unSave), 600);
     },
     
     unSave: function(){
         this.clickOneName = null;
     },
     
     open: function(inData){
         this.toHandle = inData;              
         this.doHandleOpen();
         
     }    
     
})