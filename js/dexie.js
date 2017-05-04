/*
 *
 * Using this for reference:
 *
        <input id="value" type="text" name="insert"></input>
        <input id="put" type="button" value="put_word"></input>
        </br>
        </br>
        <input id="key" type="text" name="search"></input>
        <input id="get" type="button" value="get_word"></input>
 */
var db;
var word_table;
window.onload = function() {

        // use a unique ID to isolate from other scripts
        // This is the global name of a database
        // Then you can create as many tables as nesssary
        // Note I will use db as the handle
        db = new Dexie('words');

        db.version(1).stores({

            snippets: 'id,snip'
        });

        db.snippets.bulkPut([

            {id : 'bash', snip: 'for i in x; do something; done'},
            {id: "bash if clause", snip: "if [ bool ]; then something; fi"},
            {id: "view numbers in vi",snip: ":set number"},
            {id: "go to the end of line in vi",snip: "$" }]
        ).then( function() {

            return db.snippets.get('bash');

        }).then(function(snip){
            alert(snip.snip)
      }).catch( function (error) {

            alert('oops' + error);

        });

    var put_button = document.getElementById('put');
    put_button.onclick = add_user_input;

    var get_button = document.getElementById('get');
    get_button.onclick = get_user_request;

}

function add_user_input(){

    var value = document.getElementById('value').value;

    var key = prompt("What id do you wish to give this text");

    db.snippets.put({id: key, snip: value}).catch (
      function(error) {
        console.log("There was an error" + error);
      }
    );

}

function get_user_request() {

    var key = document.getElementById('key').value;
    console.log(key);
    db.snippets.get(key).then(function (item){
      console.log(item);
      alert(item.snip);
    });
}
