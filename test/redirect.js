 //var references = require('./v1_0_3/references.json');

function getXapiReference(title){
    var regExp = /\(([^)]+)\)/g; //pattern matching for opened and closed parentheses
    var matches = title.match(regExp);
    if (matches === null)
      return "";
    var str = matches[matches.length-1];
    str = str.substring(1, str.length - 1); // gets rid of parenthesis
    return str;
}


 function generateXapiSpecURL(refId){
   var XapiURL = 'https://github.com/adlnet/xAPI-Spec/blob/1.0.3/xAPI-';
   $.getJSON("/references.json",function(references){
     if (references[refId]){
       XapiURL += references[refId];
     }

     else {
       XapiURL += '-About.md#partone';
     }

     console.log(XapiURL);
   })

return XapiURL;
}

// module.exports = {
//
//     /**
//     * Redirects reference to XApi Spec[1.0.3] using Anchor point within URL
//     * @returns {String}
//     */
//     generateXapiSpecURL : function(refId){
//       var XapiURL = 'https://github.com/adlnet/xAPI-Spec/blob/1.0.3/xAPI-';
//       if (references[refId])
//           XapiURL += references[refId];
//       else {
//         XapiURL += '-About.md#partone';
//       }
//
//       console.log(XapiURL);
//       return XapiURL;
//     },
//
//     /**
//     * Uses pattern matching to take the reference from the last pair of parenthesis within the title
//     * @returns {String}
//     */
//     getXapiReference : function(title){
//       var regExp = /\(([^)]+)\)/g; //pattern matching for opened and closed parentheses
//       var matches = title.match(regExp);
//       var str = matches[matches.length-1];
//       str = str.substring(1, str.length - 1); // gets rid of parenthesis
//       console.log(str);
//       return str;
//     }
// }
