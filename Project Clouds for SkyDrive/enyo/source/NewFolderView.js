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
	name: "NewFolderView",
	kind: "enyo.ModalDialog",
	lazy: false,
	width:"600px", 
        height:"700px",
        
        create: function() {
            this.inherited(arguments);           
            
        },
        
        events: {
            onSubmit: ""
        },
        
        published: {
            name: null,
            description: null
        },
	components: [
                {kind: "enyo.Control", style: "heigth: 620px; width: 600px;",layoutKind: "VFlexLayout", components:[
                
                {kind: enyo.Scroller,name: "Scroller", style: "height: 500px; width: 560px; text-align: center; margin-top: 50px;",components: [
			{content: "Create A New Folder", name: "firstline", style: "font-size: 130%; font-weight: bold;"},
                        {content: "Folder Name:", name: "secondline", style: "font-size: 130%; font-weight: bold;"},
                        {kind: "enyo.Input", autocorrect: false, spellcheck: false, autoWordComplete: false,name: "NameInput", hint: "Type name here.."},
                        {content: "Description: (Optional)", name: "thirdline", style: "font-size: 130%; font-weight: bold;"},
                        {kind: "enyo.RichText", autocorrect: false, spellcheck: false, autoWordComplete: false,richContent: false, name: "DescriptionInput",style: "background-color: white;",disabled: false}
                        
		]},
                ]},
                
                {kind: "enyo.Control",style: "margin-top: 30px;", layoutKind: "HFlexLayout",  components:[
                        
                        {kind: "Button", name: "cncldBtn",caption: "Close", onclick: "closePopup", style: "background-color: blue; color: white; width: 44.5%;"},
                        {kind: "Button", name: "submitBtn",caption: "Submit", onclick: "submitPopup", style: "background-color: green; color: white; width: 44.5%;"}
                        
                ]}
                
                
                
                
                
                
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
         this.$.NameInput.setValue("");
         this.$.DescriptionInput.setValue("");
         this.name = null;
         this.description = null;
     },
     
     closePopup: function(){
         this.close();
     },
     
     
     submitPopup: function(){
         this.name = enyo.string.trim(this.$.NameInput.getValue());
         this.description = enyo.string.trim(this.$.DescriptionInput.getText());
         if(this.name != null && this.name != ""){
             if(this.description == "" || this.description == null){
                 this.description = null;
             }
             this.doSubmit();
         }
     }
     
     

})