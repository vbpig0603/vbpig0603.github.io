function Segment(input)
{
    //參考程式碼 https://pulipulichen.github.io/HTML5-Wrapped-Text-Formatter/
    var _source = input;
    // console.log(_source)
    _source = _source.trim()

    if (_source === '') {
        return false
    }
    do {
        _source = _source.split('  ').join(' ')
    }
    while (_source.indexOf('  ') > -1)
    do {
        _source = _source.split('\t').join(' ')
    }
    while (_source.indexOf('\t') > -1)

    //全形引號變半形
    _source = _source.split('’').join("'")
    _source = _source.split('”').join('"')
    _source = _source.split('“').join('"')

    //
    while (_source.indexOf(' \n') > -1) {
        _source = _source.split(' \n').join('\n')
    }
    _source = _source.split('-\n').join('')

    // 換行先接起來
    // 解決中文換行問題
    _source = _source.replace(/\n[\u4e00-\u9fa5]/g, function (_word) {
        return _word.split('\n').join('')
    })
    _source = _source.split('\n').join(' ')
    
    // 將結尾轉換成換行
    _source = _source.split('. ').join('. \n\n')
    _source = _source.split('• ').join('\n\n• ')
    _source = _source.replace(/p\. \n\n\d/g, function (_word) {
        return _word.split('\n').join('')
    })
    var stripNl = function (_word) {
        return _word.split('\n').join('')
    }

    _source = _source.replace(/e\.g\. \n\n[^A-Z]/g, stripNl)
    _source = _source.replace(/i\.e\. \n\n[^A-Z]/g, stripNl)
    _source = _source.replace(/et al\. \n\n[^A-Z]/g, stripNl)
    _source = _source.replace(/etc\. \n\n[^A-Z]/g, stripNl)

    _source = _source.split('–').join('– \n\n')
    _source = _source.split('。').join('。 \n\n')
    _source = _source.split('." ').join('." \n\n')
    _source = _source.split('." \n\n(').join('." (')
    _source = _source.split('。」 ').join('。」 \n\n')
    _source = _source.split(".' ").join(".' \n\n")
    _source = _source.split('; ').join('; \n\n')
    _source = _source.replace(/\d; \n\n/g, function (_word) {
        return _word.split('\n').join('')
    })
    _source = _source.split('； ').join('； \n\n')
    _source = _source.replace('；', '；\n\n', _source)

    _source = _source.replace('（ ', ' (', _source)
    _source = _source.replace('  ( ', ' (', _source)
    _source = _source.replace(' ）', ') ', _source)
    _source = _source.replace(')  ', ') ', _source)

    _source = _source.split('\n ').join('\n')

    _source = _source.replace(/[0-9]+\. \n\n[A-Z]/g, function (_word) {
        return '\n\n' + _word.split('\n').join('')
    })

    _source = _source.replace(/\n\d+$/g, '')
    _source = _source.replace(/\n\d+ /g, '\n')

    while (_source.indexOf('  ') > -1) {
        _source = _source.split('  ').join(' ')
    }
    while (_source.indexOf('\n ') > -1) {
        _source = _source.split('\n ').join('\n')
    }
    while (_source.indexOf('. \n\n.') > -1) {
        _source = _source.split('. \n\n.').join('..')
    }
    while (_source.indexOf('\n\n\n\n') > -1) {
        _source = _source.split('\n\n\n\n').join('\n\n')
    }

    // 名字縮寫
    _source = _source.replace(/[A-Z]\. \n\n/g, function (_word) {
        return _word.split('\n').join('')
    })

    _source = $.trim(_source)
    _source_array = _source.split("\n");

    output = {"source": _source, "source_array": _source_array}
    // // 移除括號內的資料
    // _source = _source.replace(/\[.*?\]/g, '')
    // _source = _source.replace(/\(.*?\)/g, '')
    // _source = _source.replace(/\{.*?\}/g, '')

    return output;
}
function nl2br( str ) {
    return str.replace(/([^>])\n/g, '$1<br/>\n');
} 
function opneNewPage(link)
{
    window.open(link, '', 'width=1024,height=768,toolbar=0,menubar=0,location=0');
}
function openNewGoogleTranslatePage(uriText)
{
    opneNewPage("https://translate.google.com/#view=home&op=translate&sl=en&tl=zh-TW&text=" + uriText);
}
function TranslateByGoogle(uriText)
{
    value = ""
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: "https://translation.googleapis.com/language/translate/v2/?q="+uriText+"&source=en&target=zh-TW&key=AIzaSyCxxKgmz3ZVJbpXnHVzwf3-oxIe6R-77EA",
        success: function(data) {
            translatedText = data["data"]["translations"][0]["translatedText"];
            value = translatedText;
        }
    });

    return value;
}