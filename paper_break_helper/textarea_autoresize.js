var observe;
if (window.attachEvent) {
    textarea_autoresize_observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    textarea_autoresize_observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function textarea_autoresize_resize (textarea_id) {
    var text = document.getElementById(textarea_id);
    text.style.height = 'auto';
    text.style.height = text.scrollHeight+'px';
}
/* 0-timeout to get the already changed text */
function textarea_autoresize_delayedResize (textarea_id) {
    window.setTimeout(function()
    {
        textarea_autoresize_resize (textarea_id);
    }, 0);
}
function textarea_autoresize_init (textarea_id) {
    var text = document.getElementById(textarea_id);
    function resize () {
        text.style.height = 'auto';
        text.style.height = text.scrollHeight+'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    textarea_autoresize_observe(text, 'change',  resize);
    textarea_autoresize_observe(text, 'cut',     delayedResize);
    textarea_autoresize_observe(text, 'paste',   delayedResize);
    textarea_autoresize_observe(text, 'drop',    delayedResize);
    textarea_autoresize_observe(text, 'keydown', delayedResize);

    text.focus();
    text.select();
    textarea_autoresize_resize(textarea_id);
}