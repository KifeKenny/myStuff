/**
 * To move around the image on click.
 */
(function () {
    "use strict";

    var chosen, pageContent;
    var content = document.getElementById("editContent");
    var myUrl   = window.location.href;

    var apiUrl = "http://localhost:1337/groupsJson/";

    var tabelStart = [
        '<table>',
        '<tr>',
        '<th>Name</th>',
        '<th>Paths</th>',
        '<th>Delete</th>',
        '<tr>'
    ].join("\n");

    function tobetween(arr, element, element2) {
        var result = "";
        for (var i = 0; i < arr.length; i++) {
            result += element + arr[i] + element2;
        }
        return result;
    }

    // getPart from url, position start from end
    function getUlPart(url, position) {
        url = url.split("/");
        url = url[url.length - position];
        return url;
    }

    function getData(url) {
        return fetch(url)
        .then(response => response.json())
        .then(function(data) {
            return data;

        })
        .catch(function(error) {
            return error;
        });
    }
    apiUrl += getUlPart(myUrl, 1);
    chosen = getData(apiUrl);
    // console.log(userUrl);

    chosen.then(function(res) {
        pageContent = [
            '<p><strong>Name:</strong> \n<input type="text" name="username" value="' + res.name + '"/></p>',
            '<p><strong>Paths:</strong></p>'
        ].join("\n");
        for (var i = 0; i < res.path.length; i++) {
            pageContent += '<input type="text" name="username" value="' + res.path[i] + '"/>';
        }
        pageContent += [
            '<button style="margin-top:10px;" type="button">Add Path</button>',
            '<button style="margin-top:50px;" class="button" type="button">Save</button>'
        ].join("\n");
        
        content.innerHTML = pageContent;
    })
}());
