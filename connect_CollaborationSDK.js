/*************************************************************************
*
*
* ADOBE SYSTEMS INCORPORATED
* Copyright 2015 Adobe Systems Incorporated
* All Rights Reserved.
*
* NOTICE:  Adobe permits you to use, modify, and distribute this file in 
* accordance with the terms of the Adobe license agreement accompanying it.  
* If you have received this file from a source other than Adobe, then your 
* use, modification, or distribution of it requires the prior written 
* permission of Adobe.
**************************************************************************/


// TODO: ABE: currently, a mobile client can't set syncMode

/**
 * Provides the bridge that allows HTML content inside of a custom pod to interact with the mobile application that provides functionality to permit the custom pod to initiate a connection between the HTML content and the application; to receive data (such as the initial configuration, recieve (and send) sync messages, to get 'caughtUp', to be notified about changes in the meeting, break out sessions and/or users.
 *
 * @module CollaborationSDK
 * @main
 */


/**
 * SyncConnector class acts as a bridge between Adobe Connect ActionScript and HTML5 Connect-aware content.  The CollaborationSDK.js file is the only file from the SDK that should be included in the production version of your application.
 *
 * @class SyncConnector
 * @constructor
 * @param $
 * @type {Object} SyncConnector module reference
 * @required
 */


try {
    
var CollaborationSDK = CollaborationSDK || {};
(CollaborationSDK.SyncConnector =
(function($) {
 "use strict";
    

 
/**************************************************************
*
* MODULE CONSTANTS
*
***************************************************************/

    
/**
 * Testing data for custom pod session
 *
 * @property defaultConfig 
 * @type Array
 * @private
 * @static
 */ 
    
    var _defaultConfig =
            {
         "accountId": 0,
         "archiveDuration": 0,
         "connectVersion": "0.0",
         "isAddin": false,
         "isArchive": false,
         "isBreakoutSession": false,
         "isCaughtUp": false,
         "isPointerOn": false,
         "isSecure": false,
         "isSynced": false,
         "isWhiteBoardOn": false,
         "language": "en",
         "playState": "stop",
         "podHeight": 560,
         "podID": 21,
         "podMinHeight": 560,
         "podMinWidth": 791,
         "podTitle": "Undefined Title",
         "podWidth": 791,
         "role": "participant",
         "roomSCOID": 0,
         "url": "https://defaulturl.adobeconnect.com/",
         "userID": 0,
         "userName": "undefined username",
                
          // private SC data, used with public state
          "userList": [],

          // private SC data, used with public methods
          "breakoutRoomsList": []
     };


/**
 * Test Configuration data when running in standalone -- this is automatically managed and is not intended to be accessed directly
 *
 * @property testConfig 
 * @type Array
 * @private
 * @static
 */ 
    
    var _testConfig =
            {
         "accountId": 295153,
         "archiveDuration": 0,
         "connectVersion": "9.3",
         "isAddin": false,
         "isArchive": false,
         "isBreakoutSession": false,
         "isCaughtUp": false,
         "isPointerOn": false,
         "isSecure": true,
         "isSynced": true,
         "isWhiteBoardOn": false,
         "language": "en",
         "playState": "stop",
         "podHeight": 560,
         "podID": 21,
         "podMinHeight": 560,
         "podMinWidth": 791,
         "podTitle": "BasicListSync.swf",
         "podWidth": 791,
         "role": "owner",
         "roomSCOID": 642829049,
         "url": "https://my.adobeconnect.com/zb",
         "userID": 9,
         "userName": "Zaphod Beeblebrox",
                      // private SC data, used with public state
                      "userList": [{"breakoutId": 1, "breakoutRoomName": "Breakout 1", "fullName":"Zaphod Beeblebrox", "id": 9, "name": "Zaphod Beeblebrox", "role": "owner", "status": []},
                      {"breakoutId": 0, "breakoutRoomName": null, "fullName":"Zaphod Beeblebrox 2", "id": 2, "name": "Zaphod Beeblebrox", "role": "owner", "status": []}],
                                 
                      // private SC data, used with public methods
                      "breakoutRoomsList": [{"id": 1, "name": "Breakout 1"}, {"id": 2, "name": "Breakout 2"}, {"id": 3, "name": "Breakout 3"}]
                      };

  
  /**
 * List of events that we want ActionScript to forward to JavaScript
 *
 * @property listeners
 * @type Array
 * @private
 * @static
 */
    
       var listeners ={"results": [{"method":"addEventListener","args":{"listeners":[
                           "caughtUp",
                           "playStateChanged",
                           "podClosed",
                           "podTitleChanged",
                            "pointerToggle",
                           "roleChanged",
                           "sizeChanged",
                           "syncComponentEvent",
                           "syncMessageReceived",
                           "syncModeChanged",
                           "userDetailsChanged",
                           "userJoined",
                           "userLeft",
                           "userStatusChanged",
                           "whiteBoardToggle"
    ]}}]};
   
    

/**
 * Possible UI states that the pod could be in:
 * 
 * STARTING: corresponds to isCaughtUp == false -- you SHOULD NOT send messages if in this state
 * LIVE: the pod can be seen and view is current, but touch events are intercepted
 * INTERACTIVE: pod is live, full-screen and interactive
 * PAUSED: a snapshot of the pod can be seen and is not interactive (required on mobile because nothing can overlay a live custom pod.
 * DORMANT: the pod can't be seen by the user, and is not interactive
 * CLOSED: the pod is scheduled for removal
 * 
 *
 * @property podStates
 * @type Object
 * @static
 */  
     
    $.podStates = {
        INACTIVE:"inactive",
        LIVE:"live",
        INTERACTIVE:"interactive",
        PAUSED:"paused",
        DORMANT:"dormant",
        CLOSED:"closed"
    };
 
    
    
/**
 * Log levels  (note only info and error are currently available
 * 
 * @property logLevels 
 * @type {String}
 * @static
 */    

    $.logLevels = { EMERGENCY:{level:0,label:"EMERGENCY"},
               LOG_ALERT:{level:1,label:"ALERT"},
               LOG_CRITICAL:{level:2,label:"CRITICAL"},
               LOG_ERROR:{level:3,label:"ERROR"},
                LOG_WARNING:{level:4,label:"WARNING"},
               LOG_NOTICE:{level:5,label:"NOTICE"},
                LOG_INFO:{level:6,label:"INFO"},
               LOG_DEBUG:{level:7,label:"DEBUG"}
              };
    



    
/**
 * List of events that a custom pod can subscribe to - so any attempt to register a callback to any event not on this list will be rejected.
 *
 * @property knownCallbacks
 * @type Array
 * @private
 * @static
 */
            $.knownCallbacks = [
            "init",
            "config",
            "update",
            "caughtUp",
            "playStateChanged",
            "podStateChanged",
            "podClosed",
            "podTitleChanged",
            "pointerToggle",
            "whiteBoardToggle",
            "roleChanged",
            "sizeChanged",
            "syncMessageReceived",
            "syncModeChanged",
            "userDetailsChanged",
            "userJoined",
            "userLeft",
            "userStatusChanged",
            "logs",
            "exception",
                "blocking",
                "unblocking",
                "all"
        ];


 

/**
 * enumerated role type for a person who has host authority
 *
 * @property HOST
 * @type enum
 * @static
 */
    $.HOST = "owner";
/**
 * enumerated role type for a person who can share conent and tailor the experience
 *
 * @property PRESENTER
 * @type enum
 * @static
 */
    $.PRESENTER = "presenter";
/**
 * enumerated role type for a person that can participant in the meeting but has no special permissions in that meeting
 *
 * @property PARTICIPANT
 * @type enum
 * @static
 */
    $.PARTICIPANT = "viewer"; 
  
/*
*************************************************************
*
* PRIVATE PROPERTIES
*
**************************************************************
*/
    var _ua = navigator.userAgent.toLowerCase();
    var _checker= {
        ios: _ua.match(/(iphone|ipod|ipad)/i),
        android: _ua.match(/android/i)
    };
    var _receivedPackets = [];
    var _lastPacketID=0;
    var _fakePacketID=0;
    var _packetID=1;
    var _dispatchInterval=10;
    var _reportingLevel;
    var _transactionTimer = 0;
    var _inTransaction=false;
    var _testTimer=0;
    
    var _deferDispatches=false;
    var _dispatchQueue=[];
    var _version = "9.5.005";
    var _callBackQueue = [];   
    var _forceStandalone=false;
    var _broadcastLog= false;
    var _blocking=false;

    var _isLocalHost = window.location.hostname == 'localhost';
    var _isfile = window.location.origin == 'file://';
    var _isMobile = window.navigator.userAgent.indexOf('Mobile')!=-1;
    var _validArgs = true;
    var _testCounter=0;
    var _resultQueue = [];
    var _userList=[];
 //   var _old_batch = undefined;
    var _packetsProcessed = []; // list of callbacks for pushNextResult
    var _comm_iframe;
    var _loading_anchor = "loading";
    var _useAlternateDispatchScheme = true;
    
    var _blockOnReady=false;
    var _blockOnReadyTimer=0;
/*
*************************************************************
*
* PUBLIC PROPERTIES
*
**************************************************************
*/ 
    
    
/**
 * The current state of recording playback. Possible values are stop, pause, and play.
 *
 * @property playState
 * @type {String}
 * @default "stop"
 */
    $.playState = "stop";
    
/**
 * A string that specifies the title of the pod containing the application.
 *
 * @property podTitle
 * @type {String}
 * @default ""
 */
    $.podTitle="";

/**
 * Current Pod State
 * 
 * @property podState 
 * @type {String}
 */  
    
    $.podState = $.podStates.INACTIVE;

/**
 * If true, the SDK has finished the caughtUp phase
 *
 * @property isCaughtUp
 * @type {Boolean}
 * @default false
 */

    $.isCaughtUp = false;

/**
 * Contains all of the configuration prameters
 *
 * @property configuration
 * @type {Object}
 * @default false
 */

    $.configuration = {};

/**
 * if true, this pod is not running in the Connect context
 *
 * @property standalone
 * @type {Boolean}
 * @default false
 */
    
    $.standalone=false;

/**
 * version of the Collaboration SDK
 *
 * @property SDKversion
 * @type {String}
 * @static
 */
    
    $.SDKversion=_version;

/**
 * Account ID of the current user
 *
 * @property accountId
 * @type {Number}
 */

    $.accountId = 0;
 
/**
 * Archive Duration (not supported at this time)
 *
 * @property archiveDuration
 * @type {Number}
 */
    $.archiveDuration = 0;
    
/**
 * Version of the Connect Server
 *
 * @property connectVersion
 * @type {String}
 */
    
    $.connectVersion = "0.0";
 
/**
 * Whether or not you're running in the add-in.  For mobile, will always be false
 *
 * @property isAddin
 * @type {Boolean}
 * @default false
 */
    
    $.isAddin = false;
 
/**
 * Is this an archive session
 *
 * @property isArchive
 * @type {Boolean}
 * @default false
 */
    $.isArchive = false;

/**
 * Is this a breakout session?
 *
 * @property isBreakoutSession
 * @type {Boolean}
 * @default false
 */
    $.isBreakoutSession=false;
    
/**
 * Is the pointer on?  (will always be false for release 2.4 
 *
 * @property isPointerOn
 * @type {Boolean}
 * @default false
 */  
    $.isPointerOn = false;
    
/**
 * Are we connected to the Connect server over a secure connection?
 *
 * @property isSecure
 * @type {Boolean}
 * @default false
 */
    
    $.isSecure = false;
    
/**
 * Are we sync'd with the host/presenter?  There is a bug in Mobile 2.4 where this is initially set correctly but then is not subsequently updated.
 *
 * @property isSynced
 * @type {Boolean}
 * @default false
 */
    $.isSynced = false;
    
/**
 * Is the whiteboard on?  Will always be false for Connect Mobile 2.4
 *
 * @property isWhiteBordOn
 * @type {Boolean}
 * @default false
 */
    
 

    $.isWhiteBoardOn = false;
    
/**
 * Two-letter standard abbrevation for the Language selected by the user
 *
 * @property language
 * @type {String}
 * @default "en"
 */
    
    $.language = "en";
    
/**
 * Height of the pod (in pixels).  Bug in Mobile 2.4, podHeight is initially set but is never updated.  So use window object in JavaScript to determine height or rely upon CSS.
 *
 * @property podHeight
 * @type {Number}
 */
    
    $.podHeight=560;
    
    
/**
 * Unique identifier for this pod
 *
 * @property podId
 * @type {Number}
 */
    $.podId=21;
 
/**
 * Mininum height for this pod. Bug in Mobile 2.4, podMinHeight is initially set but is never updated.  So use window object in JavaScript to determine height or rely upon CSS.
 *
 * @property podMinHeight
 * @type {Number}
 */
    $.podMinHeight = 560;
    
/**
 * Mininum width for this pod. Bug in Mobile 2.4, podMinWidth is initially set but is never updated.  So use window object in JavaScript to determine height or rely upon CSS.
 *
 * @property podMinWidth
 * @type {Number}
 */
    
    $.podMinWidth = 791;
 
/**
 * Width for this pod. Bug in Mobile 2.4, podWidth is initially set but is never updated.  So use window object in JavaScript to determine height or rely upon CSS.
 *
 * @property podWidth
 * @type {Number}
 */
    
    $.podWidth = 791;
/**
 * Role for this user (PARTICIPANT, PRESENTER or HOST)
 *
 * @property ROLE
 * @type {String}
 */   
    $.role = $.PARTICIPANT;
/**
 * The SCO ID of Adobe Connect meeting room.     
 *
 * @property roomSCOID
 * @type {Number}
 */   

    $.roomSCOID = 0;
    
 /**
 * URL of this Connect session     
 *
 * @property url
 * @type {String}
 */     
    $.url = "";
  /**
 * ID of the current user
 *
 * @property userID
 * @type {Number}
 */    
    $.userID = 0;
 /**
 * The name of the current user  
 *
 * @property userName
 * @type {String}
 */     
    $.userName = "undefined";

/**
 * Flag if the device is an iOS device  
 *
 * @property isIOS
 * @type {Boolean}
 */     
    $.isIOS = _checker.ios !=null;
    
/**
 * Flag if the device is an Android device  
 *
 * @property isAndroid
 * @type {Boolean}
 */ 
    $.isAndroid = _checker.android!=null;

    

/*
*************************************************************
*
* PRIVATE METHODS
*
**************************************************************
*/
    

      String.prototype.lpad = function(padString, length) {
            var str = this;
            while (str.length < length)
                str = padString + str;
            return str;
        }

        window.onerror = function (errorMsg, url, lineNumber)
        {
            try {
                
                    $.error("browser error: "+errorMsg+" on line "+lineNumber+" in "+url);
            }
            catch(err) {
            }
            finally {
                return false;
            }
        }
 
   
/**
 * records packet received
 *
 * @method logPacket
 * @private
 * @param {Number} packetID
 * @required
 */

        var logPacket = function(packetID) {
            _receivedPackets.push(packetID);
            if(packetID!=(_lastPacketID+1)) {
               $.error("packet sequence error: received packet "+packetID+" from AS but expected "+(_lastPacketID+1));
            }
            _lastPacketID=packetID;
        }
        
/**
 * When a specific event occurs, this method iterates over all of the registered callback events for that event, and calls the associated callback function(s)
 *
 * @method processCallbacks
 * @private
 * @param {String} key name of the event that callback objects have subscribed to
 * @param {Object} arg data object to be sent to the callback function
 */
    var processCallbacks=function(key, arg)
    {
        console.log("Came here 4");
        if($.knownCallbacks.indexOf(key) == -1 || key=='all' || key=='exception') {
           // console.log('unknown callback: '+key);
            $.error("attempting to process unkonwn callback: "+key);
            return;
        }
        if(_callBackQueue.hasOwnProperty(key))
        {
            var len=_callBackQueue[key].length;
            for (var i = 0; i <len; ++i)
            {
                if(arg != undefined) {
                    _callBackQueue[key][i](arg);
                } else {
                    _callBackQueue[key][i]();
                }
            }
        } else {
            var exception="exception";
            if(key=='podClosed') return; // no catchall for podClosed, sorry.
            if(_callBackQueue.hasOwnProperty(exception)) {
                var len = _callBackQueue[exception].length;
                for(var i=0;i<len;++i) {
                    _callBackQueue[exception][i](key,arg);
                }
            }
        }
        
        if(key=='logs') return;
        if(_callBackQueue.hasOwnProperty("all")) {
            var len = _callBackQueue["all"].length;
            for(var i=0;i<len;++i) {
                _callBackQueue["all"][i](key,arg);
            }
        }

    }
    
/**
 * When wanting to return data to ActionScript for the current Action all of the results will be bundled into a single JSON string and sent to the Connect application as one transaction <b>IMPORTANT</b> - only valid if called inside of a CollaborationSDK callback. Otherwise, it's not sent.  Consider using <b>dispatch</b> method instead.   <b>dispatch</b> is designed to send the message either in-band if in the midst of a transaction or out-of-band if sent spontaneously.
 *  {"results":[{"method":"addEventListener","arg":{"listeners":{"a","b","c"}}]}
 *
 * @method pushNextResult
 * @private
 * @param {String} method name that describes the information being sent
 * @param {Object} arg method-specific data object to be sent back to ActionScript
 */

    var pushNextResult = function(method, args,cb)
    {
        try {
            var dispatchMessage = {"method": method, "args": args,"packet":++_packetID,"cb":cb};
            if(method=='block') {
                _blocking = true;
                if($.standalone) 
                    processCallbacks('blocking');
            }
            if(cb) _packetsProcessed[_packetID] = cb;
            _resultQueue.push(dispatchMessage);
        } catch(e) {
            $.error("Error when attempting to pushNextResult: "+method+" ["+e+"]");
        }
    }
    

/**
 * Places the SDK into a communications mode where outbound communications are forced into a single reply structure
 *
 * @method startTransaction
 * @private
 * @param {String} transactionName
 */

      var startTransaction=function(transactionName) {
         _inTransaction = true;

          if(_transactionTimer>0) {
             clearTimeout(_transactionTimer);
            _transactionTimer = undefined;
          }
          
         _transactionTimer = setTimeout(function() {
             _transactionTimer=0;
             endTransaction(true);
         },12000);      
     }
    
/**
 * Ends a transaction
 *
 * @method endTransaction
 * @private
 * @param {Boolean} shouldForce if true sends an empty return packet to the application
 */
    var endTransaction=function(shouldForce) {
        _inTransaction = false;
        if(_transactionTimer>0) {
            clearTimeout(_transactionTimer); 
            _transactionTimer = 0;
        }
        if(!_blocking) {
            _releaseDispatches();
        }
                          
       if(shouldForce!==undefined && shouldForce==true && !$.standalone)
       {
               _communicate( "https://js_result/{}" );
       }
    }

    /**
 * Methods invoked via ActionScript should wrap their functionality in a call to this method (which means that custom pods should attempt to call it
 *
 * @method processActions
 * @private
 * @param {Function} actions worker function
 * @param {String} label corresponds with method name invoked by ActionScript
 * @param {Object} args method-specific data object to be forwarded to callbacks
 */
    var processActions=function(actions,label,args)
    {
        try {
            
            if(actions)
                actions();

            if(label=="caughtUp" || label=="config") {
                setTimeout(function() {processCallbacks(label,args);},2000);
            } else {
                processCallbacks(label,args);
            }

            var results = "{";
            if(_resultQueue.length > 0)
            {
                results += "\"results\": [";
                var len = _resultQueue.length;

                for(var i = 0; i < len; ++i)
                {
                    var result = _resultQueue.shift();

                                        
                    results += JSON.stringify(result);

                    if(i != (len - 1))
                        results += ',';
                }
                results += "]";
            } else {
                results+=  "\"results\": [{\"method\": \"none\"}]";
            }
            results += "}";
            _resultQueue = [];

       } catch (e) {
            alert("error "+e);
        } finally {
            if($.standalone) $.info(results,"js_results");
            else {
                _communicate("https://js_result/" + encodeURIComponent(results));
            }
            endTransaction();
       }

    }
    
 /**
 * low-level communication function that sends the dispatch via the communications iframe if available, otherwise, uses window.location
 *
 * @method _communicate
 * @private
 * @param {String} dispatch_string
 */
    var _communicate = $.communicate= function(s) {
        if($.standalone) {
            console.log(s);
        } else {
            console.log("coming here3");
            if(_comm_iframe) {
                _comm_iframe.src = s;
                console.log("coming here4");
            } else {
                console.log("coming here5");
                console.log(s);
                window.location = s;
            }
        }
    }


/**
 * return the user index if a valid userID is passed in
 *
 * @method findIndexInUserList
 * @private
 * @param {String} userID
 * @required
 * @return {Number} index
 */

    var findIndexInUserList=function(userID)
    {  
        var retVal = -1;
        if(userID!==undefined && _userList!==undefined) {
            for (var i = 0; i < _userList.length; i++)
            {
                if (_userList[i] && _userList[i].id == userID) {
                    retVal= i;
                    break;
                }
            }
        }
        
        return retVal;
    }

/**
 * Private Worker method to send dispatch and temporarily block the dispatch mechanism.  At this time only dispatchUserStatusChanged and dispatchSyncMessage use dispatch.  NOTE: in the future, the dispatch mechanism may be changed so that dispatches are automatically sent in-band (if in the midst of an application-initiated transaction) or out-of-band (if responding to a timer event or in response to a server event).
 *
 * @method _dispatch 
 * @private
 * @param {String} msg
 * @required
 */
    
var _dispatch =function(msg) { 

    var sm = "{\"results\": [";
    var packets = [];

    if(typeof msg === "object" && msg instanceof Array) { 
            var len = msg.length;
            for(var i=0;i<len;i++) {
                sm+=msg[i].sm;
                if(msg[i].block) _blocking=true;
                packets.push(msg[i].packet);
                if((i+1)<len)  sm+=',';
            } // for

        sm+= "]}";


        _deferDispatches=true;
        if($.standalone) {
             console.log('['+JSON.stringify(sm)+']');
             $.ack(packets);

        } else {
            _communicate("https://dispatch/"+       
                encodeURIComponent(sm));
        }
    }
}


/**
 * sends out the next dispatch (unless the queue is empty at which case it unblocks the dispatch mechanism 
 *
 * @method _releaseDispatches
 * @private
 */
function _releaseDispatches() {
    
    if(_blocking || _deferDispatches || _blockOnReady) return;
    var msg;
    var batch = new Array();

    var batchSize = 0;
    var _maxBatchSize = 4096;

    while(_dispatchQueue.length) {
        
        batchSize+=_dispatchQueue[0].sm.length;
        if(batch.length==0 || batchSize<_maxBatchSize) {
            batch.push(_dispatchQueue.shift());
        } else {
            batchSize-=_dispatchQueue[0].sm.length;
            break;
        }
    }
    if(batch.length>0) {

        _dispatch(batch);

    }

}


/**
 * sends out the next dispatch (unless the queue is empty in which case it unblocks the dispatch mechanism )
 *
 * @method _log
 * @private
 * @param {Number} level
 * @required
 * @param {String} msg
 * @required
 * @param {Object} qualifier an astract object primarily used in conjunction with ConnectDebugger class
 */
var _log=function(level,msg,qualifier) {
    try {
        if(level.level<=_reportingLevel) 
        {
            var logMessage ='{"results":"'+msg+'"}';
            var  logMessageURL='';
            var logEntry;

            if(_broadcastLog) 
            {
                var qualifiedObject;
                if(qualifier!==undefined) 
                {
                    qualifiedObject = {'name':qualifier,'data':msg};
                    logEntry = {"level":level,"msg":qualifiedObject};
                 } else {
                    logEntry = {"level":level,"msg":msg};
                 } // if qualifier
                processCallbacks("logs",logEntry);
            } // broadcasting
            if(!_broadcastLog) {
                if(typeof msg === "object") {
                    msg = JSON.stringify(msg||"");
                }
                if($.standalone)  console.log(level.label+': '+msg);
                else $.dispatch("log",level.label+': '+msg);
            } // ! broadcasting
        } // if level.level
    } catch(e) {
        alert("logging error: "+e);
    } // try
} // function log

/**
 * cleans up any registered callbacks (upon destroy)
 *
 * @method unregisterCallbacks
 * @private
 */
var unregisterCallbacks = function() {
    for(var k in _callBackQueue) {
        _callBackQueue[k] = undefined;
    }
    _broadcastLog = false;
}

/**
 * provides notification that blocking is active
 *
 * @method _blockConfirmed
 * @private
 */
var _blockConfirmed = function() {
    processCallbacks("blocking");
}

/**************************************************************
*
* PUBLIC METHODS
*
***************************************************************/
 

/**
 * returns the HTML element that corresponds to the loading anchor, which is how the ConnectDebugger knows where to inject its HTML as a fallback (and is also used to inject the communications iframe) 
 *
 * @method getLoadingElement
 * @return {element} loading_anchor
 */
    
    $.getLoadingElement = function() {
        return document.getElementById(_loading_anchor);
        
    }

    
/**
 * sends out the next dispatch (unless the queue is empty at which case it unblocks the dispatch mechanism 
 *
 * @method _releaseDispatches
 * @param {String} variable
 * @required
 * @return query variable
 */
    
$.getQueryVariable = function(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

/**
 * Specifies that the application should not forward any sync messages that match the specified msgName. A specific use case would be if you broad sync messages purely for the benefit of recording playback (desktop)
 *
 * @method ignoreSyncMessage
 * @param {String} msgNameToIgnore
 */

$.ignoreSyncMessage = function(name) {
    $.dispatch("ignore_syncMessage",{"msgName":name});
}



$.isBlocking = function() {
    return( _blocking   );
}


$.block = function() {
//    console.log('block');
    $.dispatch("block",null,_blockConfirmed);
}

$.unblock = function() {
    _blocking=false;
    _deferDispatches=false;
    _releaseDispatches();
    $.dispatch("unblock");
    processCallbacks("unblocking");

}

/**
 * NOTE: this _has_ to be public so that ActionScript can invoke -- but this not for customers to access.
 * This method is how ActionScript acknowledges receipt of JS packets
 *
 * @method ack
 * @param {String} packets_encoded
 * @required
 * @private
 */
$.ack = function(packets_json)
{
   var packetID ;
    var packets;
     if(typeof packets_json === 'string') {
        packets = JSON.parse(packets_json);
    } else if(typeof packets_json === 'object') {
        packets = packets_json;
    } else {
        $.error('invalid acknowledge data');
        return;
    }
    for(var i=0;i<packets.length;i++) {
        packetID = packets[i];
                console.log(packetID+"/"+_packetID);
        if(typeof packetID === 'number') {
            var cb = _packetsProcessed[packetID];
            if(typeof cb === 'function') {
                cb();
              }
        }
    }
    
    if(packetID>=_packetID) {console.log('releasing...');_deferDispatches = false;_releaseDispatches();}
}

/**
 * NOTE: this _has_ to be public so that ActionScript can invoke -- but this is not for customers to access.
 *
 * @method invoke
 * @param {String} method
 * @required
 * @param {Number} packetID
 * @required
 * @param {Object} args
 * @private
 */
$.invoke = function(method, packetID, args)
{
    console.log("invoke1");
    logPacket(packetID);
    startTransaction(method);
    console.log("invoke2");
    _resultQueue = [];

    var json = "";
    if(args && args.length>0){
        console.log("invoke3");
        args = args.replace(/&#39;/g, "'");
        var decoded = decodeURIComponent(args).replace(/&#34;/g, "\"").replace(/@zysjpngd87!/g, '\\"');
        console.log("invoke4");
        try {
            if(decoded!==undefined && typeof(decoded=="String" && decoded.length>0)) {
                json = JSON.parse(decoded);
            } else $.log ("CONTENT empty for invocation of "+method);

        } catch(e) {
            $.error("Error parsing JSON from: " +method+' ['+ decoded+']');
        }
    }
    try {
        console.log("invoke5");
       $[method](json?json:null);
    } catch(e) {
        $.error("Error invoking method "+method+' --> '+e+' '+e.stack);
        console.log("Error invoking method "+method+' --> '+e+' '+e.stack);
    }
    console.log("invoke6");

};



/**
 * Utility function used by the automator.js class -- is used to simulate 'sysem events' for simulation/automated-testing/prototyping purposes
 *
 * @method getAutomatorMethod
 * @return {Function} processCallbacks
 */
$.getAutomatorMethod = function() {
    return processCallbacks;
    }
    
    
/**
 * Bridge function that allows application to set the custom pod's configuration.  You should not call this method directly.
 *
 * @method config
 * @private
 * @param {Object} scArgs
 * @required
 */
 
$.config = function(scArgs)
{

console.log("came here1");
    for(var key in scArgs)
    {
        $[key] = scArgs[key];
    }
    console.log("came here2");
    processCallbacks("config",scArgs);
    console.log("came here4");
    
    processCallbacks("syncModeChanged",$.isSynced);
    
}

/**
 * get the current configuration
 *
 * @method getConfig
 * @returns {object} configuration 
 */

$.getConfig = function() {
    var c = 
        {
    accountId:$.accountId,
    /* reserved for future use
    archiveDuration:$.archiveDuration,
    */
    isAddin:false,
    isArchive:false,
    isBreakOutSession:$.isBreakoutSession,
    isCaughtUp:$.isCaughtUp,
    isPointerOn:$.isPointerOn,
    isSecure:$.isSecure,
    isWhiteBoardOn:$.isWhiteBoardOn,
    language:$.language,
    /* reserved for future use
    playState:$.playState,
    */
    podHeight:window.innerHeight,
    podID:$.podID,
    /* the following two properties are meaningless
    podMinHeight:$.podMinHeight,
    podMinWidth:$.podMinWidth,
    */
    podTitle:$.podTitle,
    podWidth:window.innerWidth,
    role:$.role,
    roomSCOID:$.roomSCOID,
    url:$.url,
    userID:$.userID,
    userName:$.userName
        };
    
    return c;
}
 
/**
 * Determines whether only the most critical log messages (currently, that is <b>error</b> or whether the log is more verbose as it also includes <b>info</b> calls.
 *       $.setLogLevel($.logLevels.LOG_ERROR);
 *
 * @method setLogLevel
 * @param {Number} level
 * @required
 * @return {Boolean} success flag
 */

$.setLogLevel=function(level) {
    var retVal = false;
    for(var i in $.logLevels) {
        if($.logLevels[i].level==level.level) {
            _reportingLevel = level.level;
 //TODO: look for a safe way to reenable this early on in the initialization process, without blocking initialization           //$.dispatch("setReportingLevel",level.level);
            retVal = true;
            break;
        }
    }
    return retVal;
}

/**
 * Entry point for the Adobe Connect HTML Collaboration SDK.  Call this method immediately (and most certainly before you initialize your framework or application).  If you don't provide a config callback handler, the CollaborationSDK won't connect to the Connect session.  In that callback handler, you want to make sure to initialize your application/framework and register for other callbacks of interest (not the least of which is 'caughtUp').
 
 * By default, the expectation is that there will be a top-level HTML element in the body tag called 'loading'.  The Collaboration SDK needs an injection point for its HTML objects -- so if get rid of the loading tag, you would supply the name of another tag which could they be used as an anchor.
 *
 * @method init
 * @param {Function} configCallback callback handler that gets called once the CollaborationSDK has initialized.
 * @required
 * @param {String} customPodID unique identifier of this custom pod: e.g. com.esynctraining.anonymouschat
 * @required
  * @param {String} customPodVersion version number of the custom pod x.x.xxx
  * @required
  * @param {String} anchor name of the div tag in HTML to attach to.
  * @default "loading"
  * @optional
*/
 
$.init= function(configCallback,customPodID,customPodVersion,anchor)
{
    var _validArgs=true;
    console.log("coming here")
    if(typeof anchor==='string') {
        _loading_anchor = anchor;
    }
    
    if(customPodID===undefined || customPodID.length<=0) {
        _validArgs = false;
    }
    
    if(customPodVersion===undefined || customPodVersion.length<6) {
        _validArgs = false;
    }
    
    if(!_validArgs) {
           alert("customPodID and customPodVersion are required parameters for init()");
            $ = undefined;
            return;
    }
    

   var loading=document.getElementById(_loading_anchor);

/* not using the iframe trick for now
    because it is somehow part of the 
    interference that prevents 
    _sc.ready() from being called correctly.
*/
/*  if($.isIOS &&loading) {
        _comm_iframe=document.createElement('iframe');
        loading.appendChild(_comm_iframe);
    }
*/
    $.registerCallbacks({"config":configCallback});

    if($.standalone) {
      console.log("in standalone mode, going to call config");
        var encodedConfig = encodeURIComponent(JSON.stringify ( _testConfig));
        $.invoke('config',++_fakePacketID, encodedConfig);   
    } else {
        var  initMessageURL="https://init/"+encodeURIComponent("{\"customPodID\":\""+customPodID+"\",\"customPodVersion\":\""+customPodVersion+"\"}");
        //window.location
        _communicate(initMessageURL);
     }
     console.log("coming here 2")
}
 

     
  
/**
 *High-level method to send a sync message to the Connect application.
 *
 * @method dispatch
 * @param {String} methodName a name that should be already known to the Connect Mobile Application (such as 'log')
 * @param {Object} args
 * @required
 * @param {Function} cb callback handler once this dispatch has been sent
 * @optional
 */
     
     
$.dispatch = function(methodName,args,cb) {
    console.log('dispatch.defer = '+_deferDispatches);
    if(_inTransaction) {
        pushNextResult(methodName,args,cb); 
    } else {
         var data = {"method":methodName,"args":args,"packet":++_packetID,"cb":cb};
        if(cb) {
            _packetsProcessed[_packetID] = cb;
        }
        var sm = JSON.stringify(data);
        data.sm = sm;
        if(methodName=="block") {
            data.block=true;
        } else data.block=false;
        _dispatchQueue.push( data);

        if(!_blocking && !_deferDispatches && !_blockOnReady) {
           _releaseDispatches();
        }
    }

}


    $.useAlternateDispatchScheme = function(flag) {
        _useAlternateDispatchScheme = flag ? true: false;
    }

 
/**
 * Method to send a sync message to other participants
 * IMPORTANT: there is a bug in the current implementation.  As of Connect mobile 2.4.10, sync messages will not be dispatched until p_msgName and p_msgValue are the property names used.  After this version, sync messages will also be sent if p_msgNm and p_msgVal are used.  The reason why is that desktop custom pods are expecting p_msgNm and p_msgVal.  So if you want the dispatch messages to be sent, and you are concerned that the user might not have a more current version, then call CollaborationSDK.SyncConnector.useAlternateDispatchScheme(true);
 *
 * @method dispatchSyncMessage
 * @param {String} msgName name of the message to be sent -- should be meaningful to the pod running on other participant's machines
 * @param {Object} msgValue the contents of the message to be sent, the format to be determined by your own custom pod
 * @param {Boolean} isDelta if true, then all of the events matching this message name will be sent to new particpants. If false, then only the last known event will be sent.
 * @param {Boolean} echoBack if true, then this instance of the custom pod will receive a corresponding sync message back, otherwise only the other participants will receive this message.
 */
 
        $.dispatchSyncMessage = function(msgName, msgValue, isDelta, echoBack)
        {
            echoBack = typeof echoBack == 'undefined' ? false : echoBack;
            
            if(_useAlternateDispatchScheme) 
             $.dispatch("dispatchSyncMessage",{"p_msgName": msgName, "p_msgValue": msgValue, "p_isDelta": isDelta, "p_echoBack": echoBack});
            else
             $.dispatch("dispatchSyncMessage",{"p_msgNm": msgName, "p_msgVal": msgValue, "p_isDelta": isDelta, "p_echoBack": echoBack});
        }

        $.dispatchUserStatusChanged = function(id, status)
        {
            dispatch("dispatchUserStatusChanged", {"userId": id, "status": status});
        }


    $.requestPodState = function(newState) {
        switch(newState) {
            case $.podStates.INTERACTIVE:
                if($.podState==$.podStates.LIVE) { 
                    $.setPodState(newState);
                    $.dispatch('requestPodState',{"newPodState":newState});
 
                }
                break;
        } // switch
    } // $.requestPodState
    
    $.set_broadcastLog = function(isBroadcast) {
     //   console.log('set_broadcastLog '+isBroadcast);
        _broadcastLog =isBroadcast;
    }
    

/**
 * Method to create a log entry (that gets deposited into device's console log).  However, I recommend that you either use info() or error() -- those are the only two specific logging methods that are implemented at this time.
 *
 * @method log
 * @param {String} msg the text to place in the log
 * @required
 * @param {Object} qualifier used primarily to support the ConnectDebugger/DataExplorer
 */
    $.log=$.info = function(msg,qualifier)
 {
    _log($.logLevels.LOG_INFO, msg,qualifier);
 }

/**
 * return the current logging level
 *
 * @method getLogLevel
 * @return {Number} current logging level
 */ 

$.getLogLevel = function() {
    return _reportingLevel>0?_reportingLevel:0;
}
 
/**
 * attempts a soft recovery from communication-related issues
 *
 * @method error
 * @param {String} msg the text to place in the log
 */ 

$.error = function(msg) {
    if(_inTransaction) endTransaction(true);
    _log($.logLevels.LOG_ERROR,msg);
}


/**
 * These methods comprise the ActionScript-facing bridge interface -- please do not use these methods as they are unsupported and will break in the next release of Connect Mobile.
 *
 */

/**
 * Update this client's configuration, overriding them if a comparable key is passed in scArgs
 * @method update
 * @private
 * @param {Object} scArgs
 */
    $.update = function(scArgs)
    {
        processActions(function(){
                    var keys = Object.keys(scArgs);
        for(var i = 0; i < keys.length; i++)
        {
            // delete any existing version of the matching property
            if($.hasOwnProperty('_' + keys[i]))
                delete $[keys[i]];
            
            $[keys[i]] = scArgs[keys[i]];
        }

        },"update",scArgs);
    }
    
    // event listeners

/**
 * Bridge method that indicates that the caughtUp phase is complete, but also is an indication that it is now safe to send messages more freely to the Connect application.  You should not call this method directly.
 *
 * @method caughtUp
 * @private
 */
    $.caughtUp = function()
    {
        processActions(function(){
                                 
            $.isCaughtUp= true;
            $.setPodState($.podStates.LIVE);
                                 
        },"caughtUp");

    }
 
    /**
 * Helper method that indicates whether the specified value exists in the specified object.
 *
 * @method valueIn
 * @private
 * @param {Object} v
 * @required
 * @param {Object} obj
 * @return {Bolean} true if the value exists
 */
    function valueIn(v,obj) {
        for(var k in obj) {
            if(obj[k]==v)
                return true;
        }
        return false;
            
    }
                
    $.setPodState = function(state) {
        if(valueIn(state,$.podStates)) {
            $.podState = state;
            /*if(state==$.podStates.LIVE) {
                window.addEventListener('click',function goInteractive(e) {e.preventDefault();$.requestPodState($.podStates.INTERACTIVE);window.removeEventListener('click',goInteractive);return false;},true);
            } // if state*/
            processCallbacks('podStateChanged',state);
            $.info('setPodState set to '+state);
        } else $.error('pod state ['+state+"] unknown");
    } //setPodState
/**
 * TODO: DEFINE THIS
 *
 * @method playStateChanged
 * @private
 * @param {Object} event
 */ 
    $.playStateChanged = function(event)
    {
        processActions(function(){
            $.playState = event.playState;
        },'playStateChanged',event);
    }
    
/**
 * Bridge method that notifies this custom pod is being closed (terminated).  You should not call this method directly.
 *
 * @method podClosed
 * @private
 * @param {Object} event
 * @required
 */ 
    
    $.podClosed = function(event)
    {
        $.setPodState($.podStates.CLOSED);
        processActions(function(){
            pushNextResult("podClosed", null);
        },'podClosed');
        unregisterCallbacks();
    }
    
/**
 * Bridge method that notifies that the text in the title bar of this pod has changed
 *
 * @method podTitleChanged
 * @private
 * @param {Object} event
 * @required
 */ 
    $.podTitleChanged = function(event)
    {
        processActions(function(){
            $.podTitle = event.podTitle;
        },'podTitleChanged',event);
    }
    
/**
 * Bridge method that indicates whether or not the pointer is on
 *
 * @method pointerToggle
 * @private
 * @param {Object} event
 * @required
 */ 
    $.pointerToggle = function(event)
    {
        processActions(function(){
            $.isPointerOn = event.isPointerOn;
        },'pointerToggle',event);
    }
    
/**
 * RESERVED FOR FUTURE USE - Bridge method that indicates whether or not the pointer is on
 *
 * @method whiteBoardToggle
 * @private
 * @param {Object} event
 * @required
 */ 
    $.whiteBoardToggle = function(event)
    {
        processActions(function(){
            $.isWhiteBoardOn = event.isWhiteBoardOn;
        },'whiteBoardToggle',event);
    }
    
/**
 * Bridge method to notify that a user's role has changed
 *
 * @method roleChanged
 * @private
 * @param {Object} event
 * @requried
 */ 
    $.roleChanged = function(event)
    {
        processActions(function(){
            var id = event.userID;
        
        // if current user role has changed update it
        if (id == $.userID)
            $.role = event.newRole;
    
        var idx = findIndexInUserList(id);
        if(idx >= 0)
        {
            _userList[idx].role = event.newRole;
        }
        },'roleChanged',event);
            $.userList = _userList;
    }
    
/**
 * RESERVED FOR FUTURE USE -- don't rely upon this mechanism -- I recommend using CSS to adjust sizing.
 *
 * @method sizeChanged
 * @private
 * @param {Object} event
 */ 
    $.sizeChanged = function(event)
    {
        processActions(function(){
            $.podWidth = event.data.width;
        $.podHeight = event.data.height;
        },'sizeChanged',event);
    }
    
    
/**
 * TODO: DEFINE THIS
 *
 * @method syncMessageReceived
 * @private
 * @param {Object} event
 */ 
    $.syncMessageReceived = function(event)
    {
    
        processActions(function(){
           // $.info("syncMessageReceived");
        },'syncMessageReceived',event);
    }
    
/**
 * TODO: DEFINE THIS
 *
 * @method syncModeChanged
 * @private
 * @param {Object} event
 */ 
    $.syncModeChanged = function(event)
    {
        processActions(function(){
            $.isSynced = event.isSynced;
        },'syncModeChanged',event);
    }
    
/**
 * Either the userName, user.name and/or user.fullName has changed.
 *
 * @method userDetailsChanged
 * @private
 * @param {Object} event
 */ 
    $.userDetailsChanged = function(event)
    {
        processActions(function(){

        var id = event.userId;
        
        // if current user name has changed update it
        if (id == $.userID)
            $.userName = event.name;
        
        var idx = findIndexInUserList(id);
        if(idx >= 0)
        {
            var user = _userList[idx];
            user.name = event.name;
            user.fullName = event.fullName;

        }   
        },'userDetailsChanged',event);
            $.userList = _userList;
    }
    
/**
 * A user joined this meeting (updates that user's role, based on userID)
 *
 * @method userJoined
 * @private
 * @param {Object} event
 */ 
    $.userJoined = function(event)
    {
        processActions(function(){
            switch(event.user.role) {
                    case 1:
                        event.user.role=$.PARTICIPANT;
                        break;
                    case 7:
                        event.user.role=$.HOST;
                        break;
                default:
                        event.user.role=$.PRESENTER;
                        break;
            }
            _userList[event.userID] = event.user;
            
        },'userJoined',event);
            $.userList = _userList;
    }


    /**
 * User left this meeting, so removing user that matchds the event.userID
 *
 * @method userLeft
 * @private
 * @param {Object} event
 */ 
    $.userLeft = function(event)
    {
        processActions(function(){
        var idx = findIndexInUserList(event.userID);
        if(idx >= 0)
            _userList.splice(idx, 1);
        },'userLeft',event);
            $.userList = _userList;
    }
    
/**
 * user.status can be one of several values
        STATUS_STEPPED_AWAY= 100;
        STATUS_RAISED_HAND = 1;
        STATUS_AGREE = 40;
        STATUS_DISAGREE= 30;
        STATUS_SPEAK_LOUDER = 80;
        STATUS_SPEAK_SOFTER= 70;
        STATUS_SPEED_UP= 60;
        STATUS_SLOW_DOWN= 50;
        STATUS_LAUGHTER= 10;
        STATUS_APPLAUSE= 20;
        STATUS_CLEAR:uint = 0;
 *
 * @method userStatusChanged
 * @private
 * @param {Object} event
 */ 
    $.userStatusChanged = function(event)
    {
        processActions(function(){
        /*
            Note: Yes, id from event is "userId" in this case vs. "userID". This matches public SC
            documentation, and ActionScript side (and Connect server impl.). Even though I suspect
            this mismatch was a mistake from the start...
        */
        
            var id = event.userId;
              var idx = findIndexInUserList(id);
            if(idx >= 0)
            {
             _userList[idx].status = event.status;
//          cpu.trace("SyncConnector.userStatusChanged:: userId - " + id + ", status - " + JSON.stringify(SyncConnector.userList[idx].status));
            }
        },'userStatusChanged',event);
            $.userList = _userList;
    }
    

/**
 * Call this method after you have loaded and initialized your framework and application.  This will notify the Adobe Connect mobile application that you are ready to enter the catch-up phase.
 *
 * @method ready
 */ 

    $.ready = function() {
  //           alert("ready()");
        if($.standalone) { 
            //$.info('ready!'); 
           $.caughtUp(); 
        } else {
            endTransaction();
            var  initMessageURL="https://ready/"+encodeURIComponent(JSON.stringify(listeners));
           // window.location=

            _blockOnReady = true;
            _blockOnReadyTimer = setTimeout(function() {_blockOnReadyTimer=0;_blockOnReady=false;_releaseDispatches();},2000);
                _communicate(initMessageURL);
        }

    }

    


/**
 * This method allows you to register callback function for Adobe Connect-related events.  Even though the implementation is callbacks rather than event listeners, the events listed in this documentation will give you insight into the event and the data that it records.
 *
 * @method registerCallback
 * @param {String} key the name of the callback to register to: init, config, update, caughtUp, playStateChanged,podClosed,podTitleChanged,pointerToggle,whiteBoardToggle,roleChanged,sizeChanged,syncMessageReceived, syncModeChanged, userDetailsChanged, userJoined, userLeft, userStatusChanged
 * @param {Function} value a reference to the callback function
 */ 
    $.registerCallback = function(key,value) {
        var retVal = false;
        if($.knownCallbacks.indexOf(key) > -1)
        {
            if(!_callBackQueue.hasOwnProperty(key))
                _callBackQueue[key] = [];
            
            _callBackQueue[key].push(value);
            retVal = true;
            if(key=="logs") {
                _broadcastLog=true;
            }
        } else {
            $.error("Attempt to register an unknown callback: "+key);
        }
        return retVal;
    }
    
/**
 * This method allows you to register multiple callback functions for Adobe Connect-related events.  Even though the implementation is callbacks rather than event listeners, the events listed in this documentation will give you insight into the event and the data that it records.
 *
 * @method registerCallbacks
 * @param {Array} callbacks list of key/value pair object literals to register (via registerCallback)
 */ 
     $.registerCallbacks = function(callbacks)
    {
        for (var k in callbacks)
        {
            if(callbacks.hasOwnProperty(k))
                $.registerCallback(k, callbacks[k]);
        }
     }
     
     
 
    /******** 
    * POD-CALLABLE FUNCTIONS
    */
    
/**
 * This method specifies whether participants can publish data corresponding to msgName
 *
 * @method allowParticipantPublish
 * @param {String} msgName the name associated with sync messages that participants can (or can not) send.
 * @param {Boolean} [allow=false] if true, participants can send correspond sync messages, otherwise they can not.
 */ 
 
    $.allowParticipantPublish = function(msgName, allow)
    {
;
        $.dispatch("allowParticipantPublish", {"p_msgName": msgName, "p_allow": allow? allow: false});
    }

/**
 * This method specifies whether or not the pod should be visible
 *
 * @method podVisible
 * @param {Boolean} [visible=false] TODO: research consequences of podVisible
 */     
    $.podVisible = function(visible)
    {
        $.dispatch("podVisible", {"podVisible": visible?visible:false});
    }
    

/**
 * This method whitelists the specified URL fragment to enables iframes.  So for example, for embedding the YouTube , you would want to call sc.whitelist('www.youtube.com/embed/'); or even better sc.whitelist('www.youtube.com/embed/M7lc1UVf-VE');  The whitelist is purged any time thatthe pod is deactivated so you don't need to worry about de-whitelisting.
 *
 * @method whitelist
 * @param (String) urlFragment the longest fragment possible that will work with the content being loaded into an iframe.
 * @required
 * @param {Function} callbackHandler method to call once the dispatch has been sent
 * @optional
 */     
    $.whitelist = function(urlFragment,callbackHandler)
    {
        $.info("adding "+urlFragment+" to whitelist");
        $.dispatch("whitelist_domain", {'domain':urlFragment},callbackHandler);
    }

    
/**
 * This method will launch URL in browser window 
 *
 * @method launchURL
 * @param (String) url the URL of the HTML page to display in broswser app
 * @required
 */     
    $.launchURL = function(url)
    {
        $.info("launching "+url);
        $.dispatch("launch_url", {'url':url});
    }

    
/**
 * This method will return a user data object, assuming that the user is a host and that a valid UserID is provided
 *
 * @method getUserDetails
 * @param {string} userID ID of the user
 * @return {Object} user data object
 */ 
    $.getUserDetails = function(userID)
    {
        if ($.role != $.HOST)
            return null;
        
        var idx = findIndexInUserList(userID);
        return (idx >= 0 ? _userList[idx] : null);
    }
    
/**
 * This method will return a user data object for the current user
 * @method getMyUserDetails
 * @return {Object} user data object
 */ 
    $.getMyUserDetails = function()
    {
        if($.userID==undefined) throw("userID is undefined, data access issue?");
        var idx = findIndexInUserList($.userID);
        return (idx >= 0 ? _userList[idx] : null);
    }
    
/**
 * This method will return a list of the session's breakout rooms
 * @method getBreakoutRoomsList
 * @return {Array} list of breakout rooms
 */ 
    
    $.getBreakoutRoomsList = function()
    {
        if ($.role != $.HOST)
            return null;
        
        return $.breakoutRoomsList;
    }

/**
 * This method will return detail information for the specified breakout room
 * @method getBreakoutRoomDetails
 * @param {String} breakoutId
 * @return {Object} detailed data object for breakout room (or <b>null</b> if not found)
 */ 
    $.getBreakoutRoomDetails = function(breakoutId)
    {
        var breakouts = $.getBreakoutRoomsList();
        if(!breakouts)
            return null;

        for (var i = 0; i < breakouts.length; i++)
        {
            if (breakouts[i].id == breakoutId)
                return breakouts[i];
        }
        
        return null;
    }

/**
 * This method will return detail information for the current user's breakout session
 * @method getMyBreakoutRoomDetails
 * @return {Object} detailed data object for breakout room (or <b>null</b> if not found)
 */ 
    $.getMyBreakoutRoomDetails = function()
    {
        if(!$.breakoutRoomsList)
            return null;
            
        var idx = findIndexInUserList($.userID);
        if(idx < 0)
            return null;
            
        var breakoutId = _userList[idx].breakoutId;
        for (var i = 0; i < $.breakoutRoomsList.length; i++)
        {
            if ($.breakoutRoomsList[i].id == breakoutId)
                return $.breakoutRoomsList[i];
        }
        
        return null;
    }

            // TODO: this doesn't cover the desktop Adobe AIR use case
    if (((_isLocalHost || _isfile) && !_isMobile) || _forceStandalone) {
        $.standalone = true;
    } else {
        $.standalone=false;
    }
    
    
    
 return($);
    
})(CollaborationSDK.SyncConnector|| {}))
//CollaborationSDK.SyncConnector.test();


} catch(e) {window.alert("SyncConnector error: "+e);}

/**
 * Dispatch object
 * @class DispatchObject
 */

/**
 * @property methodName
 * @type String
 */

/**
 * @property args
 * @type Object
 */

/**
 * @property packet
 * @type Number
 */

/**
 * @property sm
 * @type String
 */

/**
 * The workhorse of the CollaborationSDK: the SyncMessageReceived is a 
 * notification from another pod (or yourself if echo is on) about new data.
 * @event SyncMessageReceived
 * @param {object} syncMessage
 * @param {string} syncMessage.p_msgNm - name of the sync message
 * @param {object} syncMessage.p_msgVal - the data being passed
 */