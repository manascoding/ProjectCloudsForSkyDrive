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
	name: "FileTreePlugin",
	kind: "enyo.Hybrid",
	width: 0,
	height: 0,
	executable: "download_plugin",

	create: function() {
		this.inherited(arguments);
		
		this.addCallback("getFilesResult", enyo.bind(this, this._getFilesResultsCallback), true);
                this.addCallback("getSaveResult", enyo.bind(this, this._getSaveResultCallback), true);
                this.addCallback("getOpenResult", enyo.bind(this, this._getOpenResultCallback), true);
                this.addCallback("getRemoveResult", enyo.bind(this, this._getRemoveResultCallback), true);
                this.addCallback("getDirResult", enyo.bind(this, this._getDirResultsCallback), true);
                this.addCallback("getUploadResult", enyo.bind(this, this._getUploadResultCallback), true);

        },
	
	_resultsCallbacks: [],
        
        _getDirResultsCallback: function(dir){
            enyo.log("***** FileTreePlugin: _getDirResultsCallback");
            var callback = this._resultsCallbacks.shift();
            if (callback) {
		callback(dir);
            }
            else {
		console.error("FileTreePlugin: got results with no callbacks registered: " );
            }
            
        },
	_getFilesResultsCallback: function(filesJSON) {
		console.error("***** FileTreePlugin: _getFilesResultsCallback");
		
		var callback = this._resultsCallbacks.shift();
		if (callback) {
			callback(enyo.json.parse(filesJSON));
		}
		else {
			console.error("FileTreePlugin: got results with no callbacks registered: " + filesJSON);
		}
	},
        
        _getRemoveResultCallback: function(success){
            enyo.log("***** FileTreePlugin: _getRemoveResultCallback");
            var callback = this._resultsCallbacks.shift();
            if (callback) {
		callback(success);
            }
            else {
		console.error("FileTreePlugin: got results with no callbacks registered: " );
            }
            
        },
        
        _getSaveResultCallback: function(success){
            enyo.log("***** FileTreePlugin: _getSaveResultCallback");
            var callback = this._resultsCallbacks.shift();
            if (callback) {
		callback(success);
            }
            else {
		console.error("FileTreePlugin: got results with no callbacks registered: " );
            }
            
        },

        _getOpenResultCallback: function(fileText, fileNameBack){
             enyo.log("***** FileTreePlugin: _getOpenResultCallback");
            var callback = this._resultsCallbacks.shift();
            if (callback) {
		callback(fileNameBack, fileText);
            }
            else {
		console.error("FileTreePlugin: got results with no callbacks registered: " );
            }
        },
        
        
        _getUploadResultCallback: function(inFile){
            enyo.log("***** FileTreePlugin: _getUploadResultCallback");
            //var callback = this._resultsCallbacks.shift();
            /*if (callback) {
		callback(inFile);
            }
            else {
		console.error("FileTreePlugin: got results with no callbacks registered: " );
            }*/
            
        },
        
        createDir: function(newDirName, callback){
            enyo.log(newDirName);
            if(window.PalmSystem){
                enyo.log("***** FileTreePlugin: createDir");
                this._resultsCallbacks.push(callback);
                this.callPluginMethodDeferred(enyo.nop, "createDir", newDirName);
            }
            else{
                 enyo.log(newDirName);
                 enyo.nextTick(this, function() { callback(newDirName)});
            }
            
        },
	openFile: function(fullFileName, callback){
            if(window.PalmSystem){
                enyo.log("***** FileTreePlugin: openFile");
                this._resultsCallbacks.push(callback);
                this.callPluginMethodDeferred(enyo.nop, "openFile", fullFileName);
            }
            else{
                 enyo.log(fullFileName);
                 enyo.nextTick(this, function() { callback(fullFileName, "To <b>boldlWe we y</b> <br>go...\n\ sss    dss         ")});
            }
        },
        saveFile: function(fullFileName, fullText, callback){
            enyo.log(fullText);
            if(window.PalmSystem) {
                console.error("***** FileTreePlugin: saveFile");
                this._resultsCallbacks.push(callback);
		this.callPluginMethodDeferred(enyo.nop, "saveFile", fullFileName, fullText);
            }
            else {
                enyo.log(fullText);
                enyo.log(fullFileName);
                enyo.nextTick(this, function() { callback(fullFileName)});
            }
        },
        
        removeFile: function(fullFileName, callback){
            if(window.PalmSystem) {
                console.error("***** FileTreePlugin: removeFile");
                this._resultsCallbacks.push(callback);
		this.callPluginMethodDeferred(enyo.nop, "removeFile", fullFileName);
            }
            else {
                
                enyo.nextTick(this, function() { callback("sucess")});
            }
        },
        
        uploadFile: function(inUrl, inFile, callback){
            if(window.PalmSystem) {
                console.error("***** UploadFile: UploadFile");
                //this._resultsCallbacks.push(callback);
		this.callPluginMethodDeferred(enyo.nop, "getUpload", inUrl, inFile);
            }
            else {
                
                //enyo.nextTick(this, function() { callback("sucess")});
            }
            
        },
        
	getFiles: function(directory, pattern, callback) {
		if (window.PalmSystem) {
			console.error("***** FileTreePlugin: getFiles");
			this._resultsCallbacks.push(callback);
			this.callPluginMethodDeferred(enyo.nop, "getFiles", directory, pattern);
		}
		else {
			// if not on device, return mock data
			enyo.nextTick(this, function() { callback([
					{ type: "file", name: "doc.txt", size: 7684223, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "foobar.mp3", size: 1024000, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "README", size: 5097, date: "2009-06-06 12:00:00" },
					{ type: "directory", name: "data", date: "2009-06-06 13:15:30" },
					{ type: "directory", name: "My Documents", date: "2011-06-06 13:15:30" },
					{ type: "file", name: "doc.html", size: 7684223, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "foobar.mp3 2", size: 1024000, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "README 2", size: 5097, date: "2009-06-06 12:00:00" },
					{ type: "directory", name: "data 2", date: "2009-06-06 13:15:30" },
					{ type: "directory", name: "My Documents 2", date: "2011-06-06 13:15:30" },
					{ type: "file", name: "doc.txt 3", size: 7684223, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "foobar.mp3 3", size: 1024000, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "README 3", size: 5097, date: "2009-06-06 12:00:00" },
					{ type: "directory", name: "data 3", date: "2009-06-06 13:15:30" },
					{ type: "directory", name: "My Documents 3", date: "2011-06-06 13:15:30" },
					{ type: "file", name: "doc.txt 4", size: 7684223, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "foobar.mp3 4", size: 1024000, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "README 4", size: 5097, date: "2009-06-06 12:00:00" },
					{ type: "directory", name: "data 4", date: "2009-06-06 13:15:30" },
					{ type: "directory", name: "My Documents 4", date: "2011-06-06 13:15:30" },
					{ type: "file", name: "doc.txt 5", size: 7684223, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "foobar.mp3 5", size: 1024000, date: "2009-06-06 12:00:00" },
					{ type: "file", name: "README 5", size: 5097, date: "2009-06-06 12:00:00" },
					{ type: "directory", name: "data 5", date: "2009-06-06 13:15:30" },
					{ type: "directory", name: "My Documents 5", date: "2011-06-06 13:15:30" }
				]); });
		}
	}
});