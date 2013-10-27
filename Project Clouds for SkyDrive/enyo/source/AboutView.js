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
	name: "AboutView",
	kind: "enyo.ModalDialog",
	lazy: false,
	width:"600px", 
        height:"700px",
        
        create: function() {
            this.inherited(arguments);           
            
        },
	components: [
                {kind: "enyo.Control", style: "heigth: 620px; width: 600px;",layoutKind: "VFlexLayout", components:[
                
                {kind: enyo.Scroller,name: "Scroller", style: "height: 500px; width: 560px; text-align: center; margin-top: 50px;",components: [
			{content: "Project Clouds for SkyDrive", name: "firstline", style: "font-size: 130%; font-weight: bold;"},
                        {content: "Version: 1.0.4", name: "secondline", style: "font-size: 130%; font-weight: bold;"},
                        {kind: "enyo.RichText", style: "-webkit-text-fill-color: black;background-color: white;",disabled: true,value: "<img src = \"icon.png\" ><br> Project Clouds for SkyDrive is made by Manas Coding. <br><br> This application was formaly known as 'TouchPad SkyDrive', however, has been renamed.   <br>Thank you for your support. <br> Questions? Comments? or Support, Please email me at: <br> manas.coding@gmail.com <br><br><br>Icons are owned by their respective owners. <br>Manas Coding claims no ownership of these icons.<br> Thank You All for the Icons. <br> <br> This is NOT a Microsoft product. <br> <br> This software is provided 'AS IS,' without a warranty of any kind. Developer shall not be liable for ANY and ALL damages sustained as a result of this application. <br> <br>&copy; 2013 Marek Kunz <br>"  }
                        
		]},
                ]},
                
                {kind: "enyo.Control",style: "margin-top: 10px;", layoutKind: "HFlexLayout",  components:[
                        {kind: "Button", name: "cncldBtn",caption: "Close", onclick: "closePopup", style: "background-color: blue; color: white; width: 92%;"}
                        
                ]}           
                
                
                
                
                
     ],
     
     closePopup: function(){
         this.close();
     }

})