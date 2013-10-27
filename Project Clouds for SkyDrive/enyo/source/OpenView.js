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
    name: "OpenView",
    kind: "enyo.Popup",
    lazy: false,
    width:"600px", 
    height:"400px",
        
    create: function() {
        this.inherited(arguments);           
            
    },
                        
    published: {
        data: null
    },
    components: [
            
    {
        name : "openFile",
        kind : "PalmService",
        service : "palm://com.palm.applicationManager",
        method : "open",
        onSuccess : "openSuccess",
        onFailure : "openFailure",
        subscribe : true
    },
    {
        kind: "enyo.Control", 
        style: "heigth: 620px; width: 600px;",
        layoutKind: "VFlexLayout", 
        components:[
                

        {
            kind: enyo.Scroller,
            name: "Scroller", 
            style: "height: 270px; width: 560px; text-align: center; margin-top: 30px;",
            components: [

            {
                content: "Download Complete", 
                name: "firstline", 
                style: "font-size: 130%; font-weight: bold;"
            },

            {
                content: "Do you want to open the file?", 
                name: "fifthline", 
                style: "font-size: 130%; font-weight: bold;"
            },

            {
                content: "", 
                name: "fourthline", 
                style: "font-size: 150%; font-weight: bold;",
                allowHtml: true
            },

                                     
            ]
        },
        ]
    },
            
                

    {
        kind: "enyo.Control",
        style: "margin-top: 0px;", 
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
            caption: "Open", 
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
        this.$.fourthline.setContent(this.data.target);
                
    },
     
    closePopup: function(){
        this.close();
    },
     
     
    submitPopup: function(){
        enyo.windows.addBannerMessage("Trying To Open: " + this.data.destFile , "{}");
        this.$.openFile.call({
            "target": this.data.target
        });
    },
     
    
    scrimShow: function(inValue){
        this.$.scrim.setShowing(inValue);
        this.$.spinnerLarge.setShowing(inValue);
    }
     
     

})


