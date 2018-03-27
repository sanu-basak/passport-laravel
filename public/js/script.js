/**
 * [for cursor postion set on the last character]
 * @param  {[type]} el [event]
 * @return {[type]}    [description]
 */
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}



/**
 * [Using textGear api for retrieving dictionary keywords value]
 * @param  {[string]} text [text word which is user typed in the box]
 * @return {[type]}      [description]
 */
function textGearsApi(text,last){
    var update_text=text;
	var arr_error=[];
	var arr_suggest=[];
    var html='';
    
    $.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});

    $.ajax({
         url: 'http://127.0.0.1:8000/guzzle',
         type: "POST",
         data: { _token : $('meta[name=_token]').attr('content'), text : text },
         cache: false,

         success: function (data) {
             console.log(response);
         }
     });
	$.get("https://api.textgears.com/check.php?text="+text+"&key=HpOD3AqdtWYxmkTP",function (data) {
	    $.each(data.errors, function (index, value) {
	        console.log(data.errors);
	    	arr_error[value.offset]=value.length;
	    	var arr_value=[];
	    	$.each(value.better, function (index1, value1) {
	    	   arr_value.push(value1);
	    	});
	    	arr_suggest[value.bad]=arr_value;
	    	
	    });

	    for(var x in arr_error){
	    	var error=text.substr(x,arr_error[x]);

	    	for(var y in arr_suggest){
		    	if(y==error){
		    		
		    		if(text.indexOf(error)==x){

		    			var ind=update_text.indexOf(error);
		    			var sbstr_after_ind=update_text.substr(ind,update_text.length-1);
		    			var indexof_gearter= sbstr_after_ind.indexOf('>');
		    			var indexof_less= sbstr_after_ind.indexOf('<');
		    			if(indexof_less>indexof_gearter){
		    				continue;
		    			}
		    	  		update_text= update_text.replace(error,'<span class="error_word" data-suggested="'+arr_suggest[y]+'">'+error+'</span>');
		  
		    		}
		    	}
	    	}
	    }

        var str2 =  $('#myTextArea').text().split(/\s+/).slice(last,last+10).join("  ");
        update_text = update_text.concat(str2);
	    $('#myTextArea').html(update_text);
	    placeCaretAtEnd($('#myTextArea').get(0));

	});

}

$("#myTextArea").keyup(function(e){
	var text= $(this).text();
	if(e.keyCode==32){
		var after = 5;
		var words = text.match(/\S+/g).length;
		var temp = parseInt(words/after);
	    after = after * temp;

	    if (words==after ) {

			  textGearsApi(text,after);
        }
    }	
});

$(document).on('click','.error_word',function(){
     
	var suggested_word= $(this).data('suggested');
	var splitted= suggested_word.split(',');

	var abc='';
	var error=$(this).text();
	for(var i=0; i<splitted.length;i++){
		abc+='<a class="suugested_Word" data-error="'+error+'"><li>'+splitted[i]+'</li></a>';
	}

	var position = $(this).position();
	var distance = parseInt(position.top);
	var left = parseInt(position.left);
	 
	var html='<div><ul id="myid">'+abc+'</ul></div>';
	$('.suggested').html(html);
	$('.suggested').css({
	 	'top':distance+15,
	 	'left':left-5
	});

	$('.suggested').show();


});




$(document).on('click','.suugested_Word',function(){
	var error= $(this).data('error');
	var text=$('#myTextArea').text();
	var selected_word= $(this).text();
	
	var newstr= text.replace(error,selected_word+' ');
	
	$('#myTextArea').html(newstr);
	  var text_filed= $('#myTextArea').text();
	  textGearsApi(text_filed);
});


$(document).on('click','.suggested',function(){
   $('.suggested').hide();

});