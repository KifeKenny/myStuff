/**
 * To move around the image on click.
 */
(function () {
    "use strict";

    var chosenUser, pageContent;
    var content = document.getElementById("editContent");
    var myUrl   = window.location.href;

    var userUrl = "http://localhost:1337/users/";

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

    userUrl += getUlPart(myUrl, 1);
    chosenUser = getData(userUrl);

    chosenUser.then(function(res) {
        pageContent = [
            '<p><strong>Username:</strong> \n<input type="text" name="username" value="' + res.username + '"/></p>',
            '<p><strong>Firstname:</strong> \n<input type="text" name="firstname" value="' + res.firstName + '"/></p>',
            '<p><strong>Lastname:</strong> \n<input type="text" name="lastname" value="' + res.lastName + '"/></p>',
            "<p><strong>Groups:</strong> </p>"
        ].join("\n");
        pageContent += tabelStart;
        // content.innerHTML = pageContent;
        for (var i = 0; i < res.group.length; i++) {
            var curGroup = getData("http://localhost:1337/groupsJson/" + res.group[i]);
            curGroup.then(function(res) {
                pageContent += [
                    '<tr>',
                    '<td>' + res.name + '</td>',
                    '<td><select>',
                    tobetween(res.path, '<option>', '</option>'),
                    '</select></td>',
                    '<td><a href"#">Delete</a>' + '</td>',
                    '</tr>'

                ].join("\n");
            });
        }
        curGroup.then(function(res) {
            pageContent += "</table>";
            pageContent += '<button style="margin-top:10px;" type="button">Add Group</button>';
            pageContent += '<button style="margin-top:50px;" class="button" type="button">Save</button>';
            content.innerHTML = pageContent;
        })
    })
}());
