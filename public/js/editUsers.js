/**
 * To move around the image on click.
 */
(function () {
    "use strict";

    var content = document.getElementById("editContent");
    var myUrl   = window.location.href;

    var userUrl = "http://localhost:1337/users/";

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
    var chosenUser = getData(userUrl);

    chosenUser.then(function(res) {
        var pageContent = [
            '<p><strong>Username:</strong> \n<input type="text" name="username" value="' + res.username + '"/></p>',
            '<p><strong>Firstname:</strong> \n<input type="text" name="firstname" value="' + res.firstName + '"/></p>',
            '<p><strong>Lastname:</strong> \n<input type="text" name="lastname" value="' + res.lastName + '"/></p>',
            "<p><strong>Groups:</strong> </p>"
        ].join("\n");
        var groupContent = "";
        for (var i = 0; i < res.group.length; i++) {
            groupContent += '<p><input type="text" name="username" value="' + res.group[i] + '"/><p>';
            console.log(res.group[i]);
        }
        content.innerHTML = pageContent + groupContent;
        // console.log(res);
    })

    // console.log(chosenUser);
    // content.innerHTML = "<p>Get from Database id: " + userUrl + "</p>";
    // console.log(url[url.length - 1]);
}());
