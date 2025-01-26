(self["webpackChunk"] = self["webpackChunk"] || []).push([["script"],{

/***/ "./assets/script.js":
/*!**************************!*\
  !*** ./assets/script.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
__webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
__webpack_require__(/*! core-js/modules/web.url.js */ "./node_modules/core-js/modules/web.url.js");
__webpack_require__(/*! core-js/modules/web.url.to-json.js */ "./node_modules/core-js/modules/web.url.to-json.js");
__webpack_require__(/*! core-js/modules/web.url-search-params.js */ "./node_modules/core-js/modules/web.url-search-params.js");
__webpack_require__(/*! core-js/modules/web.url-search-params.delete.js */ "./node_modules/core-js/modules/web.url-search-params.delete.js");
__webpack_require__(/*! core-js/modules/web.url-search-params.has.js */ "./node_modules/core-js/modules/web.url-search-params.has.js");
__webpack_require__(/*! core-js/modules/web.url-search-params.size.js */ "./node_modules/core-js/modules/web.url-search-params.size.js");
var closingBtn = document.getElementById('closingBtn');
if (closingBtn) {
  closingBtn.addEventListener('click', function (e) {
    document.getElementById('alert-box').classList.add('invisible');
  });
}

/* #########################
    Searchbar XML Request
######################### */
if (document.getElementById('unpin-user')) {
  document.getElementById('unpin-user').addEventListener('click', function () {
    function removeParam(key, sourceURL) {
      var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
      if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
          param = params_arr[i].split("=")[0];
          if (param === key) {
            params_arr.splice(i, 1);
          }
        }
        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
      }
      return rtn;
    }
    var originalURL = window.location.href;
    var alteredURL = removeParam("user", originalURL);
    window.location.href = alteredURL;
  });
}

/* #########################
    Searchbar XML Request
######################### */
function searchUsers(searchTerm) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/search/users', true);
  xhr.setRequestHeader('Content-Type', 'application/xml');
  xhr.onload = function () {
    if (xhr.status === 200) {
      var users = JSON.parse(xhr.responseText);
      var resultsBox = document.getElementById('resultsBox');

      // Clear previous results
      resultsBox.innerHTML = '';

      // Populate the results
      if (users.length > 0) {
        users.forEach(function (user) {
          var userLink = document.createElement('div');
          var url = window.location.href;
          var params = new URL(url).searchParams;
          if (params.has('user')) url = url.replace(/(user=)[^\&]+/, '$1' + user.id);else {
            var separator = url.includes('?') ? '&' : '?';
            url = "".concat(url).concat(separator, "user=").concat(user.id);
          }
          userLink.innerHTML = "\n                        <div class=\"flex gap-2 items-center\">\n                            <i class=\"fa-solid fa-user text-gray-600\"></i>\n                            ".concat(user.fullname, "\n                        </div> \n                        <div class=\"flex gap-2 items-center\">\n                            <i class=\"fa-solid fa-envelope text-gray-600\"></i>\n                            ").concat(user.email, "\n                        </div>");
          userLink.className = "text-sm py-1.5 px-3 bg-amber-300 rounded-md user-link hover:bg-amber-400";

          // There was a bug with href attr (js not working)
          // Solved wiht onclick event :)
          userLink.onclick = function (e) {
            e.preventDefault();
            window.location.href = url;
          };
          resultsBox.appendChild(userLink);
        });
      } else {
        resultsBox.textContent = 'No users found.';
      }
    } else {
      console.error('Error:', xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error('Request failed');
  };
  var xmlPayload = "\n        <search>\n            <term>".concat(searchTerm, "</term>\n        </search>\n    ");
  xhr.send(xmlPayload);
}

// Attach the search function to an input event
document.getElementById('searchInput').addEventListener('input', function (e) {
  var searchTerm = e.target.value.trim();
  if (searchTerm) {
    searchUsers(searchTerm);
  } else {
    document.getElementById('resultsBox').innerHTML = '';
  }
});

/* ########################
    (De)Select all logic
######################### */
document.getElementById('mainCheckBox').addEventListener('change', function (e) {
  var checkboxes = document.getElementsByClassName('checkboxItem');
  for (var i = 0; i < checkboxes.length; i++) {
    if (e.target.checked) {
      checkboxes[i].checked = true;
    } else {
      checkboxes[i].checked = false;
    }
  }
});

/* ##################################
    (Un)Block/Delete buttons logic
################################### */
document.getElementById("blockBtn").addEventListener('click', function () {
  var form = document.getElementById('userActionForm');
  var hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'action';
  hiddenInput.value = 'block';
  form.appendChild(hiddenInput);
  form.submit();
});
document.getElementById("unblockBtn").addEventListener('click', function () {
  var form = document.getElementById('userActionForm');
  var hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'action';
  hiddenInput.value = 'unblock';
  form.appendChild(hiddenInput);
  form.submit();
});
document.getElementById("deleteBtn").addEventListener('click', function () {
  var form = document.getElementById('userActionForm');
  var hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'action';
  hiddenInput.value = 'delete';
  form.appendChild(hiddenInput);
  form.submit();
});

// WARNING !!! Temporary solution
/* ###########################
    FIXING BUG WITH 'a'
############################ */
/*
    The problem is when a is clicked and go to the
    specified url, javascript is not working. No actions
    are performed on the new page. Somehow, using window.location
    solves. Temporary! Need to be learned ASAP.
*/
document.addEventListener('DOMContentLoaded', function () {
  // Get all <a> elements in the DOM
  var links = document.querySelectorAll('a');

  // Loop through each <a> element
  links.forEach(function (link) {
    // Assign a function to the click event
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the default navigation
      window.location.href = link.href;
    });
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_arra-1d8a33","vendors-node_modules_core-js_internals_an-instance_js-node_modules_core-js_internals_array-me-02001b","vendors-node_modules_core-js_modules_es_array_concat_js-node_modules_core-js_modules_es_array-46e6bc"], () => (__webpack_exec__("./assets/script.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dCBjbG9zaW5nQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NpbmdCdG4nKVxuICAgIGlmKGNsb3NpbmdCdG4pIHtcbiAgICAgICAgY2xvc2luZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGVydC1ib3gnKS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcbiAgICB9KVxufVxuXG4vKiAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgU2VhcmNoYmFyIFhNTCBSZXF1ZXN0XG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjICovXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5waW4tdXNlcicpKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5waW4tdXNlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiByZW1vdmVQYXJhbShrZXksIHNvdXJjZVVSTCkge1xuICAgICAgICAgICAgdmFyIHJ0biA9IHNvdXJjZVVSTC5zcGxpdChcIj9cIilbMF0sXG4gICAgICAgICAgICAgICAgcGFyYW0sXG4gICAgICAgICAgICAgICAgcGFyYW1zX2FyciA9IFtdLFxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gKHNvdXJjZVVSTC5pbmRleE9mKFwiP1wiKSAhPT0gLTEpID8gc291cmNlVVJMLnNwbGl0KFwiP1wiKVsxXSA6IFwiXCI7XG4gICAgICAgICAgICBpZiAocXVlcnlTdHJpbmcgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNfYXJyID0gcXVlcnlTdHJpbmcuc3BsaXQoXCImXCIpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBwYXJhbXNfYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtID0gcGFyYW1zX2FycltpXS5zcGxpdChcIj1cIilbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNfYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zX2Fyci5sZW5ndGgpIHJ0biA9IHJ0biArIFwiP1wiICsgcGFyYW1zX2Fyci5qb2luKFwiJlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydG47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3JpZ2luYWxVUkwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgdmFyIGFsdGVyZWRVUkwgPSByZW1vdmVQYXJhbShcInVzZXJcIiwgb3JpZ2luYWxVUkwpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFsdGVyZWRVUkw7XG4gICAgfSk7XG59XG5cbi8qICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBTZWFyY2hiYXIgWE1MIFJlcXVlc3RcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMgKi9cbmZ1bmN0aW9uIHNlYXJjaFVzZXJzKHNlYXJjaFRlcm0pIHtcbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhoci5vcGVuKCdQT1NUJywgJy9zZWFyY2gvdXNlcnMnLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3htbCcpO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgY29uc3QgdXNlcnMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0c0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzQm94Jyk7XG5cbiAgICAgICAgICAgIC8vIENsZWFyIHByZXZpb3VzIHJlc3VsdHNcbiAgICAgICAgICAgIHJlc3VsdHNCb3guaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBpZiAodXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHVzZXJzLmZvckVhY2godXNlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTCh1cmwpLnNlYXJjaFBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyYW1zLmhhcygndXNlcicpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoLyh1c2VyPSlbXlxcJl0rLywgJyQxJyArIHVzZXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcGFyYXRvciA9IHVybC5pbmNsdWRlcygnPycpID8gJyYnIDogJz8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gYCR7dXJsfSR7c2VwYXJhdG9yfXVzZXI9JHt1c2VyLmlkfWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXNlckxpbmsuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZ2FwLTIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS11c2VyIHRleHQtZ3JheS02MDBcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHt1c2VyLmZ1bGxuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZ2FwLTIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbnZlbG9wZSB0ZXh0LWdyYXktNjAwXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dXNlci5lbWFpbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJMaW5rLmNsYXNzTmFtZSA9IFwidGV4dC1zbSBweS0xLjUgcHgtMyBiZy1hbWJlci0zMDAgcm91bmRlZC1tZCB1c2VyLWxpbmsgaG92ZXI6YmctYW1iZXItNDAwXCI7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBUaGVyZSB3YXMgYSBidWcgd2l0aCBocmVmIGF0dHIgKGpzIG5vdCB3b3JraW5nKVxuICAgICAgICAgICAgICAgICAgICAvLyBTb2x2ZWQgd2lodCBvbmNsaWNrIGV2ZW50IDopXG4gICAgICAgICAgICAgICAgICAgIHVzZXJMaW5rLm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzQm94LmFwcGVuZENoaWxkKHVzZXJMaW5rKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c0JveC50ZXh0Q29udGVudCA9ICdObyB1c2VycyBmb3VuZC4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgeGhyLnN0YXR1c1RleHQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdSZXF1ZXN0IGZhaWxlZCcpO1xuICAgIH07XG5cbiAgICBjb25zdCB4bWxQYXlsb2FkID0gYFxuICAgICAgICA8c2VhcmNoPlxuICAgICAgICAgICAgPHRlcm0+JHtzZWFyY2hUZXJtfTwvdGVybT5cbiAgICAgICAgPC9zZWFyY2g+XG4gICAgYDtcblxuICAgIHhoci5zZW5kKHhtbFBheWxvYWQpO1xufVxuXG4vLyBBdHRhY2ggdGhlIHNlYXJjaCBmdW5jdGlvbiB0byBhbiBpbnB1dCBldmVudFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaElucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBlLnRhcmdldC52YWx1ZS50cmltKCk7XG4gICAgaWYgKHNlYXJjaFRlcm0pIHtcbiAgICAgICAgc2VhcmNoVXNlcnMoc2VhcmNoVGVybSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNCb3gnKS5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gXG59KTtcblxuLyogIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgKERlKVNlbGVjdCBhbGwgbG9naWNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMgKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluQ2hlY2tCb3gnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgIGxldCBjaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2hlY2tib3hJdGVtJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LmNoZWNrZWQpe1xuICAgICAgICAgICAgY2hlY2tib3hlc1tpXS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveGVzW2ldLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0pO1xuXG4vKiAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgKFVuKUJsb2NrL0RlbGV0ZSBidXR0b25zIGxvZ2ljXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyAqL1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9ja0J0blwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyQWN0aW9uRm9ybScpO1xuICAgIHZhciBoaWRkZW5JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaGlkZGVuSW5wdXQudHlwZSA9ICdoaWRkZW4nO1xuICAgIGhpZGRlbklucHV0Lm5hbWUgPSAnYWN0aW9uJztcbiAgICBoaWRkZW5JbnB1dC52YWx1ZSA9ICdibG9jayc7XG4gICAgXG4gICAgZm9ybS5hcHBlbmRDaGlsZChoaWRkZW5JbnB1dCk7XG4gICAgZm9ybS5zdWJtaXQoKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVuYmxvY2tCdG5cIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlckFjdGlvbkZvcm0nKTtcbiAgICB2YXIgaGlkZGVuSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGhpZGRlbklucHV0LnR5cGUgPSAnaGlkZGVuJztcbiAgICBoaWRkZW5JbnB1dC5uYW1lID0gJ2FjdGlvbic7XG4gICAgaGlkZGVuSW5wdXQudmFsdWUgPSAndW5ibG9jayc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChoaWRkZW5JbnB1dCk7XG4gICAgZm9ybS5zdWJtaXQoKTtcbn0pO1xuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVsZXRlQnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJBY3Rpb25Gb3JtJyk7XG4gICAgdmFyIGhpZGRlbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBoaWRkZW5JbnB1dC50eXBlID0gJ2hpZGRlbic7XG4gICAgaGlkZGVuSW5wdXQubmFtZSA9ICdhY3Rpb24nO1xuICAgIGhpZGRlbklucHV0LnZhbHVlID0gJ2RlbGV0ZSc7XG4gICAgXG4gICAgZm9ybS5hcHBlbmRDaGlsZChoaWRkZW5JbnB1dCk7XG4gICAgZm9ybS5zdWJtaXQoKTtcbn0pO1xuXG4vLyBXQVJOSU5HICEhISBUZW1wb3Jhcnkgc29sdXRpb25cbi8qICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIEZJWElORyBCVUcgV0lUSCAnYSdcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMgKi9cbi8qXG4gICAgVGhlIHByb2JsZW0gaXMgd2hlbiBhIGlzIGNsaWNrZWQgYW5kIGdvIHRvIHRoZVxuICAgIHNwZWNpZmllZCB1cmwsIGphdmFzY3JpcHQgaXMgbm90IHdvcmtpbmcuIE5vIGFjdGlvbnNcbiAgICBhcmUgcGVyZm9ybWVkIG9uIHRoZSBuZXcgcGFnZS4gU29tZWhvdywgdXNpbmcgd2luZG93LmxvY2F0aW9uXG4gICAgc29sdmVzLiBUZW1wb3JhcnkhIE5lZWQgdG8gYmUgbGVhcm5lZCBBU0FQLlxuKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgLy8gR2V0IGFsbCA8YT4gZWxlbWVudHMgaW4gdGhlIERPTVxuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggPGE+IGVsZW1lbnRcbiAgICBsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICAgIC8vIEFzc2lnbiBhIGZ1bmN0aW9uIHRvIHRoZSBjbGljayBldmVudFxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IG5hdmlnYXRpb25cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGluay5ocmVmO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJuYW1lcyI6WyJjbG9zaW5nQnRuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlUGFyYW0iLCJrZXkiLCJzb3VyY2VVUkwiLCJydG4iLCJzcGxpdCIsInBhcmFtIiwicGFyYW1zX2FyciIsInF1ZXJ5U3RyaW5nIiwiaW5kZXhPZiIsImkiLCJsZW5ndGgiLCJzcGxpY2UiLCJqb2luIiwib3JpZ2luYWxVUkwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJhbHRlcmVkVVJMIiwic2VhcmNoVXNlcnMiLCJzZWFyY2hUZXJtIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ubG9hZCIsInN0YXR1cyIsInVzZXJzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwicmVzdWx0c0JveCIsImlubmVySFRNTCIsImZvckVhY2giLCJ1c2VyIiwidXNlckxpbmsiLCJjcmVhdGVFbGVtZW50IiwidXJsIiwicGFyYW1zIiwiVVJMIiwic2VhcmNoUGFyYW1zIiwiaGFzIiwicmVwbGFjZSIsImlkIiwic2VwYXJhdG9yIiwiaW5jbHVkZXMiLCJjb25jYXQiLCJmdWxsbmFtZSIsImVtYWlsIiwiY2xhc3NOYW1lIiwib25jbGljayIsInByZXZlbnREZWZhdWx0IiwiYXBwZW5kQ2hpbGQiLCJ0ZXh0Q29udGVudCIsImNvbnNvbGUiLCJlcnJvciIsInN0YXR1c1RleHQiLCJvbmVycm9yIiwieG1sUGF5bG9hZCIsInNlbmQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRyaW0iLCJjaGVja2JveGVzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNoZWNrZWQiLCJmb3JtIiwiaGlkZGVuSW5wdXQiLCJ0eXBlIiwibmFtZSIsInN1Ym1pdCIsImxpbmtzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpbmsiLCJldmVudCJdLCJzb3VyY2VSb290IjoiIn0=