/*
 * phi
 */

/*
 * global
 */
var lessParser = null;
var lessEditor = null;
var cssEditor  = null;


/*
 * main
 */
tm.main(function() {
    // less parser 生成
    lessParser = new less.Parser();
    
    // エディタ
    lessEditor = ace.edit("editor");
    lessEditor.setTheme("ace/theme/chrome");
    lessEditor.getSession().setMode("ace/mode/less");
    lessEditor.session.$tabSize = 2;
    lessEditor.addEventListener("change", parse);
    /*
    lessEditor.commands.addCommand({
        Name: "parse",
        bindKey: {
            win: "Shift-Return",
        },
        exec: function(editor) {
            parse();
        }
    });
    */
    
    // 結果用エディタ
    cssEditor = ace.edit("result");
    cssEditor.setTheme("ace/theme/chrome");
    cssEditor.getSession().setMode("ace/mode/css");
});


var parse = function() {
    var value = lessEditor.getValue();
    lessParser.parse(value, function(err, tree) {
        if (err) {
            // cssEditor.setValue(err.toString());
            return console.error(err);
        }
        cssEditor.setValue(tree.toCSS());
    });
};
