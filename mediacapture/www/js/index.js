/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    mediaRec: null,
    src: null,
    mediaRecFile: null,
    mediaPlay: null,
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        app.receivedEvent('deviceready');

        document.getElementById('file-system-access').addEventListener('click',     app.accessFileSystem);
        document.getElementById('media-record').addEventListener('click',           app.recordAudio);
        document.getElementById('stop-media-record').addEventListener('click',      app.stopRecordAudio);
        document.getElementById('play-media-record').addEventListener('click',      app.playMediaRecord);
        
    },

    recordAudio: function(evt){
        console.log('start record');
        
        var onSuccessullyRecorded = function() {
            
            console.log("recordAudio():Audio Success");
            
        };
        
        var onRecordError = function(err) {
            
            console.log("recordAudio():Audio Error: " + err.code);
            
        };
        
        app.mediaRec = new Media(app.mediaRecFile, onSuccessullyRecorded, onRecordError);

        // Record audio
        app.mediaRec.startRecord();
        
        console.log('record should have happened');

    },

    stopRecordAudio: function(evt){
    
      app.mediaRec.stopRecord();
    console.log('stop record happened');
                     
    },

    playMediaRecord: function(evt){
    
        app.mediaPlay = new Media(app.mediaRecFilePath, function() {
            console.log("play():Audio Success");
          },
          function(err) {
            console.log("play():Audio Error: " + err.code);
       });

       // Play audio
       app.mediaPlay.play();

    },

    accessFileSystem: function (evt){
      
      window.requestFileSystem(LocalFileSystem.TEMPORARY, 19000000, function(fileSystem){
                               
                                    console.log('We got access to the PERSISTENT file system' + fileSystem.root);
                                    console.log('Eventually this is ', this);
                               
                                    if(window.device.platform === 'iOS'){
                               
                                        app.mediaRecFile = /*fileSystem.root.fullPath +*/ 'myrecording.wav';
                               
                                    }else{
                               
                                        app.mediaRecFile = 'myrecording.mp3';
                               
                                    }
                               
                                    fileSystem.root.getFile(app.mediaRecFile,
                                                       {create: true, exclusive: false },
                                                       app.onGetFile, function(error){
                                                       
                                                        console.log("I cannot access the file system", error);
                                                       
                                                       });
                               
                                 
                                 }, function(error) {
                               
                                    console.log("***test: failed in creating media file in requestFileSystem");
                               
                               });


      
                        
    },

    onSuccessFileSystem: function(fileSystem){
      
        console.log('File system access succes', fileSystem)
    
    },
    
    onGetFile: function(file){
        
        console.log('onGetFile', file)
        app.mediaRecFilePath = file.fullPath;
      
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
