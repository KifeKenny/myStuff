/**
 * To move around the image on click.
 */
(function () {
    "use strict";
    var content, test, checkerUG, myUrl, users, userTable, tempTable;
    content     = document.getElementById("userContent");
    checkerUG   = document.getElementById("checkerUG");

    console.log(checkerUG.value);
    checkerUG = checkerUG.value;

    myUrl = 'http://localhost:1337/' + checkerUG;

    function getTabele(name) {
        var rtable;
        if (name == "users") {
            rtable = [
                '<h1>Users</h1>',
                '<hr>',
                '<table>',
                '<tr>',
                '<th>Username</th>',
                '<th>Firstname</th>',
                '<th>Lastname</th>',
                // '<th>Groups</th>',
                '</tr>'
            ].join('\n');
        } else if (name == "groupsJson") {
            rtable = [
                '<h1>Groups</h1>',
                '<hr>',
                '<table>',
                '<tr>',
                '<th>Name</th>',
                '<th>Paths</th>',
                '</tr>'
            ].join('\n');
        }
        return rtable;
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


    users = getData(myUrl);

    users.then(function(res) {
        userTable = getTabele(checkerUG);
        for (var i = 0; i < res.length; i++) {
            if (checkerUG == "users") {
                tempTable =
                   ["<tr>",
                    '<td><a href=' + myUrl + '/edit/' + res[i].id + '>' + res[i].username + "</a></td>",
                    "<td>" + res[i].firstName + "</td>",
                    "<td>" + res[i].lastName + "</td>",
                    // "<td>" + res[i].group.join(", ") + "</td>",
                    '</tr>'
                   ].join('\n');
            } else if (checkerUG == "groupsJson") {
                tempTable =
                   ["<tr>",
                    '<td><a href=' + myUrl.substr(0, (myUrl.length - 4)) + '/edit/' + res[i].id + '>' + res[i].name + "</a></td>",
                    "<td>" + res[i].path.join(", ") + "</td>",
                    '</tr>'
                   ].join('\n');
            }
            userTable += tempTable;
        }
        content.innerHTML = userTable;
        // console.log(userTable);
    });

    console.log(users);
}());
