function createCodeMirror(el, config) {
    var codemirror,
        privates, publics,
        defaultConfig = {
            matchBrackets: false,
            electricChars: true,
    //      autoClearEmptyLines: true,
            value: '',
            styleActiveLine: true,
            indentUnit: 4,
            smartIndent: true,
            indentWithTabs: true,
            pollInterval: 100,
            lineNumbers: true,
            lineWrapping: false,
            firstLineNumber: 1,
            tabSize: 4,
            readOnly : true,
            gutter: true,
            fixedGutter: true,
            theme: 'default',
            styleActiveLine: true,
            gutters: [ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ],
            foldGutter: false,
            mode: 'text/x-sql'
        };
        
    if(config == undefined)
    	config = defaultConfig;
    else
    	config = $.extend(defaultConfig,config);
    
    codemirror = CodeMirror(el, config);
    
    privates = {
        mode: undefined
    }
    
    publics = {
        setValue: function(value){
            codemirror.setValue(value);
        },
        
        getValue: function() {
            return codemirror.getValue();
        },
        
        setMode: function(mode) {
            codemirror.setOption('mode', mode);
            privates.mode = mode;
        },
        
        getMode: function() {
            return privates.mode;
        },
        
        setCursor: function(cursor) {
            codemirror.setCursor({
                line: cursor.line
            });
        },
        
        getCursor: function() {
            return codemirror.getCursor();
        },
        
        moveLine: function(line) {
            codemirror.setCursor({
                line: line - config.firstLineNumber
            });
        },
        
        reset: function() {
            codemirror.reset();
        },
        
        getName: function() {
            return codemirror.getName();
        },
        
        setReadOnly: function(readOnly) {
            codemirror.setReadOnly(readOnly);
        },
        
        focus: function() {
            codemirror.focus();
        }, 
        
        lineCount: function() {
            return codemirror.lineCount();
        },
        
        autoFormatRange: function(from, to){
            codemirror.autoFormatRange(from, to);
        }
    };
    
    return publics;
};


createCodeMirror.MODE = {
    PLSQL: 'text/x-sql',
    
    C: 'text/x-csharp',
    JAVA: 'text/x-csharp',
    
    JSP: 'application/x-jsp',
    
    XML: 'text/html',
    HTML: 'text/html',
    
    JAVASCRIPT: 'text/javascript',
    JSON: 'text/javascript',
    
    PHP: 'text/x-php',
    
    CSS: 'text/css',
    
    TEXT: 'text/plain'
};
