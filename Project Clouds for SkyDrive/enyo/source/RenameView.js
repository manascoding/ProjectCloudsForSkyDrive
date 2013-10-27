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
    name: "RenameView",
    kind: "enyo.ModalDialog",
    lazy: false,
    width:"600px", 
    height:"650px",
        
    create: function() {
        this.inherited(arguments);           
            
    },
        
    events: {
        onSubmit: ""
    },
        
    published: {
        name: null,
        data: null,
        description: null
    },
    components: [
    {
        kind: "enyo.Control", 
        style: "heigth: 620px; width: 600px;",
        layoutKind: "VFlexLayout", 
        components:[
                

        {
            kind: enyo.Scroller,
            name: "Scroller", 
            style: "height: 450px; width: 560px; text-align: center; margin-top: 30px;",
            components: [

            {
                content: "Rename a Folder or a File", 
                name: "firstline", 
                style: "font-size: 130%; font-weight: bold;"
            },

            {
                content: "Old Name:", 
                name: "secondline", 
                style: "font-size: 130%; font-weight: bold;"
            },

            {
                content: "", 
                name: "fifthline", 
                style: "font-size: 130%; font-weight: bold;"
            },

            {
                content: "New Name:", 
                name: "fourthline", 
                style: "font-size: 130%; font-weight: bold;"
            },

            {
                kind: "enyo.Input", 
                autocorrect: false, 
                spellcheck: false, 
                autoWordComplete: false,
                name: "NameInput", 
                hint: "Type name here..",
                style: "background-color: white;"
            },
            
            {
                content: "Description: (Optional)", 
                name: "thirdline", 
                style: "font-size: 130%; font-weight: bold;"
            },

            {
                kind: "enyo.RichText", 
                autocorrect: false, 
                spellcheck: false, 
                autoWordComplete: false,
                richContent: false, 
                name: "DescriptionInput",
                style: "background-color: white;",
                disabled: false
            }
                         
            ]
        },
        ]
    },
            
                

    {
        kind: "enyo.Control",
        style: "margin-top: 30px;", 
        layoutKind: "HFlexLayout",  
        components:[
                        

        {
            kind: "Button", 
            name: "cncldBtn2",
            caption: "Close", 
            onclick: "closePopup", 
            style: "background-color: blue; color: white; width: 44.5%;"
        },

        {
            kind: "Button", 
            name: "submitBtn2",
            caption: "Submit", 
            onclick: "submitPopup", 
            style: "background-color: green; color: white; width: 44.5%;"
        }
                        
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
        this.$.NameInput.setInputClassName("larger");
        this.$.NameInput.setValue(this.data.name);
        
        this.$.DescriptionInput.setValue(this.data.description || "");
        this.$.fifthline.setContent(this.data.name);
        this.name = null;
         
    },
     
    closePopup: function(){
        this.close();
    },
     
     
    submitPopup: function(){
        this.name = enyo.string.trim(this.$.NameInput.getValue());
        this.description = enyo.string.trim(this.$.DescriptionInput.getValue());
        
        if(this.name != null && this.name != ""){
            if(this.description == ""){
                Com.renameFile(enyo.bind(this, this.handleChanged), this.name, this.data.id);
            }
            else{
                Com.renameFile(enyo.bind(this, this.handleChanged), this.name, this.data.id, this.description);
            }            
            
            this.scrimShow(true);
        }
        else{
            enyo.windows.addBannerMessage("Name cannot be blank" , "{}");
        }
    },
     
    handleChanged: function(inData){
         
        data = enyo.json.parse(inData);
        if(data.error){
            enyo.windows.addBannerMessage("Rename not successful" , "{}");
        }
        else{
            enyo.windows.addBannerMessage("Rename successful" , "{}");
        }
        this.scrimShow(false);
        this.close();
        this.doSubmit();
    },
     
     
    scrimShow: function(inValue){
        this.$.scrim.setShowing(inValue);
        this.$.spinnerLarge.setShowing(inValue);
    }
     
     

})



